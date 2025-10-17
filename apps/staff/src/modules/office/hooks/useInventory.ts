import { useState } from 'react';
import { ApiClient, createApiClient, useAuth } from '@erp/mobile-core';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

const clientFactory = (token: string): ApiClient =>
  createApiClient({
    baseURL: 'https://api.example.com',
    getToken: () => token,
  });

export const useInventory = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([{ id: 'inv-1', name: 'Notebooks', quantity: 50 }]);

  const updateQuantity = (itemId: string, quantity: number) => {
    if (!user) return;
    const api = clientFactory(user.token);
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
    api.patch(`/inventory/${itemId}`, { quantity }).catch((error) => console.error('Inventory update failed', error));
  };

  return { items, updateQuantity };
};
