import path from 'path';
import { Pact } from '@pact-foundation/pact';
import { Matchers } from '@pact-foundation/pact';
import axios from 'axios';

const provider = new Pact({
  consumer: 'erp-web-app',
  provider: 'erp-backend',
  port: 9222,
  log: path.resolve(process.cwd(), 'contract-tests/logs/pact.log'),
  dir: path.resolve(process.cwd(), 'contract-tests/pacts'),
  spec: 2
});

describe('ERP backend contract', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  it('supports retrieving the current school year', async () => {
    await provider.addInteraction({
      state: 'school year exists',
      uponReceiving: 'a request for the current school year',
      withRequest: {
        method: 'GET',
        path: '/school-year/current'
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: Matchers.like('2024-2025'),
          startDate: Matchers.iso8601DateTimeWithMillis(),
          endDate: Matchers.iso8601DateTimeWithMillis()
        }
      }
    });

    const response = await axios.get(`${provider.mockService.baseUrl}/school-year/current`);
    expect(response.status).toBe(200);
  });
});
