import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

class Config:
    BASE_DIR: Path = BASE_DIR

    COMFYUI_DIR: Path = BASE_DIR / "comfyui"
    COMFYUI_URL: str = "http://127.0.0.1:8188"
    COMFYUI_TIMEOUT: int = 300

    WORKFLOWS_DIR: Path = BASE_DIR / "workflows"
    OUTPUTS_DIR: Path = BASE_DIR / "outputs"
    UPLOADS_DIR: Path = BASE_DIR / "uploads"
    FRONTEND_DIR: Path = BASE_DIR / "frontend"

    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    MAX_UPLOAD_SIZE: int = 50 * 1024 * 1024

    @classmethod
    def ensure_dirs(cls):
        for d in [cls.WORKFLOWS_DIR, cls.OUTPUTS_DIR, cls.UPLOADS_DIR, cls.FRONTEND_DIR]:
            d.mkdir(parents=True, exist_ok=True)
