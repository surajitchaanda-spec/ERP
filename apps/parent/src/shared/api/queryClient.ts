import { QueryClient } from 'react-query';
import NetInfo from '@react-native-community/netinfo';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        console.warn('Query error', error);
      }
    }
  }
});

NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    queryClient.resumePausedMutations();
    queryClient.refetchQueries({ active: true });
  }
});
