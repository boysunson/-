import uuid
import time
import asyncio
from pathlib import Path
from typing import Dict, Optional, List
import threading

from config import Config
from app.services.comfy_client import ComfyUIClient
from app.services.workflow_manager import workflow_manager


class TaskManager:
    def __init__(self):
        self.tasks: Dict[str, dict] = {}
        self._comfy_client: Optional[ComfyUIClient] = None

    @property
    def comfy_client(self) -> ComfyUIClient:
        if self._comfy_client is None:
            self._comfy_client = ComfyUIClient()
        return self._comfy_client

    def create_task(self) -> str:
        task_id = str(uuid.uuid4())
        self.tasks[task_id] = {
            "task_id": task_id,
            "status": "pending",
            "progress": 0.0,
            "message": "任务已创建，等待执行",
            "created_at": time.time(),
            "completed_at": None,
            "result_urls": []
        }
        return task_id

    def get_task(self, task_id: str) -> Optional[dict]:
        return self.tasks.get(task_id)

    def update_task(self, task_id: str, **kwargs):
        if task_id in self.tasks:
            self.tasks[task_id].update(kwargs)

    def execute_workflow_async(self, task_id: str, workflow_id: str, params: Dict):
        def run():
            self._execute_workflow_sync(task_id, workflow_id, params)

        thread = threading.Thread(target=run, daemon=True)
        thread.start()

    def _execute_workflow_sync(self, task_id: str, workflow_id: str, params: Dict):
        try:
            self.update_task(task_id, status="running", progress=0.05, message="准备工作流...")

            wf = workflow_manager.apply_params(workflow_id, params)

            self.update_task(task_id, progress=0.1, message="连接ComfyUI服务...")

            if not self.comfy_client.is_running():
                raise RuntimeError("ComfyUI服务未运行，请先启动ComfyUI")

            self.update_task(task_id, progress=0.2, message="提交任务到ComfyUI...")

            prompt_id = self.comfy_client.queue_prompt(wf)

            self.update_task(task_id, progress=0.3, message="正在生成中...")

            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                loop.run_until_complete(
                    self.comfy_client.wait_for_completion(prompt_id, timeout=600)
                )
            finally:
                loop.close()

            self.update_task(task_id, progress=0.9, message="保存结果...")

            output_images = self.comfy_client.get_output_images(prompt_id)

            result_urls = []
            task_output_dir = Config.OUTPUTS_DIR / task_id
            task_output_dir.mkdir(parents=True, exist_ok=True)

            for i, img_data in enumerate(output_images):
                img_path = task_output_dir / f"output_{i}.png"
                with open(img_path, "wb") as f:
                    f.write(img_data)
                result_urls.append(f"/api/outputs/{task_id}/output_{i}.png")

            self.update_task(
                task_id,
                status="completed",
                progress=1.0,
                message="生成完成",
                result_urls=result_urls,
                completed_at=time.time()
            )

        except Exception as e:
            self.update_task(
                task_id,
                status="failed",
                progress=0.0,
                message=f"生成失败: {str(e)}",
                completed_at=time.time()
            )

    def list_tasks(self, limit: int = 20) -> List[dict]:
        tasks_list = sorted(self.tasks.values(), key=lambda t: t["created_at"], reverse=True)
        return tasks_list[:limit]


task_manager = TaskManager()
