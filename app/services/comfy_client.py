import json
import uuid
import time
import asyncio
from pathlib import Path
from typing import Optional, Dict, Any, List
import requests
import websockets

from config import Config


class ComfyUIClient:
    def __init__(self, server_url: str = None):
        self.server_url = server_url or Config.COMFYUI_URL
        self.client_id = str(uuid.uuid4())

    def is_running(self) -> bool:
        try:
            resp = requests.get(f"{self.server_url}/system_stats", timeout=3)
            return resp.status_code == 200
        except Exception:
            return False

    def queue_prompt(self, workflow: Dict[str, Any]) -> str:
        payload = {
            "prompt": workflow,
            "client_id": self.client_id
        }
        resp = requests.post(f"{self.server_url}/prompt", json=payload)
        resp.raise_for_status()
        data = resp.json()
        return data["prompt_id"]

    def upload_image(self, image_path: str | Path, image_type: str = "input") -> Dict[str, Any]:
        image_path = Path(image_path)
        with open(image_path, "rb") as f:
            files = {"image": (image_path.name, f, "image/png")}
            data = {"type": image_type, "overwrite": "true"}
            resp = requests.post(f"{self.server_url}/upload/image", files=files, data=data)
            resp.raise_for_status()
            return resp.json()

    def get_image(self, filename: str, subfolder: str = "", image_type: str = "output") -> bytes:
        params = {"filename": filename, "subfolder": subfolder, "type": image_type}
        resp = requests.get(f"{self.server_url}/view", params=params)
        resp.raise_for_status()
        return resp.content

    def get_history(self, prompt_id: str) -> Dict[str, Any]:
        resp = requests.get(f"{self.server_url}/history/{prompt_id}")
        resp.raise_for_status()
        return resp.json()

    def get_queue(self) -> Dict[str, Any]:
        resp = requests.get(f"{self.server_url}/queue")
        resp.raise_for_status()
        return resp.json()

    async def wait_for_completion(self, prompt_id: str, timeout: int = 300) -> List[Dict[str, Any]]:
        ws_url = self.server_url.replace("http://", "ws://").replace("https://", "wss://")
        start_time = time.time()
        results = []

        async with websockets.connect(f"{ws_url}/ws?clientId={self.client_id}") as ws:
            while True:
                if time.time() - start_time > timeout:
                    raise TimeoutError(f"Generation timed out after {timeout}s")

                try:
                    msg = await asyncio.wait_for(ws.recv(), timeout=5.0)
                    if isinstance(msg, str):
                        data = json.loads(msg)
                        if data["type"] == "executing":
                            msg_data = data["data"]
                            if msg_data["node"] is None and msg_data["prompt_id"] == prompt_id:
                                break
                        elif data["type"] == "executed":
                            msg_data = data["data"]
                            if msg_data["prompt_id"] == prompt_id:
                                output = msg_data.get("output", {})
                                if "images" in output:
                                    for img in output["images"]:
                                        results.append(img)
                except asyncio.TimeoutError:
                    continue

        return results

    def get_output_images(self, prompt_id: str) -> List[bytes]:
        history = self.get_history(prompt_id)
        if prompt_id not in history:
            return []

        outputs = history[prompt_id].get("outputs", {})
        images = []
        for node_id, node_output in outputs.items():
            if "images" in node_output:
                for img_info in node_output["images"]:
                    img_data = self.get_image(
                        filename=img_info["filename"],
                        subfolder=img_info.get("subfolder", ""),
                        image_type=img_info.get("type", "output")
                    )
                    images.append(img_data)
        return images
