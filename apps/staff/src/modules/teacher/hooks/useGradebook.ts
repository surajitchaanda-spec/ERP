import { useEffect, useState } from 'react';
import { OfflineStore } from '@erp/mobile-core';

interface GradeEntry {
  studentId: string;
  studentName: string;
  score: number;
  updatedAt: number;
}

interface AssignmentGrades {
  assignmentId: string;
  assignmentName: string;
  grades: GradeEntry[];
}

const makeRecordId = (assignmentId: string, studentId: string) => `${assignmentId}:${studentId}`;

export const useGradebook = () => {
  const [gradebook, setGradebook] = useState<AssignmentGrades[]>([]);
  const [store] = useState(new OfflineStore<{ id: string; updatedAt: number }>);

  useEffect(() => {
    const initial: AssignmentGrades[] = [
      {
        assignmentId: 'hw-1',
        assignmentName: 'Homework 1',
        grades: [
          { studentId: 'stu-1', studentName: 'Alice', score: 8, updatedAt: Date.now() },
          { studentId: 'stu-2', studentName: 'Bob', score: 9, updatedAt: Date.now() },
        ],
      },
    ];
    setGradebook(initial);
    initial.forEach((assignment) =>
      assignment.grades.forEach((grade) =>
        store.upsert({ id: makeRecordId(assignment.assignmentId, grade.studentId), updatedAt: grade.updatedAt })
      )
    );
  }, [store]);

  const updateGrade = (assignmentId: string, studentId: string, score: number) => {
    setGradebook((prev) =>
      prev.map((assignment) =>
        assignment.assignmentId === assignmentId
          ? {
              ...assignment,
              grades: assignment.grades.map((grade) =>
                grade.studentId === studentId
                  ? { ...grade, score, updatedAt: Date.now() }
                  : grade
              ),
            }
          : assignment
      )
    );
    store.upsert({ id: makeRecordId(assignmentId, studentId), updatedAt: Date.now() });
  };

  const sync = () => {
    console.info('Syncing gradebook', store.list());
    store.list().forEach((record) => store.markSynced(record.id));
  };

  const hasConflicts = store.list('conflict').length > 0;

  return { gradebook, updateGrade, sync, hasConflicts };
};
