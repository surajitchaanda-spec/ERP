import { ApiClient } from './apiClient';

export interface UploadPayload {
  uri: string;
  name: string;
  type: string;
}

export interface UploadConfig {
  folder: 'lesson-plans' | 'circulars' | 'other';
  metadata?: Record<string, string>;
}

export class UploadService {
  constructor(private api: ApiClient) {}

  async uploadDocument(payload: UploadPayload, config: UploadConfig) {
    const formData = new FormData();
    formData.append('file', { uri: payload.uri, name: payload.name, type: payload.type } as never);
    formData.append('folder', config.folder);
    if (config.metadata) {
      Object.entries(config.metadata).forEach(([key, value]) => formData.append(`meta[${key}]`, value));
    }

    return this.api.post('/storage/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}
