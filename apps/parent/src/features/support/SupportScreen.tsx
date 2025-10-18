import React from 'react';
import { Linking } from 'react-native';
import { List, SegmentedButtons, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../shared/i18n/useLanguage';

export const SupportScreen: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('support.title')}
      </Text>
      <List.Section>
        <List.Item
          title={t('support.email')}
          description="support@erp-school.com"
          left={(props) => <List.Icon {...props} icon="email" />}
          onPress={() => Linking.openURL('mailto:support@erp-school.com')}
        />
        <List.Item
          title={t('support.phone')}
          description="+1-234-567-8900"
          left={(props) => <List.Icon {...props} icon="phone" />}
          onPress={() => Linking.openURL('tel:+12345678900')}
        />
        <List.Item
          title={t('support.chat')}
          description={t('support.chatDesc')}
          left={(props) => <List.Icon {...props} icon="chat" />}
          onPress={() => Linking.openURL('https://support.erp-school.com/chat')}
        />
      </List.Section>
      <Text variant="titleMedium" style={{ marginTop: 24, marginBottom: 8 }}>
        {t('support.language')}
      </Text>
      <SegmentedButtons
        value={language}
        onValueChange={(value) => {
          setLanguage(value);
        }}
        buttons={[
          { value: 'en', label: 'English' },
          { value: 'hi', label: 'हिन्दी' },
          { value: 'es', label: 'Español' }
        ]}
      />
    </ScreenContainer>
  );
};
