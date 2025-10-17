import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'erp_parent_token';

export const saveAuthToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getAuthToken = async () => SecureStore.getItemAsync(TOKEN_KEY);

export const clearAuthToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
