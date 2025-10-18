"""Budget expense workflow."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict

from .state_machine import StateMachine, Transition


@dataclass
class BudgetExpense:
    expense_id: str
    department: str
    amount: float
    purpose: str
    state: str = "draft"
    approvals: Dict[str, str] = field(default_factory=dict)


class BudgetWorkflow:
    def __init__(self) -> None:
        transitions = [
            Transition("draft", "submitted", "submit", ["department_head"]),
            Transition("submitted", "review", "request_review", ["finance"]),
            Transition("review", "approved", "approve", ["principal"]),
            Transition("review", "rejected", "reject", ["principal"]),
            Transition("approved", "scheduled", "schedule_payment", ["finance"]),
        ]
        self._machine = StateMachine("draft", transitions)

    def act(self, expense: BudgetExpense, action: str, role: str, note: str) -> BudgetExpense:
        expense.state = self._machine.apply(expense.state, action, role)
        expense.approvals[action] = note
        return expense
