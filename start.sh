#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMFYUI_DIR="$SCRIPT_DIR/comfyui"
API_PORT=8000
COMFYUI_PORT=8188

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_banner() { echo -e "${CYAN}$1${NC}"; }

COMAFYUI_PID=""
API_PID=""

cleanup() {
    echo ""
    log_info "正在停止服务..."
    if [ -n "$COMAFYUI_PID" ]; then
        kill "$COMAFYUI_PID" 2>/dev/null || true
    fi
    if [ -n "$API_PID" ]; then
        kill "$API_PID" 2>/dev/null || true
    fi
    log_info "服务已停止"
    exit 0
}

trap cleanup SIGINT SIGTERM

check_comfyui() {
    if [ ! -d "$COMFYUI_DIR" ]; then
        log_error "ComfyUI未安装，请先运行 ./install_comfyui.sh"
        exit 1
    fi
}

start_comfyui() {
    log_info "启动ComfyUI服务..."
    cd "$COMFYUI_DIR"

    if [ -f "venv/bin/python" ]; then
        source venv/bin/activate
    fi

    python main.py --listen 127.0.0.1 --port $COMFYUI_PORT &
    COMFYUI_PID=$!

    log_info "ComfyUI PID: $COMFYUI_PID"

    log_info "等待ComfyUI启动..."
    for i in {1..60}; do
        if curl -s "http://127.0.0.1:$COMFYUI_PORT/system_stats" > /dev/null 2>&1; then
            log_info "ComfyUI 启动成功: http://127.0.0.1:$COMFYUI_PORT"
            return 0
        fi
        sleep 1
    done

    log_warn "ComfyUI启动超时，请检查日志"
}

start_api() {
    log_info "启动API服务和Web界面..."
    cd "$SCRIPT_DIR"

    python3 server.py &
    API_PID=$!

    log_info "API服务 PID: $API_PID"
    log_info "Web界面: http://127.0.0.1:$API_PORT"
    log_info "系统状态: http://127.0.0.1:$API_PORT/api/system/status"
}

check_api_deps() {
    if ! python3 -c "import flask" 2>/dev/null; then
        log_info "安装Python依赖..."
        cd "$SCRIPT_DIR"
        pip3 install -r requirements.txt
    fi
}

print_banner() {
    echo ""
    log_banner "╔══════════════════════════════════════════════════════════╗"
    log_banner "║     建筑AI设计辅助工具 - 本地部署版                    ║"
    log_banner "╚══════════════════════════════════════════════════════════╝"
    echo ""
}

print_status() {
    echo ""
    log_info "=========================================="
    log_info "  服务运行中"
    log_info "=========================================="
    echo "  主界面:      http://127.0.0.1:$API_PORT"
    echo "  系统状态:    http://127.0.0.1:$API_PORT/api/system/status"
    echo "  ComfyUI:     http://127.0.0.1:$COMFYUI_PORT"
    echo ""
    echo "  按 Ctrl+C 停止所有服务"
    echo ""
}

main() {
    print_banner

    check_api_deps
    check_comfyui
    start_comfyui
    start_api
    print_status

    wait
}

main "$@"
