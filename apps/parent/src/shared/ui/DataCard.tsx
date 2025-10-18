import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface DataCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const DataCard: React.FC<DataCardProps> = ({ title, description, children }) => (
  <Card style={styles.card}>
    <Card.Title title={title} subtitle={description} />
    {children ? <Card.Content>{children}</Card.Content> : null}
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12
  }
});
