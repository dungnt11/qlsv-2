import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../components/AppProvider';
import { width, height } from '../utils/Dimensions';

const Auth = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { loading, login, error } = React.useContext(AuthContext);
  
  return (
    <View>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 30,
        marginHorizontal: 20,
        paddingBottom: 25
      }}
    >
        <Icon
          name="arrowleft"
          color="rgb(108, 108, 139)"
          size={20}
          style={{
            margin: 0,
            padding: 0,
          }}
          onPress={() => navigation.navigate('Started')}
        />
        <Text
          style={{
            marginLeft: 10
          }}
          onPress={() => navigation.navigate('Started')}
        >Back</Text>
    </View>

    <View
      style={{
        width,
        height,
        backgroundColor: '#fff',
        borderRadius: 30,
        overflow: 'hidden',
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 60
        }}
      >
        Xin chào,
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 70
        }}
      >
        hãy cho mình biết bạn là ai?
      </Text>

      <TextInput
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Tên đăng nhập"
        placeholderTextColor="rgb(173, 173, 173)"
        style={{
          borderBottomColor: 'rgb(236, 236, 236)',
          borderBottomWidth: 2,
          paddingBottom: 5,
        }}
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        placeholder="Mật khẩu"
        placeholderTextColor="rgb(173, 173, 173)"
        style={{
          borderBottomColor: 'rgb(236, 236, 236)',
          borderBottomWidth: 2,
          paddingBottom: 5,
          marginTop: 25
        }}
        autoCapitalize="none"
      />
      <Text
        style={{
          marginTop: 10,
          color: '#db2c2c'
        }}
      >{ error }</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => login(username, password)}
      >
        <Text
          style={{
            marginTop: 60,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'rgb(111, 15, 246)',
            textAlign: 'center',
            width: 150,
            color: '#fff',
            borderRadius: 5,
            fontWeight: '500',
            overflow: 'hidden',
          }}
        >{ loading ? 'Loading...' : 'Đăng nhập' }</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 10,
          color: '#868783',
          textAlign: 'right'
        }}
      >Quên mật khẩu?</Text>
    </View>
    </View>
  );
}

export { Auth };
