const API_BASE = '';

let workflows = [];
let currentWorkflow = null;
let pollingTimer = null;

const workflowIcons = {
    '建筑设计': '🏢',
    '室内设计': '🏠',
    '风格迁移': '🎨',
    'general': '✨'
};

function getWorkflowIcon(category) {
    return workflowIcons[category] || workflowIcons['general'];
}

async function fetchWorkflows() {
    try {
        const res = await fetch(`${API_BASE}/api/workflows`);
        workflows = await res.json();
        renderWorkflowList();
    } catch (e) {
        document.getElementById('workflowList').innerHTML = '<p class="text-muted">加载失败，请刷新重试</p>';
    }
}

function renderWorkflowList() {
    const container = document.getElementById('workflowList');
    if (!workflows.length) {
        container.innerHTML = '<p class="text-muted">暂无可用工作流</p>';
        return;
    }

    container.innerHTML = workflows.map(wf => `
        <div class="workflow-item" data-id="${wf.id}">
            <div class="workflow-icon">${getWorkflowIcon(wf.category)}</div>
            <div class="workflow-name">${wf.name}</div>
            <div class="workflow-category">${wf.category}</div>
        </div>
    `).join('');

    container.querySelectorAll('.workflow-item').forEach(item => {
        item.addEventListener('click', () => selectWorkflow(item.dataset.id));
    });
}

async function selectWorkflow(workflowId) {
    document.querySelectorAll('.workflow-item').forEach(item => {
        item.classList.toggle('active', item.dataset.id === workflowId);
    });

    try {
        const res = await fetch(`${API_BASE}/api/workflows/${workflowId}`);
        currentWorkflow = await res.json();

        document.getElementById('workflowName').textContent = currentWorkflow.name;
        document.getElementById('workflowDesc').textContent = currentWorkflow.description || '';

        renderParamsForm(currentWorkflow.inputs || []);
        document.getElementById('generateBtn').disabled = false;
    } catch (e) {
        console.error('Failed to load workflow:', e);
    }
}

