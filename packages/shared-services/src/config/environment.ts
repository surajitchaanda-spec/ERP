export type EnvironmentConfig = {
  apiBaseUrl: string;
  sentryDsn?: string;
  datadogApplicationId?: string;
  datadogClientToken?: string;
  onApiError?: (error: unknown) => void;
};

let currentConfig: EnvironmentConfig = {
  apiBaseUrl: 'https://api.example.com'
};

export const configureEnvironment = (config: Partial<EnvironmentConfig>) => {
  currentConfig = {
    ...currentConfig,
    ...config
  };
};

export const getEnvironmentConfig = (): EnvironmentConfig => currentConfig;
