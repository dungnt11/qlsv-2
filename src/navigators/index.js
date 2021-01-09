import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faComments,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import {HomeNavigator} from './Home';
import {ChatNavigator} from './Chat';
import {UsersManagerNavigator} from './UserManager';
import {UserNavigator} from './User';

import {AuthContext} from '../components/AppProvider';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const {user} = React.useContext(AuthContext);


  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHome}
              style={{fontSize: 20, color: focused ? 'blue' : 'black'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faComments}
              style={{fontSize: 20, color: focused ? 'blue' : 'black'}}
            />
          ),
        }}
      />
      { user?.email === 'admin@gmail.com' ? (
        <Tab.Screen
          name="Users manager"
          component={UsersManagerNavigator}
          options={{
            tabBarLabel: 'Users manager',
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon={faUsers}
                style={{fontSize: 20, color: focused ? 'blue' : 'black'}}
              />
            ),
          }}
        />
      ) : null }
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              style={{fontSize: 20, color: focused ? 'blue' : 'black'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {MyTabs};
