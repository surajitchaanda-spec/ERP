import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';
import { queryClient } from '../api/queryClient';

const persistor = createAsyncStoragePersistor({ storage: AsyncStorage, key: 'erp-parent-cache' });

persistQueryClient({
  queryClient,
  persistor,
  maxAge: 1000 * 60 * 60 * 24
});
