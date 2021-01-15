import React from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AsyncStorage } from 'react-native';

import { AuthContext } from '../components/AppProvider';
import { DateChecked } from '../components/DateChecked';

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

const UserNavigator = () => {
  const { user, logout } = React.useContext(AuthContext);
  return (
    <ImageBackground
      source={require('../images/profile.png')}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          marginTop: 100,
          backgroundColor: '#fff',
          height: 550,
          alignItems: 'center',
          borderRadius: 40,
          marginHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            borderColor: '#000',
            borderWidth: 1,
            marginTop: 10
          }}
        />

        <Icon
          name="logout"
          color="rgb(108, 108, 139)"
          size={20}
          style={{
            marginTop: 10
          }}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('login');
              logout();
            } catch (error) {
              console.log(error);
            }
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          {user.name}
        </Text>

        <Text
          style={{
            marginTop: 10,
            textTransform: 'capitalize',
            color: '#636260'
          }}
        >
          {user.description}
        </Text>

        <Text>
          {user.email}*
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontSize: 15
          }}
        >Chấm công tháng {(new Date).getMonth() + 1}</Text>
        <DateChecked dateChecked={user.dayToWork} />

      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 10,
          height: 150,
          borderRadius: 20,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Phòng {user.room}</Text>
        <Text>Công {user.dayToWork.length}</Text>
        <Text>Hệ số lương {formatter.format(user.salary)}</Text>
        <Text>Thưởng {formatter.format(user.bonus)}</Text>
        <Text>Phạt {formatter.format(user.fine)}</Text>
        <Text>Lương tháng {formatter.format(
          +user.salary * 8 * +(user.dayToWork || []).length + +user.bonus - +user.fine
        )}</Text>
      </View>
    </ImageBackground>
  );
};

export { UserNavigator };
