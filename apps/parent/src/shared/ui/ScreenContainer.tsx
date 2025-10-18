import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = true
}) => {
  if (scrollable) {
    return <ScrollView style={styles.container}>{children}</ScrollView>;
  }
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FB'
  }
});
