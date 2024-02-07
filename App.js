import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import './src/language/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/services/store';
import Routes from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Amplify } from 'aws-amplify';
import aws_exports from './src/aws-exports';


Amplify.configure(aws_exports);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      //refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <PaperProvider
                theme={{
                  colors: {
                    ...DefaultTheme.colors,
                    primary: '#00CC8C',
                    secondary: '#184D41',
                    placeholder: '#fff',
                    outline: 'rgba(24,77,65,0.5)',
                    surface: 'rgba(24,77,65,0.5)',
                    surfaceVariant: 'rgba(24,77,65,0.5)',
                    background: '#fff',
                  },
                }}>
                <Routes />
              </PaperProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
