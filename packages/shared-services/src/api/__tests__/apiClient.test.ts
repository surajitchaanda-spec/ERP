import MockAdapter from 'axios-mock-adapter';
import { configureEnvironment } from '../../config/environment';
import { createApiClient } from '../apiClient';

describe('createApiClient', () => {
  beforeEach(() => {
    configureEnvironment({
      apiBaseUrl: 'https://api.test'
    });
  });

  it('attaches bearer tokens when provided', async () => {
    const tokenProvider = jest.fn().mockResolvedValue('abc123');
    const client = createApiClient({ tokenProvider });
    const mock = new MockAdapter(client);

    mock.onGet('/users').reply((config) => {
      return [200, { authHeader: config.headers?.Authorization }];
    });

    const response = await client.get('/users');
    expect(response.data.authHeader).toBe('Bearer abc123');
  });
});
