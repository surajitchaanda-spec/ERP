import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { useStudents } from './StudentsContext';

export const StudentSwitcher: React.FC = () => {
  const { students, activeStudentId, setActiveStudent } = useStudents();

  if (students.length === 0) {
    return <Text variant="bodyMedium">No students linked yet.</Text>;
  }

  return (
    <View style={styles.container}>
      {students.map((student) => (
        <Chip
          key={student.id}
          selected={student.id === activeStudentId}
          onPress={() => setActiveStudent(student.id)}
          style={styles.chip}
        >
          {student.name}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8
  },
  chip: {
    margin: 4
  }
});
