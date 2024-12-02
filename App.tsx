import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import './src/language/i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/services/store';
import Routes from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Amplify} from 'aws-amplify';
import aws_exports from './src/aws-exports';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/components/NoInternet';

Amplify.configure(aws_exports);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState<
    boolean | undefined | null | string
  >(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return <NoInternet setIsConnected={setIsConnected} />;
  }

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
                    primary: '#F95F32',
                    secondary: '#404040',
                    outline: '#F95F3240',
                    surface: ' #F95F3250',
                    surfaceVariant: '#F95F32',
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
}

export default App;
