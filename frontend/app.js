const API_BASE = '';

let workflows = [];
let currentWorkflow = null;
let pollingTimer = null;
let statusTimer = null;
let isInitialized = false;

const workflowIcons = {
    '建筑设计': '🏢',
    '室内设计': '🏠',
    '风格迁移': '🎨',
    'general': '✨'
};

function getWorkflowIcon(category) {
    return workflowIcons[category] || workflowIcons['general'];
}

function showToast(message, type) {
    var existing = document.getElementById('toastMsg');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.classList.add('show');
    }, 10);

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            if (toast.parentNode) toast.remove();
        }, 300);
    }, 3000);
}

async function fetchWorkflows() {
    try {
        const res = await fetch(API_BASE + '/api/workflows');
        workflows = await res.json();
        renderWorkflowList();
    } catch (e) {
        var el = document.getElementById('workflowList');
        if (el) el.innerHTML = '<p class="text-muted">加载失败，请刷新重试</p>';
    }
}

function renderWorkflowList() {
    var container = document.getElementById('workflowList');
    if (!container) return;
    if (!workflows.length) {
        container.innerHTML = '<p class="text-muted">暂无可用工作流</p>';
        return;
    }

    var html = '';
    for (var i = 0; i < workflows.length; i++) {
        var wf = workflows[i];
        html += '<div class="workflow-item" data-id="' + wf.id + '">' +
            '<div class="workflow-icon">' + getWorkflowIcon(wf.category) + '</div>' +
            '<div class="workflow-name">' + wf.name + '</div>' +
            '<div class="workflow-category">' + wf.category + '</div>' +
            '</div>';
    }
    container.innerHTML = html;

    var items = container.querySelectorAll('.workflow-item');
    for (var j = 0; j < items.length; j++) {
        (function(item) {
            item.onclick = function() { selectWorkflow(item.dataset.id); };
        })(items[j]);
    }
}

async function selectWorkflow(workflowId) {
    var items = document.querySelectorAll('.workflow-item');
    for (var i = 0; i < items.length; i++) {
        if (items[i].dataset.id === workflowId) {
            items[i].classList.add('active');
        } else {
            items[i].classList.remove('active');
        }
    }

    try {
        const res = await fetch(API_BASE + '/api/workflows/' + workflowId);
        currentWorkflow = await res.json();

        var nameEl = document.getElementById('workflowName');
        var descEl = document.getElementById('workflowDesc');
        if (nameEl) nameEl.textContent = currentWorkflow.name;
        if (descEl) descEl.textContent = currentWorkflow.description || '';

        renderParamsForm(currentWorkflow.inputs || []);
        var btn = document.getElementById('generateBtn');
        if (btn) btn.disabled = false;
    } catch (e) {
        console.error('Failed to load workflow:', e);
    }
}

