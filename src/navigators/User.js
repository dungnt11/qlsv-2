import React from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AsyncStorage } from 'react-native';

import {AuthContext} from '../components/AppProvider';

const dateChecked = (dateChecked = []) => {
  const now = new Date();
  const daysInThisMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const dates = [];
  for (let ind = 1; ind <= daysInThisMonth; ind++) {
    dates.push(
      <Text
        key={ind}
        style={{
          width: '10%',
          height: 35,
          backgroundColor: dateChecked.includes(ind) ? '#191970' : '#ccc',
          marginTop: 20,
          marginRight: 20,
          color: 'white',
          textAlign: 'center',
          lineHeight: 35,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >{ind}</Text>
    );
  }

  return dates;
}

const UserNavigator = () => {
  const {user, logout} = React.useContext(AuthContext);
  const dateWork = [1, 3, 10, 20, 22, 23];
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
          height: 600,
          alignItems: 'center',
          borderRadius: 40,
          marginHorizontal: 20,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 120,
            height: 120,
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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 20,
            marginRight: -5,
            justifyContent: 'center',
          }}
        >{dateChecked(dateWork)}</View>

      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          marginTop: 10,
          height: 100,
          borderRadius: 20,
          paddingHorizontal: 10
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10
          }}
        >Thống kê</Text>
        <Text
          style={{
            marginTop: 10
          }}
        >- Số ngày đi làm {dateWork.length}</Text>
        <Text>- Tiền lương {8 * 20 * dateWork.length}k (20k/1h)</Text>
      </View>
    </ImageBackground>
  );
};

export {UserNavigator};
