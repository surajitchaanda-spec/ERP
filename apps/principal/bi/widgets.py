"""BI/reporting widgets integration stubs."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Literal, Optional


IntegrationType = Literal["powerbi", "tableau", "custom"]


@dataclass
class BIEmbedConfig:
    integration: IntegrationType
    resource_id: str
    access_token: str
    filters: Dict[str, str]
    theme: Optional[str] = None


class ReportingWidget:
    def __init__(self, config: BIEmbedConfig) -> None:
        self.config = config

    def export(self, fmt: Literal["pdf", "excel"]) -> str:
        if fmt not in {"pdf", "excel"}:
            raise ValueError("Unsupported export format")
        return f"export::{self.config.resource_id}::{fmt}"

    def render_payload(self) -> Dict[str, str]:
        return {
            "integration": self.config.integration,
            "resourceId": self.config.resource_id,
            "token": self.config.access_token,
            "filters": self.config.filters,
            "theme": self.config.theme or "default",
        }
