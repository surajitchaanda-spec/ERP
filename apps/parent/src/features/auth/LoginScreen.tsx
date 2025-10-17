import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { useAuth } from './AuthContext';
import { useTranslation } from 'react-i18next';

export const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
    } catch (err) {
      setError(t('auth.loginError'));
    }
  };

  return (
    <ScreenContainer>
      <Text variant="headlineMedium" style={styles.title}>
        {t('auth.welcome')}
      </Text>
      <TextInput
        label={t('auth.emailLabel')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label={t('auth.passwordLabel')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? (
        <Text variant="bodyMedium" style={styles.error}>
          {error}
        </Text>
      ) : null}
      <PrimaryButton
        onPress={handleLogin}
        label={t('auth.loginCta')}
        loading={isLoading}
        disabled={!email || !password || isLoading}
        icon="login"
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 24
  },
  input: {
    marginBottom: 12
  },
  error: {
    color: '#D32F2F',
    marginBottom: 12
  }
});