function renderParamsForm(inputs) {
    const form = document.getElementById('paramsForm');

    if (!inputs.length) {
        form.innerHTML = '<div class="empty-state"><p>该工作流无需配置参数</p></div>';
        return;
    }

    form.innerHTML = inputs.map(input => {
        const id = `param_${input.name}`;
        const label = input.label || input.name;
        const hint = input.description ? `<span class="form-hint">${input.description}</span>` : '';

        let field = '';
        switch (input.type) {
            case 'text':
                field = `<textarea id="${id}" name="${input.name}" rows="3" placeholder="${input.default || ''}">${input.default || ''}</textarea>`;
                break;
            case 'number':
                field = `<input type="number" id="${id}" name="${input.name}" value="${input.default ?? ''}" step="any">`;
                break;
            case 'select':
                const options = (input.options || []).map(opt =>
                    `<option value="${opt}" ${opt === input.default ? 'selected' : ''}>${opt}</option>`
                ).join('');
                field = `<select id="${id}" name="${input.name}">${options}</select>`;
                break;
            case 'image':
                field = `
                    <input type="file" id="${id}" name="${input.name}" accept="image/*">
                    <img class="image-upload-preview" id="${id}_preview" alt="预览">
                `;
                break;
            default:
                field = `<input type="text" id="${id}" name="${input.name}" value="${input.default || ''}">`;
        }

        return `
            <div class="form-group">
                <label for="${id}">${label}</label>
                ${field}
                ${hint}
            </div>
        `;
    }).join('');

    inputs.forEach(input => {
        if (input.type === 'image') {
            const fileInput = document.getElementById(`param_${input.name}`);
            const preview = document.getElementById(`param_${input.name}_preview`);
            if (fileInput && preview) {
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            preview.src = ev.target.result;
                            preview.classList.add('visible');
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        }
    });
}

async function generate() {
    if (!currentWorkflow) return;

    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span><span>生成中...</span>';

    document.getElementById('resultEmpty').style.display = 'none';
    document.getElementById('resultImages').innerHTML = '';
    document.getElementById('progressArea').style.display = 'block';
    document.getElementById('progressFill').style.width = '5%';
    document.getElementById('progressText').textContent = '准备中...';

    try {
        const formData = new FormData();
        formData.append('workflow_id', currentWorkflow.id);

        const inputs = currentWorkflow.inputs || [];
        const textParams = {};

        inputs.forEach(input => {
            const el = document.getElementById(`param_${input.name}`);
            if (!el) return;

            if (input.type === 'image') {
                if (el.files && el.files[0]) {
                    formData.append(input.name === 'reference_image' ? 'reference_image' : 'image', el.files[0]);
                }
            } else {
                let value = el.value;
                if (input.type === 'number') {
                    value = parseFloat(value) || input.default || 0;
                }
                textParams[input.name] = value;
            }
        });

        if (textParams.prompt) formData.append('prompt', textParams.prompt);
        if (textParams.negative_prompt) formData.append('negative_prompt', textParams.negative_prompt);
        if (textParams.seed !== undefined) formData.append('seed', textParams.seed);
        if (textParams.steps !== undefined) formData.append('steps', textParams.steps);
        if (textParams.cfg_scale !== undefined) formData.append('cfg_scale', textParams.cfg_scale);

        const res = await fetch(`${API_BASE}/api/tasks/generate-with-upload`, {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (data.task_id) {
            pollTaskStatus(data.task_id);
        } else {
            throw new Error(data.message || '提交失败');
        }
    } catch (e) {
        document.getElementById('progressText').textContent = `错误: ${e.message}`;
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">✨</span><span>开始生成</span>';
    }
}

async function pollTaskStatus(taskId) {
    if (pollingTimer) clearInterval(pollingTimer);

    const checkStatus = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/tasks/${taskId}`);
            const task = await res.json();

            document.getElementById('progressFill').style.width = `${Math.max(task.progress * 100, 10)}%`;
            document.getElementById('progressText').textContent = task.message;

            if (task.status === 'completed') {
                clearInterval(pollingTimer);
                renderResults(task.result_urls || []);
                resetGenerateBtn();
                loadHistory();
            } else if (task.status === 'failed') {
                clearInterval(pollingTimer);
                document.getElementById('progressText').textContent = `失败: ${task.message}`;
                resetGenerateBtn();
                loadHistory();
            }
        } catch (e) {
            console.error('Poll error:', e);
        }
    };

    checkStatus();
    pollingTimer = setInterval(checkStatus, 2000);
}

function renderResults(urls) {
    const container = document.getElementById('resultImages');
    document.getElementById('progressArea').style.display = 'none';

    if (!urls.length) {
        document.getElementById('resultEmpty').style.display = 'flex';
        return;
    }

    container.innerHTML = urls.map(url => `
        <img src="${API_BASE}${url}" alt="生成结果" onclick="window.open('${API_BASE}${url}', '_blank')">
    `).join('');
}

function resetGenerateBtn() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">✨</span><span>开始生成</span>';
}

async function loadHistory() {
    try {
        const res = await fetch(`${API_BASE}/api/tasks?limit=12`);
        const tasks = await res.json();
        renderHistory(tasks);
    } catch (e) {
        console.error('Failed to load history:', e);
    }
}

function renderHistory(tasks) {
    const container = document.getElementById('historyList');

    if (!tasks.length) {
        container.innerHTML = '<p class="text-muted">暂无历史记录</p>';
        return;
    }

    container.innerHTML = tasks.map(task => {
        const thumb = task.result_urls && task.result_urls[0]
            ? `${API_BASE}${task.result_urls[0]}`
            : '';
        const time = task.created_at ? new Date(task.created_at * 1000).toLocaleString('zh-CN') : '';
        const statusText = {
            'pending': '排队中',
            'running': '生成中',
            'completed': '已完成',
            'failed': '失败'
        }[task.status] || task.status;

        return `
            <div class="history-item" data-id="${task.task_id}">
                ${thumb ? `<img src="${thumb}" alt="缩略图">` : '<div style="height:140px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;"><span style="font-size:32px;">🖼️</span></div>'}
                <div class="history-info">
                    <div class="history-status ${task.status}">${statusText}</div>
                    <div class="history-time">${time}</div>
                </div>
            </div>
        `;
    }).join('');
}

async function checkSystemStatus() {
    try {
        const res = await fetch(`${API_BASE}/api/system/status`);
        const data = await res.json();

        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');

        if (data.comfyui_running) {
            dot.className = 'status-dot online';
            text.textContent = 'ComfyUI 运行中';
        } else {
            dot.className = 'status-dot offline';
            text.textContent = 'ComfyUI 未连接';
        }
    } catch (e) {
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        dot.className = 'status-dot offline';
        text.textContent = 'API 未连接';
    }
}

function init() {
    fetchWorkflows();
    loadHistory();
    checkSystemStatus();

    setInterval(checkSystemStatus, 10000);

    document.getElementById('generateBtn').addEventListener('click', generate);
    document.getElementById('refreshHistoryBtn').addEventListener('click', loadHistory);
}

document.addEventListener('DOMContentLoaded', init);
