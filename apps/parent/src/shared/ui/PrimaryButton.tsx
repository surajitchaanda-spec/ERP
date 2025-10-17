import React from 'react';
import { Button } from 'react-native-paper';

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  label,
  loading,
  disabled,
  icon
}) => (
  <Button
    mode="contained"
    onPress={onPress}
    loading={loading}
    disabled={disabled}
    icon={icon}
    style={{ marginVertical: 8 }}
    contentStyle={{ paddingVertical: 4 }}
  >
    {label}
  </Button>
);
