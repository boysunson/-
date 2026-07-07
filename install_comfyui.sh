#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMFYUI_DIR="$SCRIPT_DIR/comfyui"
PYTHON_BIN="python3"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

check_python() {
    log_info "检查Python版本..."
    if ! command -v python3 &> /dev/null; then
        log_error "未找到Python3，请先安装Python 3.10-3.12"
        exit 1
    fi
    PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
    log_info "当前Python版本: $PYTHON_VERSION"
}

check_git() {
    log_info "检查Git..."
    if ! command -v git &> /dev/null; then
        log_error "未找到Git，请先安装Git"
        exit 1
    fi
}

install_comfyui() {
    if [ -d "$COMFYUI_DIR" ]; then
        log_warn "ComfyUI目录已存在，跳过克隆"
    else
        log_info "正在克隆ComfyUI..."
        git clone https://github.com/comfyanonymous/ComfyUI.git "$COMFYUI_DIR"
    fi
}

create_venv() {
    VENV_DIR="$COMFYUI_DIR/venv"
    if [ -d "$VENV_DIR" ]; then
        log_info "虚拟环境已存在"
    else
        log_info "创建Python虚拟环境..."
        cd "$COMFYUI_DIR"
        python3 -m venv venv
    fi
    source "$VENV_DIR/bin/activate"
}

install_dependencies() {
    log_info "安装ComfyUI依赖..."
    cd "$COMFYUI_DIR"
    source venv/bin/activate

    log_info "安装PyTorch (CUDA版本)..."
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121 || {
        log_warn "CUDA版本安装失败，尝试CPU版本..."
        pip install torch torchvision torchaudio
    }

    log_info "安装其他依赖..."
    pip install -r requirements.txt

    log_info "安装websockets..."
    pip install websockets
}

install_manager() {
    log_info "安装ComfyUI-Manager插件..."
    CUSTOM_NODES_DIR="$COMFYUI_DIR/custom_nodes"
    MANAGER_DIR="$CUSTOM_NODES_DIR/ComfyUI-Manager"

    if [ -d "$MANAGER_DIR" ]; then
        log_warn "ComfyUI-Manager已安装，跳过"
    else
        mkdir -p "$CUSTOM_NODES_DIR"
        cd "$CUSTOM_NODES_DIR"
        git clone https://github.com/ltdrdata/ComfyUI-Manager.git
    fi
}

create_model_dirs() {
    log_info "创建模型目录..."
    mkdir -p "$COMFYUI_DIR/models/checkpoints"
    mkdir -p "$COMFYUI_DIR/models/controlnet"
    mkdir -p "$COMFYUI_DIR/models/loras"
    mkdir -p "$COMFYUI_DIR/models/vae"
    mkdir -p "$COMFYUI_DIR/models/ipadapter"
    mkdir -p "$COMFYUI_DIR/models/clip_vision"
    mkdir -p "$COMFYUI_DIR/input"
    mkdir -p "$COMFYUI_DIR/output"
}

print_model_guide() {
    echo ""
    log_info "=========================================="
    log_info "  ComfyUI 安装完成！"
    log_info "=========================================="
    echo ""
    echo "接下来请下载以下模型到对应的目录："
    echo ""
    echo "【基础大模型】→ comfyui/models/checkpoints/"
    echo "  - ArchitectureRealMix (建筑专用)"
    echo "  - LEOSAM HelloWorld (写实风格)"
    echo "  - Realistic Vision (室内写实)"
    echo ""
    echo "【ControlNet模型】→ comfyui/models/controlnet/"
    echo "  - control_v11f1p_sd15_depth.pth (深度图)"
    echo "  - control_v11p_sd15_canny.pth (边缘检测)"
    echo "  - control_v11p_sd15_lineart.pth (线稿)"
    echo "  - control_v11p_sd15_mlsd.pth (直线检测)"
    echo ""
    echo "【LoRA模型】→ comfyui/models/loras/"
    echo "  - 建筑风格LoRA (现代/新古典/参数化等)"
    echo "  - 室内风格LoRA (奶油风/侘寂风/北欧等)"
    echo ""
    echo "【IP-Adapter模型】→ comfyui/models/ipadapter/"
    echo "  - ip-adapter-plus_sd15.safetensors"
    echo ""
    echo "下载地址推荐："
    echo "  - Civitai: https://civitai.com"
    echo "  - HuggingFace: https://huggingface.co"
    echo "  - 国内镜像: https://www.liblib.art"
    echo ""
    log_info "运行 ./start.sh 启动服务"
    echo ""
}

main() {
    echo ""
    echo "=========================================="
    echo "  建筑AI设计辅助工具 - ComfyUI 安装脚本"
    echo "=========================================="
    echo ""

    check_python
    check_git
    install_comfyui
    create_venv
    install_dependencies
    install_manager
    create_model_dirs
    print_model_guide
}

main "$@"
