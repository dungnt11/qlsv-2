import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import {CreateUser} from './CreateUser';
import {ListUser} from './ListUser';
import { AmazingCropperPage } from './cropImage';

const UsersManagerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="ListUser"
        component={ListUser}
        options={{headerTransparent: true}}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{headerTransparent: true}}
      />
      <Stack.Screen
        name="CropImage"
        component={AmazingCropperPage}
        options={{headerTransparent: true}}
      />
    </Stack.Navigator>
  );
};

export {UsersManagerNavigator};
