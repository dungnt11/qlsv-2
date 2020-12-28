import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Started } from './started';
import { Auth } from './auth';
import { Home } from './home';
import { AuthContext } from '../components/AppProvider';

const Screen = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        }
      }}
    >
      { user ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTransparent: true }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Started"
            component={Started}
            options={{ headerTransparent: true }}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerTransparent: true, cardStyle: { backgroundColor: 'rgb(227, 225, 246)' } }}
          />
        </>
      ) }
    </Stack.Navigator>
  );
}

export default Screen;
