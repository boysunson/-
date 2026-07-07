import json
import copy
from pathlib import Path
from typing import Dict, Any, List, Optional

from config import Config


class WorkflowManager:
    def __init__(self, workflows_dir: Path = None):
        self.workflows_dir = workflows_dir or Config.WORKFLOWS_DIR
        self._cache: Dict[str, Dict[str, Any]] = {}

    def list_workflows(self) -> List[Dict[str, str]]:
        workflows = []
        if not self.workflows_dir.exists():
            return workflows
        for f in sorted(self.workflows_dir.glob("*.json")):
            name = f.stem
            meta = self._get_workflow_meta(name)
            workflows.append({
                "id": name,
                "name": meta.get("name", name),
                "description": meta.get("description", ""),
                "category": meta.get("category", "general")
            })
        return workflows

    def _get_workflow_meta(self, workflow_id: str) -> Dict[str, Any]:
        wf = self.load_workflow(workflow_id)
        return wf.get("_meta", {}) if "_meta" in wf else {}

    def load_workflow(self, workflow_id: str) -> Dict[str, Any]:
        if workflow_id in self._cache:
            return copy.deepcopy(self._cache[workflow_id])

        wf_path = self.workflows_dir / f"{workflow_id}.json"
        if not wf_path.exists():
            raise FileNotFoundError(f"Workflow not found: {workflow_id}")

        with open(wf_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        self._cache[workflow_id] = data
        return copy.deepcopy(data)

    def apply_params(self, workflow_id: str, params: Dict[str, Any]) -> Dict[str, Any]:
        wf = self.load_workflow(workflow_id)
        nodes = wf.get("nodes", wf)

        if "nodes" in wf:
            wf = self._convert_api_format(wf)

        for key, value in params.items():
            self._set_node_value(wf, key, value)

        return wf

    def _convert_api_format(self, workflow_with_ui: Dict[str, Any]) -> Dict[str, Any]:
        return workflow_with_ui.get("api", workflow_with_ui)

    def _set_node_value(self, workflow: Dict[str, Any], param_key: str, value: Any):
        for node_id, node in workflow.items():
            if not isinstance(node, dict):
                continue
            inputs = node.get("inputs", {})
            for input_name in list(inputs.keys()):
                if f"{node_id}.{input_name}" == param_key or input_name == param_key:
                    inputs[input_name] = value
                    return

        for node_id, node in workflow.items():
            if not isinstance(node, dict):
                continue
            meta = node.get("_meta", {})
            title = meta.get("title", "")
            if title and title in param_key:
                inputs = node.get("inputs", {})
                for input_name in inputs:
                    if input_name in param_key or param_key.endswith(input_name):
                        inputs[input_name] = value
                        return

    def get_workflow_schema(self, workflow_id: str) -> Dict[str, Any]:
        meta = self._get_workflow_meta(workflow_id)
        return {
            "id": workflow_id,
            "name": meta.get("name", workflow_id),
            "description": meta.get("description", ""),
            "category": meta.get("category", "general"),
            "inputs": meta.get("inputs", []),
            "outputs": meta.get("outputs", [])
        }


workflow_manager = WorkflowManager()
