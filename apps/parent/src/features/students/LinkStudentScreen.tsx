import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { useStudents } from './StudentsContext';
import { useTranslation } from 'react-i18next';

export const LinkStudentScreen: React.FC = () => {
  const { linkStudent, isLoading } = useStudents();
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLink = async () => {
    try {
      setError(null);
      await linkStudent(code.trim());
      setCode('');
    } catch (err) {
      setError(t('students.linkError'));
    }
  };

  const handleScanQr = () => {
    Alert.alert(t('students.scanQrTitle'), t('students.scanQrMessage'));
  };

  return (
    <ScreenContainer>
      <Text variant="titleMedium" style={styles.title}>
        {t('students.linkPrompt')}
      </Text>
      <TextInput
        label={t('students.codeLabel')}
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        style={styles.input}
      />
      {error ? (
        <Text style={styles.error} variant="bodyMedium">
          {error}
        </Text>
      ) : null}
      <PrimaryButton
        onPress={handleLink}
        label={t('students.linkCta')}
        loading={isLoading}
        disabled={!code || isLoading}
        icon="account-plus"
      />
      <PrimaryButton onPress={handleScanQr} label={t('students.scanQrCta')} icon="qrcode-scan" />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16
  },
  input: {
    marginBottom: 12
  },
  error: {
    color: '#D32F2F',
    marginBottom: 12
  }
});
