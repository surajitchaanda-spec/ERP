"""Authentication helpers for the principal mobile application."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timedelta
from hashlib import sha256
from typing import Dict, Optional

from ..mobile_core import Clock, DeviceProfile, UserContext


@dataclass
class MFAChallenge:
    """Represents an MFA challenge issued to a user."""

    challenge_id: str
    user_id: str
    expires_at: datetime
    code_hash: str
    attempts: int = 0
    max_attempts: int = 5

    def verify(self, code: str) -> bool:
        if datetime.utcnow() > self.expires_at:
            return False
        if self.attempts >= self.max_attempts:
            return False
        self.attempts += 1
        return sha256(code.encode()).hexdigest() == self.code_hash


@dataclass
class Session:
    """Represents an authenticated session with device binding."""

    token: str
    context: UserContext
    issued_at: datetime
    expires_at: datetime
    bound_device_id: str

    def is_valid(self, now: datetime, device_id: str) -> bool:
        return now <= self.expires_at and device_id == self.bound_device_id


class AuthenticationService:
    """High-level authentication API that enforces MFA and device binding."""

    def __init__(self, clock: Optional[Clock] = None) -> None:
        self._clock = clock or Clock()
        self._mfa_challenges: Dict[str, MFAChallenge] = {}
        self._sessions: Dict[str, Session] = {}

    def issue_mfa(self, challenge_id: str, user: UserContext, code: str, ttl_seconds: int = 300) -> MFAChallenge:
        challenge = MFAChallenge(
            challenge_id=challenge_id,
            user_id=user.user_id,
            expires_at=self._clock.now() + timedelta(seconds=ttl_seconds),
            code_hash=sha256(code.encode()).hexdigest(),
        )
        self._mfa_challenges[challenge_id] = challenge
        return challenge

    def bind_device(self, user: UserContext, device: DeviceProfile) -> UserContext:
        return UserContext(
            user_id=user.user_id,
            tenant_id=user.tenant_id,
            roles=user.roles,
            locale=user.locale,
            device=device,
        )

    def create_session(self, token: str, context: UserContext, ttl_seconds: int = 3600) -> Session:
        session = Session(
            token=token,
            context=context,
            issued_at=self._clock.now(),
            expires_at=self._clock.now() + timedelta(seconds=ttl_seconds),
            bound_device_id=context.device.device_id if context.device else "",
        )
        self._sessions[token] = session
        return session

    def validate_session(self, token: str, device_id: str) -> bool:
        session = self._sessions.get(token)
        if not session:
            return False
        return session.is_valid(self._clock.now(), device_id)

    def consume_mfa(self, challenge_id: str, code: str) -> bool:
        challenge = self._mfa_challenges.get(challenge_id)
        if not challenge:
            return False
        verified = challenge.verify(code)
        if verified:
            del self._mfa_challenges[challenge_id]
        return verified
