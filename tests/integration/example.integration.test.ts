import { createApiClient } from '@shared-services/api/apiClient';
import { configureEnvironment } from '@shared-services/config/environment';

describe('Integration smoke tests', () => {
  it('creates an API client pointing to the configured base URL', () => {
    configureEnvironment({ apiBaseUrl: 'https://integration.test' });
    const client = createApiClient();
    expect(client.defaults.baseURL).toBe('https://integration.test');
  });
});
