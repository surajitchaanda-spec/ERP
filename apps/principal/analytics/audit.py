"""Audit logging and analytics utilities."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Iterable, List, Sequence


@dataclass
class AuditEntry:
    timestamp: datetime
    actor_id: str
    action: str
    resource: str
    metadata: Dict[str, str]


class AuditLog:
    def __init__(self) -> None:
        self._entries: List[AuditEntry] = []

    def record(self, entry: AuditEntry) -> None:
        self._entries.append(entry)

    def by_actor(self, actor_id: str) -> List[AuditEntry]:
        return [entry for entry in self._entries if entry.actor_id == actor_id]

    def all(self) -> Sequence[AuditEntry]:
        return tuple(self._entries)


@dataclass
class Delegation:
    delegator_id: str
    delegate_id: str
    role: str
    expires_at: datetime


class DelegationRegistry:
    def __init__(self) -> None:
        self._delegations: List[Delegation] = []

    def grant(self, delegation: Delegation) -> None:
        self._delegations.append(delegation)

    def active_for(self, user_id: str, as_of: datetime) -> List[Delegation]:
        return [d for d in self._delegations if d.delegate_id == user_id and d.expires_at >= as_of]


@dataclass
class UsageEvent:
    timestamp: datetime
    user_id: str
    feature: str


class UsageAnalytics:
    def __init__(self) -> None:
        self._events: List[UsageEvent] = []

    def record(self, event: UsageEvent) -> None:
        self._events.append(event)

    def usage_by_feature(self) -> Dict[str, int]:
        counts: Dict[str, int] = {}
        for event in self._events:
            counts[event.feature] = counts.get(event.feature, 0) + 1
        return counts

    def compliance_ratio(self, required_events: Iterable[str]) -> float:
        total_required = 0
        completed = 0
        seen = {event.feature for event in self._events}
        for feature in required_events:
            total_required += 1
            if feature in seen:
                completed += 1
        return (completed / total_required) * 100 if total_required else 0.0
