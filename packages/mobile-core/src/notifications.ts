export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

export interface PushProvider {
  register(): Promise<string>;
  send(target: string, payload: NotificationPayload): Promise<void>;
}

export class MockPushProvider implements PushProvider {
  async register(): Promise<string> {
    return 'mock-device-token';
  }

  async send(target: string, payload: NotificationPayload): Promise<void> {
    console.info(`Sending push to ${target}`, payload);
  }
}
