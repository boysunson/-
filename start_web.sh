#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_PORT=8000

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_banner() { echo -e "${CYAN}$1${NC}"; }

check_deps() {
    if ! python3 -c "import flask" 2>/dev/null; then
        log_info "安装Python依赖..."
        cd "$SCRIPT_DIR"
        pip3 install -r requirements.txt
    fi
}

print_banner() {
    echo ""
    log_banner "╔══════════════════════════════════════════════════════════╗"
    log_banner "║     建筑AI设计辅助工具 - Web界面                       ║"
    log_banner "╚══════════════════════════════════════════════════════════╝"
    echo ""
}

print_status() {
    echo ""
    log_info "=========================================="
    log_info "  Web界面已启动"
    log_info "=========================================="
    echo "  主界面:   http://127.0.0.1:$API_PORT"
    echo "  系统状态: http://127.0.0.1:$API_PORT/api/system/status"
    echo ""
    log_warn "提示: 请确保ComfyUI已启动并在8188端口监听"
    log_warn "      如需一键启动ComfyUI+Web，请运行 ./start.sh"
    echo ""
    echo "  按 Ctrl+C 停止服务"
    echo ""
}

main() {
    print_banner
    check_deps

    cd "$SCRIPT_DIR"
    python3 server.py &
    API_PID=$!

    print_status

    wait $API_PID
}

main "$@"
