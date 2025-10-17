import { device, element, by, expect } from 'detox';

describe('Onboarding flow', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('shows login screen', async () => {
    await expect(element(by.text('Welcome back'))).toBeVisible();
  });
});
