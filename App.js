import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import Screens from './src/screens';
import { AuthProvider } from './src/components/AppProvider';

enableScreens();
const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthProvider>
          <StatusBar barStyle="dark-content" />
          <Screens />
        </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};


export default App;
