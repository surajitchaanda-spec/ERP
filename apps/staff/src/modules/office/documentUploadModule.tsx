import React, { useState } from 'react';
import { UploadService, createApiClient, useAuth } from '@erp/mobile-core';

const getUploadService = (token: string) => new UploadService(createApiClient({ baseURL: 'https://api.example.com', getToken: () => token }));

export const DocumentUploadModule: React.FC = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!user) return;
    const service = getUploadService(user.token);
    setStatus('Uploading...');
    try {
      await service.uploadDocument({ uri: 'file://lesson-plan.pdf', name: 'lesson-plan.pdf', type: 'application/pdf' }, {
        folder: 'lesson-plans',
      });
      setStatus('Uploaded successfully');
    } catch (error) {
      console.error(error);
      setStatus('Upload failed');
    }
  };

  return (
    <section>
      <h2>Document Upload</h2>
      <button onClick={handleUpload}>Upload Lesson Plan</button>
      <p>{status}</p>
    </section>
  );
};
