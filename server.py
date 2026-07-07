import sys
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import Config
from app.services import workflow_manager, task_manager, ComfyUIClient

Config.ensure_dirs()

app = Flask(__name__, static_folder=None)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = Config.MAX_UPLOAD_SIZE

current_comfy_url = Config.COMFYUI_URL
comfy_client = ComfyUIClient(current_comfy_url)


@app.route('/')
def index():
    index_path = Config.FRONTEND_DIR / "index.html"
    if index_path.exists():
        return send_file(str(index_path))
    return jsonify({
        "name": "建筑AI设计辅助工具 API",
        "version": "1.0.0",
        "status": "/api/system/status"
    })


@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(str(Config.FRONTEND_DIR), filename)


@app.route('/health')
def health_check():
    return jsonify({"status": "ok"})


@app.route('/api/workflows', methods=['GET'])
def list_workflows():
    return jsonify(workflow_manager.list_workflows())


@app.route('/api/workflows/<workflow_id>', methods=['GET'])
def get_workflow_schema(workflow_id):
    try:
        return jsonify(workflow_manager.get_workflow_schema(workflow_id))
    except FileNotFoundError:
        return jsonify({"detail": f"工作流不存在: {workflow_id}"}), 404


@app.route('/api/workflows/<workflow_id>/raw', methods=['GET'])
def get_workflow_raw(workflow_id):
    try:
        return jsonify(workflow_manager.load_workflow(workflow_id))
    except FileNotFoundError:
        return jsonify({"detail": f"工作流不存在: {workflow_id}"}), 404


@app.route('/api/tasks/generate', methods=['POST'])
def generate_image():
    data = request.get_json() or {}
    workflow_id = data.get('workflow_id')
    params = data.get('params', {})

    if not workflow_id:
        return jsonify({"detail": "缺少workflow_id参数"}), 400

    task_id = task_manager.create_task()
    task_manager.execute_workflow_async(task_id, workflow_id, params)

    return jsonify({
        "task_id": task_id,
        "status": "pending",
        "message": "任务已提交，正在排队中"
    })


@app.route('/api/tasks/generate-with-upload', methods=['POST'])
def generate_with_upload():
    workflow_id = request.form.get('workflow_id', '')
    prompt = request.form.get('prompt', '')
    negative_prompt = request.form.get('negative_prompt', '')
    seed = int(request.form.get('seed', -1))
    steps = int(request.form.get('steps', 20))
    cfg_scale = float(request.form.get('cfg_scale', 7.0))

    if not workflow_id:
        return jsonify({"detail": "缺少workflow_id参数"}), 400

    task_id = task_manager.create_task()

    params = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "seed": seed,
        "steps": steps,
        "cfg_scale": cfg_scale,
    }

    image = request.files.get('image')
    reference_image = request.files.get('reference_image')

    if image:
        upload_dir = Config.UPLOADS_DIR / task_id
        upload_dir.mkdir(parents=True, exist_ok=True)
        img_path = upload_dir / image.filename
        image.save(str(img_path))

        if comfy_client.is_running():
            try:
                comfy_client.upload_image(img_path)
                params["input_image"] = image.filename
            except Exception:
                params["input_image_path"] = str(img_path)
        else:
            params["input_image_path"] = str(img_path)

    if reference_image:
        upload_dir = Config.UPLOADS_DIR / task_id
        upload_dir.mkdir(parents=True, exist_ok=True)
        ref_path = upload_dir / reference_image.filename
        reference_image.save(str(ref_path))

        if comfy_client.is_running():
            try:
                comfy_client.upload_image(ref_path)
                params["reference_image"] = reference_image.filename
            except Exception:
                params["reference_image_path"] = str(ref_path)
        else:
            params["reference_image_path"] = str(ref_path)

    task_manager.execute_workflow_async(task_id, workflow_id, params)

    return jsonify({
        "task_id": task_id,
        "status": "pending",
        "message": "任务已提交，正在排队中"
    })


@app.route('/api/tasks/<task_id>', methods=['GET'])
def get_task_status(task_id):
    task = task_manager.get_task(task_id)
    if not task:
        return jsonify({"detail": f"任务不存在: {task_id}"}), 404
    return jsonify(task)


@app.route('/api/tasks', methods=['GET'])
def list_tasks():
    limit = int(request.args.get('limit', 20))
    return jsonify(task_manager.list_tasks(limit=limit))


@app.route('/api/outputs/<task_id>/<filename>')
def output_files(task_id, filename):
    output_dir = Config.OUTPUTS_DIR / task_id
    return send_from_directory(str(output_dir), filename)


@app.route('/api/system/status', methods=['GET'])
def system_status():
    running = comfy_client.is_running()

    active = 0
    queued = 0
    if running:
        try:
            queue = comfy_client.get_queue()
            queued = len(queue.get("queue_running", [])) + len(queue.get("queue_pending", []))
        except Exception:
            pass

    for task in task_manager.tasks.values():
        if task["status"] == "running":
            active += 1
        elif task["status"] == "pending":
            queued += 1

    return jsonify({
        "comfyui_running": running,
        "comfyui_url": comfy_client.server_url,
        "gpu_available": False,
        "active_tasks": active,
        "queued_tasks": queued,
    })


@app.route('/api/system/config', methods=['GET', 'POST'])
def system_config():
    global comfy_client, current_comfy_url

    if request.method == 'GET':
        return jsonify({
            "comfyui_url": comfy_client.server_url,
            "api_port": Config.API_PORT
        })

    data = request.get_json() or {}
    new_url = data.get('comfyui_url')

    if new_url:
        current_comfy_url = new_url
        comfy_client = ComfyUIClient(current_comfy_url)

        running = comfy_client.is_running()
        return jsonify({
            "success": True,
            "comfyui_url": current_comfy_url,
            "connected": running,
            "message": "连接成功" if running else "配置已更新，请检查ComfyUI是否启动"
        })

    return jsonify({"success": False, "message": "缺少comfyui_url参数"}), 400


if __name__ == '__main__':
    print(f"建筑AI设计辅助工具启动中... http://{Config.API_HOST}:{Config.API_PORT}")
    app.run(host=Config.API_HOST, port=Config.API_PORT, debug=True, use_reloader=False)
