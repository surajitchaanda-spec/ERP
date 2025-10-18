"""Executive dashboards for the principal app."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from statistics import mean
from typing import Iterable, List, Sequence


@dataclass
class AttendanceRecord:
    """Represents a student's attendance entry."""

    student_id: str
    timestamp: datetime
    status: str  # present, absent, late


@dataclass
class AttendanceSummary:
    total_students: int
    present: int
    absent: int
    late: int

    @property
    def attendance_rate(self) -> float:
        return (self.present / self.total_students) * 100 if self.total_students else 0.0


def build_attendance_summary(records: Sequence[AttendanceRecord], roster_size: int) -> AttendanceSummary:
    present = sum(1 for r in records if r.status == "present")
    absent = sum(1 for r in records if r.status == "absent")
    late = sum(1 for r in records if r.status == "late")
    return AttendanceSummary(total_students=roster_size, present=present, absent=absent, late=late)


@dataclass
class FeeCollection:
    amount: float
    received_at: datetime
    channel: str


def aggregate_fee_collection(fees: Iterable[FeeCollection]) -> float:
    return sum(f.amount for f in fees)


@dataclass
class AcademicPerformance:
    subject: str
    score: float
    max_score: float
    term: str

    @property
    def normalized_score(self) -> float:
        return (self.score / self.max_score) * 100 if self.max_score else 0.0


def performance_trend(records: Sequence[AcademicPerformance]) -> List[float]:
    return [r.normalized_score for r in records]


@dataclass
class IncidentLog:
    incident_id: str
    recorded_at: datetime
    severity: str
    description: str


def filter_incidents(incidents: Sequence[IncidentLog], min_severity: str) -> List[IncidentLog]:
    severity_rank = {"low": 0, "medium": 1, "high": 2, "critical": 3}
    threshold = severity_rank.get(min_severity, 0)
    return [incident for incident in incidents if severity_rank.get(incident.severity, 0) >= threshold]