function renderParamsForm(inputs) {
    var form = document.getElementById('paramsForm');
    if (!form) return;

    if (!inputs.length) {
        form.innerHTML = '<div class="empty-state"><p>该工作流无需配置参数</p></div>';
        return;
    }

    var html = '';
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var id = 'param_' + input.name;
        var label = input.label || input.name;
        var hint = input.description ? '<span class="form-hint">' + input.description + '</span>' : '';

        var field = '';
        switch (input.type) {
            case 'text':
                field = '<textarea id="' + id + '" name="' + input.name + '" rows="3" placeholder="' + (input.default || '') + '">' + (input.default || '') + '</textarea>';
                break;
            case 'number':
                field = '<input type="number" id="' + id + '" name="' + input.name + '" value="' + (input.default != null ? input.default : '') + '" step="any">';
                break;
            case 'select':
                var opts = '';
                if (input.options) {
                    for (var k = 0; k < input.options.length; k++) {
                        var sel = input.options[k] === input.default ? ' selected' : '';
                        opts += '<option value="' + input.options[k] + '"' + sel + '>' + input.options[k] + '</option>';
                    }
                }
                field = '<select id="' + id + '" name="' + input.name + '">' + opts + '</select>';
                break;
            case 'image':
                field = '<input type="file" id="' + id + '" name="' + input.name + '" accept="image/*">' +
                    '<img class="image-upload-preview" id="' + id + '_preview" alt="预览">';
                break;
            default:
                field = '<input type="text" id="' + id + '" name="' + input.name + '" value="' + (input.default || '') + '">';
        }

        html += '<div class="form-group"><label for="' + id + '">' + label + '</label>' + field + hint + '</div>';
    }
    form.innerHTML = html;

    for (var j = 0; j < inputs.length; j++) {
        if (inputs[j].type === 'image') {
            (function(input) {
                var fileInput = document.getElementById('param_' + input.name);
                var preview = document.getElementById('param_' + input.name + '_preview');
                if (fileInput && preview) {
                    fileInput.onchange = function(e) {
                        var file = e.target.files[0];
                        if (file) {
                            var reader = new FileReader();
                            reader.onload = function(ev) {
                                preview.src = ev.target.result;
                                preview.classList.add('visible');
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                }
            })(inputs[j]);
        }
    }
}

async function generate() {
    if (!currentWorkflow) return;

    var btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span><span>生成中...</span>';

    var emptyEl = document.getElementById('resultEmpty');
    var imgEl = document.getElementById('resultImages');
    var progEl = document.getElementById('progressArea');
    var fillEl = document.getElementById('progressFill');
    var textEl = document.getElementById('progressText');

    if (emptyEl) emptyEl.style.display = 'none';
    if (imgEl) imgEl.innerHTML = '';
    if (progEl) progEl.style.display = 'block';
    if (fillEl) fillEl.style.width = '5%';
    if (textEl) textEl.textContent = '准备中...';

    try {
        var formData = new FormData();
        formData.append('workflow_id', currentWorkflow.id);

        var inputs = currentWorkflow.inputs || [];
        var textParams = {};

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var el = document.getElementById('param_' + input.name);
            if (!el) continue;

            if (input.type === 'image') {
                if (el.files && el.files[0]) {
                    var fieldName = input.name === 'reference_image' ? 'reference_image' : 'image';
                    formData.append(fieldName, el.files[0]);
                }
            } else {
                var value = el.value;
                if (input.type === 'number') {
                    value = parseFloat(value) || input.default || 0;
                }
                textParams[input.name] = value;
            }
        }

        if (textParams.prompt) formData.append('prompt', textParams.prompt);
        if (textParams.negative_prompt) formData.append('negative_prompt', textParams.negative_prompt);
        if (textParams.seed !== undefined) formData.append('seed', textParams.seed);
        if (textParams.steps !== undefined) formData.append('steps', textParams.steps);
        if (textParams.cfg_scale !== undefined) formData.append('cfg_scale', textParams.cfg_scale);

        var res = await fetch(API_BASE + '/api/tasks/generate-with-upload', {
            method: 'POST',
            body: formData
        });

        var data = await res.json();
        if (data.task_id) {
            pollTaskStatus(data.task_id);
        } else {
            throw new Error(data.message || '提交失败');
        }
    } catch (e) {
        if (textEl) textEl.textContent = '错误: ' + e.message;
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">✨</span><span>开始生成</span>';
    }
}

function pollTaskStatus(taskId) {
    if (pollingTimer) clearTimeout(pollingTimer);

    var checkStatus = async function() {
        try {
            var res = await fetch(API_BASE + '/api/tasks/' + taskId);
            var task = await res.json();

            var fillEl = document.getElementById('progressFill');
            var textEl = document.getElementById('progressText');

            if (fillEl) fillEl.style.width = Math.max(task.progress * 100, 10) + '%';
            if (textEl) textEl.textContent = task.message;

            if (task.status === 'completed') {
                renderResults(task.result_urls || []);
                resetGenerateBtn();
                loadHistory();
            } else if (task.status === 'failed') {
                if (textEl) textEl.textContent = '失败: ' + task.message;
                resetGenerateBtn();
                loadHistory();
            } else {
                pollingTimer = setTimeout(checkStatus, 2000);
            }
        } catch (e) {
            console.error('Poll error:', e);
            pollingTimer = setTimeout(checkStatus, 3000);
        }
    };

    checkStatus();
}

function renderResults(urls) {
    var container = document.getElementById('resultImages');
    var progEl = document.getElementById('progressArea');
    if (progEl) progEl.style.display = 'none';

    if (!container) return;
    if (!urls.length) {
        var emptyEl = document.getElementById('resultEmpty');
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }

    var html = '';
    for (var i = 0; i < urls.length; i++) {
        html += '<img src="' + API_BASE + urls[i] + '" alt="生成结果" data-url="' + API_BASE + urls[i] + '">';
    }
    container.innerHTML = html;

    var imgs = container.querySelectorAll('img');
    for (var j = 0; j < imgs.length; j++) {
        (function(img) {
            img.onclick = function() {
                window.open(img.dataset.url, '_blank');
            };
        })(imgs[j]);
    }
}

function resetGenerateBtn() {
    var btn = document.getElementById('generateBtn');
    if (!btn) return;
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">✨</span><span>开始生成</span>';
}

async function loadHistory() {
    try {
        var res = await fetch(API_BASE + '/api/tasks?limit=12');
        var tasks = await res.json();
        renderHistory(tasks);
    } catch (e) {
        console.error('Failed to load history:', e);
    }
}

function renderHistory(tasks) {
    var container = document.getElementById('historyList');
    if (!container) return;

    if (!tasks.length) {
        container.innerHTML = '<p class="text-muted">暂无历史记录</p>';
        return;
    }

    var statusMap = {
        'pending': '排队中',
        'running': '生成中',
        'completed': '已完成',
        'failed': '失败'
    };

    var html = '';
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var thumb = task.result_urls && task.result_urls[0] ? API_BASE + task.result_urls[0] : '';
        var time = task.created_at ? new Date(task.created_at * 1000).toLocaleString('zh-CN') : '';
        var statusText = statusMap[task.status] || task.status;
        var imgHtml = thumb
            ? '<img src="' + thumb + '" alt="缩略图">'
            : '<div style="height:140px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;"><span style="font-size:32px;">🖼️</span></div>';

        html += '<div class="history-item" data-id="' + task.task_id + '">' +
            imgHtml +
            '<div class="history-info">' +
            '<div class="history-status ' + task.status + '">' + statusText + '</div>' +
            '<div class="history-time">' + time + '</div>' +
            '</div></div>';
    }
    container.innerHTML = html;
}

