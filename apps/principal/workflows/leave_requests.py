"""Leave request approval workflow."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict

from .state_machine import StateMachine, Transition


@dataclass
class LeaveRequest:
    request_id: str
    requester_id: str
    reason: str
    state: str = "draft"
    history: Dict[str, str] = field(default_factory=dict)


class LeaveWorkflow:
    def __init__(self) -> None:
        transitions = [
            Transition("draft", "submitted", "submit", ["staff"]),
            Transition("submitted", "approved", "approve", ["principal", "vice_principal"]),
            Transition("submitted", "rejected", "reject", ["principal", "vice_principal"]),
            Transition("approved", "archived", "archive", ["principal"]),
            Transition("rejected", "archived", "archive", ["principal"]),
        ]
        self._machine = StateMachine(initial_state="draft", transitions=transitions)

    def act(self, request: LeaveRequest, action: str, role: str, note: str) -> LeaveRequest:
        new_state = self._machine.apply(request.state, action, role)
        request.history[action] = note
        request.state = new_state
        return request
