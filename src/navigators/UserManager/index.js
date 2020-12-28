import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button, DataTable, TextInput, Divider, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import 'react-native-get-random-values';
import * as uuid from 'uuid';

import { firebase } from '../../firebase/config';

import { AuthContext } from '../../components/AppProvider';
import { width } from '../../utils/Dimensions';

const UsersManagerNavigator = () => {
  const { register, error, loading } = React.useContext(AuthContext);

  const [isRegister, setIsRegister] = React.useState(false);
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [filePath, setFilePath] = React.useState({});

  const uploadImage = async (uri) => {
    try {
      console.log(uuid.v4());
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.default
        .storage()
        .ref('avatar')
        .child(uuid.v4());
      const task = await ref.put(blob);
  
      const imageSrc = await task.ref.getDownloadURL();
      console.log(imageSrc);
      return imageSrc;
    } catch (err) {
      console.log('uploadImage try/catch error: ' + err.message);
    }
  }

  
  const chooseFile = async () => {
    let options = {
      mediaType: 'camera',
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFilePath(response);
        uploadImage(response.uri).then((res) => console.log(res));
      }
    });
  };

  return (
    <View>
      { isRegister ? (
        <View
          style={{
            marginHorizontal: 20
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginBottom: 15
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
                onPress={() => setIsRegister(false)}
              />
              <Text
                style={{
                  marginLeft: 10
                }}
                onPress={() => setIsRegister(false)}
              >Back</Text>
          </View>
          
          <Divider />
          
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 15,
              fontSize: 20
            }}
          >
            Thêm người dùng
          </Text>

          <TextInput
            mode="outlined"
            label="Email"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={{
              fontSize: 15
            }}
            autoCapitalize="none"
          />
          <TextInput
            mode="outlined"
            label="Mật khẩu"
            // secureTextEntry
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            style={{
              fontSize: 15,
              marginTop: 15
            }}
            autoCapitalize="none"
          />
          <TextInput
            mode="outlined"
            label="Nhập lại mật khẩu"
            // secureTextEntry
            value={rePassword}
            onChangeText={(pass) => setRePassword(pass)}
            style={{
              fontSize: 15,
              marginTop: 15
            }}
            autoCapitalize="none"
          />

          { filePath.uri ? (
            <Avatar.Image size={70} source={{ uri: filePath.uri }} />
          ) : null }

          <Text onPress={chooseFile}>Upload image</Text>

          <Text
            style={{
              color: '#eb4034',
              marginTop: 12,
              marginBottom: 12,
              fontWeight: '600'
            }}
          >{ error }</Text>

          <Button
            mode="contained"
            onPress={async () => {
              await register(username, password, rePassword);
              Alert.alert('Thêm user thành công');
              setIsRegister(false);
            }}
            loading={loading}
          >
            Thêm user
          </Button>
        </View>
      ) : (
        <View
          style={{
            marginTop: 30
          }}
        >
          <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 30
          }}
        >
          Quản lý nhân viên
        </Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title numeric>Edit</DataTable.Title>
            <DataTable.Title numeric>Delete</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
        <View>
          <Button
            mode="contained"
            onPress={() => setIsRegister(true)}
            style={{
              width: width - 30,
              alignSelf: 'center',
              marginTop: 20
            }}
          >
            Thêm tài khoản
          </Button>
        </View>
        </View>
      )}
    </View>
  );
}

export { UsersManagerNavigator };