function checkSystemStatus() {
    fetch(API_BASE + '/api/system/status')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            var dot = document.getElementById('statusDot');
            var text = document.getElementById('statusText');
            if (!dot || !text) return;

            if (data.comfyui_running) {
                dot.className = 'status-dot online';
                text.textContent = 'ComfyUI 已连接';
            } else {
                dot.className = 'status-dot offline';
                text.textContent = 'ComfyUI 未连接';
            }
        })
        .catch(function() {
            var dot = document.getElementById('statusDot');
            var text = document.getElementById('statusText');
            if (dot && text) {
                dot.className = 'status-dot offline';
                text.textContent = 'API 未连接';
            }
        });
}

function scheduleNextStatusCheck() {
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(function() {
        checkSystemStatus();
        scheduleNextStatusCheck();
    }, 15000);
}

async function loadConfig() {
    try {
        var res = await fetch(API_BASE + '/api/system/config');
        var data = await res.json();
        var input = document.getElementById('comfyuiUrl');
        if (input) input.value = data.comfyui_url || '';
    } catch (e) {
        console.error('Failed to load config:', e);
    }
}

async function saveConfig() {
    var input = document.getElementById('comfyuiUrl');
    var url = input ? input.value.trim() : '';
    if (!url) {
        showToast('请输入ComfyUI地址', 'error');
        return;
    }

    var btn = document.getElementById('saveConfigBtn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = '连接中...';
    }

    try {
        var res = await fetch(API_BASE + '/api/system/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comfyui_url: url })
        });

        var data = await res.json();
        if (data.success) {
            if (data.connected) {
                showToast('连接成功！ComfyUI已就绪', 'success');
            } else {
                showToast('地址已保存，但无法连接到ComfyUI，请检查是否已启动', 'error');
            }
            toggleConfigPanel();
            checkSystemStatus();
        } else {
            showToast(data.message || '保存失败', 'error');
        }
    } catch (e) {
        showToast('保存失败: ' + e.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = '保存并连接';
        }
    }
}

function toggleConfigPanel() {
    var panel = document.getElementById('configPanel');
    if (panel) panel.classList.toggle('active');
}

function init() {
    if (isInitialized) return;
    isInitialized = true;

    fetchWorkflows();
    loadHistory();
    loadConfig();
    checkSystemStatus();
    scheduleNextStatusCheck();

    var genBtn = document.getElementById('generateBtn');
    if (genBtn) genBtn.onclick = generate;

    var refBtn = document.getElementById('refreshHistoryBtn');
    if (refBtn) refBtn.onclick = loadHistory;

    var cfgBtn = document.getElementById('configBtn');
    if (cfgBtn) cfgBtn.onclick = function(e) {
        e.stopPropagation();
        toggleConfigPanel();
    };

    var saveBtn = document.getElementById('saveConfigBtn');
    if (saveBtn) saveBtn.onclick = function(e) {
        e.stopPropagation();
        saveConfig();
    };

    var cancelBtn = document.getElementById('cancelConfigBtn');
    if (cancelBtn) cancelBtn.onclick = function(e) {
        e.stopPropagation();
        toggleConfigPanel();
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
