"""Communication utilities for the principal application."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Sequence

from ..mobile_core import MobileNotification, NotificationGateway, UserContext


@dataclass
class AnnouncementDraft:
    title: str
    message: str
    audience: Sequence[str]
    attachments: Sequence[str] = ()
    metadata: Dict[str, str] = field(default_factory=dict)


@dataclass
class Meeting:
    meeting_id: str
    title: str
    scheduled_for: datetime
    participants: Sequence[str]
    agenda: Sequence[str]


@dataclass
class ObservationNote:
    staff_id: str
    observed_at: datetime
    strengths: str
    opportunities: str
    next_steps: str


class BroadcastComposer:
    def __init__(self, gateway: NotificationGateway) -> None:
        self._gateway = gateway

    def send(self, draft: AnnouncementDraft) -> None:
        notification = MobileNotification(
            title=draft.title,
            body=draft.message,
            category="broadcast",
            data={"audience": ",".join(draft.audience), **draft.metadata},
        )
        self._gateway.publish(notification)


class MeetingScheduler:
    def __init__(self) -> None:
        self._meetings: Dict[str, Meeting] = {}

    def schedule(self, meeting: Meeting) -> Meeting:
        self._meetings[meeting.meeting_id] = meeting
        return meeting

    def get_meeting(self, meeting_id: str) -> Meeting:
        return self._meetings[meeting_id]


class ObservationRepository:
    def __init__(self) -> None:
        self._notes: List[ObservationNote] = []

    def add(self, note: ObservationNote) -> None:
        self._notes.append(note)

    def by_staff(self, staff_id: str) -> List[ObservationNote]:
        return [note for note in self._notes if note.staff_id == staff_id]
