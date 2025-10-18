"""State machine primitives for approval workflows."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional


@dataclass
class Transition:
    source: str
    target: str
    action: str
    allowed_roles: Iterable[str]


class StateMachine:
    def __init__(self, initial_state: str, transitions: Iterable[Transition]):
        self.initial_state = initial_state
        self._transitions: Dict[str, List[Transition]] = {}
        for transition in transitions:
            self._transitions.setdefault(transition.source, []).append(transition)

    def next_states(self, state: str, role: str) -> List[Transition]:
        return [t for t in self._transitions.get(state, []) if role in t.allowed_roles]

    def can_transition(self, state: str, action: str, role: str) -> bool:
        return any(t for t in self.next_states(state, role) if t.action == action)

    def apply(self, state: str, action: str, role: str) -> str:
        for transition in self.next_states(state, role):
            if transition.action == action:
                return transition.target
        raise ValueError(f"Action {action} not permitted for role {role} in state {state}")
