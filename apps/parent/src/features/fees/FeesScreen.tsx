import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { List, Text } from 'react-native-paper';
import { ScreenContainer } from '../../shared/ui/ScreenContainer';
import { useStudents } from '../students/StudentsContext';
import { useQuery } from 'react-query';
import { client } from '../../shared/api/client';
import { PrimaryButton } from '../../shared/ui/PrimaryButton';
import { useTranslation } from 'react-i18next';

interface FeeItem {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  paymentProvider: 'razorpay' | 'stripe';
  paymentIntentId?: string;
}

export const FeesScreen: React.FC = () => {
  const { activeStudentId } = useStudents();
  const { t } = useTranslation();
  const { data = [] } = useQuery<FeeItem[]>(
    ['fees', activeStudentId],
    async () => {
      const { data: response } = await client.get<FeeItem[]>(
        `/students/${activeStudentId}/fees`
      );
      return response;
    },
    { enabled: Boolean(activeStudentId) }
  );

  const handlePay = useCallback(
    async (fee: FeeItem) => {
      try {
        const { data: paymentSession } = await client.post(`/payments/${fee.id}/start`, {
          provider: fee.paymentProvider
        });
        if (fee.paymentProvider === 'razorpay') {
          Alert.alert(t('fees.razorpayTitle'), t('fees.launchRazorpay', { sessionId: paymentSession.sessionId }));
        } else {
          Alert.alert(t('fees.stripeTitle'), t('fees.launchStripe', { clientSecret: paymentSession.clientSecret }));
        }
      } catch (error) {
        Alert.alert(t('fees.errorTitle'), t('fees.errorMessage'));
      }
    },
    [t]
  );

  return (
    <ScreenContainer>
      <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
        {t('fees.title')}
      </Text>
      <List.Section>
        {data.map((fee) => (
          <List.Item
            key={fee.id}
            title={`${fee.title} • ₹${fee.amount}`}
            description={`${t('fees.due')}: ${fee.dueDate}`}
            right={() =>
              fee.status === 'pending' ? (
                <PrimaryButton onPress={() => handlePay(fee)} label={t('fees.payNow')} icon="credit-card" />
              ) : (
                <Text>{t('fees.paid')}</Text>
              )
            }
          />
        ))}
      </List.Section>
    </ScreenContainer>
  );
};
