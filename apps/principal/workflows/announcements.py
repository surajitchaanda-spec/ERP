"""Announcement approval workflow."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict

from .state_machine import StateMachine, Transition


@dataclass
class Announcement:
    announcement_id: str
    title: str
    body: str
    audience: str
    state: str = "draft"
    audit: Dict[str, str] = field(default_factory=dict)


class AnnouncementWorkflow:
    def __init__(self) -> None:
        transitions = [
            Transition("draft", "review", "submit_for_review", ["staff", "principal"]),
            Transition("review", "approved", "approve", ["principal"]),
            Transition("review", "rejected", "reject", ["principal"]),
            Transition("approved", "published", "publish", ["principal"]),
        ]
        self._machine = StateMachine("draft", transitions)

    def act(self, announcement: Announcement, action: str, role: str, note: str) -> Announcement:
        announcement.state = self._machine.apply(announcement.state, action, role)
        announcement.audit[action] = note
        return announcement
