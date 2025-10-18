"""Shared mobile core utilities for Principal app.

This module defines base models and services that can be re-used across
feature-specific modules. The focus is on providing a deterministic data
contract that other modules can rely on without pulling in heavyweight
framework dependencies.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional, Sequence


@dataclass
class DeviceProfile:
    """Represents a device that has been registered for a user."""

    device_id: str
    platform: str
    model: str
    os_version: str
    push_token: Optional[str] = None
    last_seen_at: Optional[datetime] = None
    metadata: Dict[str, str] = field(default_factory=dict)


@dataclass
class UserContext:
    """Light-weight representation of the signed-in user's context."""

    user_id: str
    tenant_id: str
    roles: Sequence[str]
    locale: str = "en_US"
    device: Optional[DeviceProfile] = None


@dataclass
class MobileNotification:
    """Encapsulates the payload of a push notification."""

    title: str
    body: str
    category: str
    data: Dict[str, str] = field(default_factory=dict)


class NotificationGateway:
    """In-memory notification publisher.

    The gateway can be replaced with a concrete integration in production
    environments. The in-memory implementation allows for deterministic
    tests and local experimentation.
    """

    def __init__(self) -> None:
        self._sent: List[MobileNotification] = []

    def publish(self, notification: MobileNotification) -> None:
        self._sent.append(notification)

    @property
    def sent_notifications(self) -> Sequence[MobileNotification]:
        return tuple(self._sent)


class Clock:
    """Simple clock abstraction for deterministic time management."""

    def now(self) -> datetime:
        return datetime.utcnow()
