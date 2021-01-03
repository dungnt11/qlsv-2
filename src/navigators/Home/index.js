import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {Feeds} from './Feeds';
import {CreateFeed} from './CreateFeed';
import {Detail} from './Detail';

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        options={{headerTransparent: true}}
      />
      <Stack.Screen
        name="CreateFeed"
        component={CreateFeed}
        options={{headerTransparent: true}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

export {HomeNavigator};
