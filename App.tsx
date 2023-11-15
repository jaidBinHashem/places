import React, {FC} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PersistGate} from 'redux-persist/integration/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {persistor, store} from './src/redux/store';
import {Home} from './src/screens/Home';

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={backgroundStyle}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <SafeAreaView style={backgroundStyle}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <Home />
            </SafeAreaView>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
