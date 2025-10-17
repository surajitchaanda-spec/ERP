import React, { createContext, useContext, useMemo } from 'react';
import analytics from '@react-native-firebase/analytics';
import { createClient, SegmentClient } from '@segment/analytics-react-native';

interface AnalyticsContextValue {
  track: (event: string, properties?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

let segmentClientPromise: Promise<SegmentClient> | null = null;

const getSegmentClient = () => {
  if (!segmentClientPromise) {
    segmentClientPromise = createClient({
      writeKey: process.env.EXPO_PUBLIC_SEGMENT_WRITE_KEY ?? 'SEGMENT_WRITE_KEY',
      trackAppLifecycleEvents: true
    });
  }
  return segmentClientPromise;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const track = (event: string, properties?: Record<string, unknown>) => {
    analytics().logEvent(event, properties);
    getSegmentClient().then((clientInstance) => clientInstance.track(event, properties));
  };

  const value = useMemo(() => ({ track }), []);

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};
