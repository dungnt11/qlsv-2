import React from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/AntDesign';
import {Button, TextInput} from 'react-native-paper';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../../components/AppProvider';
import firebaseInstance from '../../firebase/Firebase';

const CreateUser = ({navigation, route}) => {
  const {
register, error, setError, loading, setLoading
} = React.useContext(
    AuthContext,
  );

  const [username, setUsername] = React.useState(
    Array.isArray(route.params) ? Object.values(route.params)[0].email : '',
  );
  const [fullName, setFullName] = React.useState(
    Array.isArray(route.params) ? Object.values(route.params)[0].fullName : '',
  );
  const [description, setDescription] = React.useState(
    Array.isArray(route.params) ? Object.values(route.params)[0].description : '',
  );
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [filePath, setFilePath] = React.useState(
    Array.isArray(route.params) ? {uri: Object.values(route.params)[0].avatar} : null,
  );

  const chooseFile = () => {
    let options = {mediaType: 'camera'};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setFilePath(response);
        navigation.navigate('CropImage', response);
      }
    });
  };

  React.useEffect(() => {
    if (route?.params?.uri) {
      setFilePath({...filePath, uri: route.params.uri });
    }
  }, [route.params]);

  return (
    <View style={{marginTop: getStatusBarHeight()}}>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
            }}>
            <Icon
              name="arrowleft"
              color="rgb(108, 108, 139)"
              size={20}
              style={{
                margin: 0,
                padding: 0,
              }}
              onPress={() => {
                navigation.navigate('ListUser');
                setError('');
              }}
            />
            <Text
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('ListUser');
                setError('');
              }}>
              Back
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 15,
              fontSize: 20,
            }}>
            Thêm người dùng
          </Text>
          <TextInput
            mode="flat"
            label="Tên đầy đủ (*)"
            value={fullName}
            onChangeText={(fullName) => {
              setFullName(fullName);
            }}
            style={{fontSize: 15}}
            autoCapitalize="none"
          />
          <TextInput
            mode="flat"
            label="Email (*)"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            style={{fontSize: 15, marginTop: 15}}
            autoCapitalize="none"
          />
          <TextInput
            mode="flat"
            label="Mật khẩu (*)"
            secureTextEntry
            value={password}
            onChangeText={(pass) => {
              setPassword(pass);
            }}
            style={{
              fontSize: 15,
              marginTop: 15,
            }}
            autoCapitalize="none"
          />
          <TextInput
            mode="flat"
            label="Nhập lại mật khẩu (*)"
            secureTextEntry
            value={rePassword}
            onChangeText={(pass) => {
              setRePassword(pass);
            }}
            style={{
              fontSize: 15,
              marginTop: 15,
            }}
            autoCapitalize="none"
          />

          <TextInput
            mode="flat"
            label="Giới thiệu"
            value={description}
            onChangeText={(description) => {
              setDescription(description);
            }}
            style={{
              fontSize: 15,
              marginTop: 15,
            }}
            autoCapitalize="none"
          />

          <Text
            style={{
              marginTop: 10,
              marginBottom: 5,
            }}>
            Upload ảnh
          </Text>
          <IconEvil
            name="image"
            color="rgb(108, 108, 139)"
            style={{
              fontSize: 30,
              backgroundColor: '#e8e8e8',
              textAlign: 'center',
              width: 40,
              height: 40,
              lineHeight: 40,
              borderRadius: 4,
              overflow: 'hidden',
            }}
            onPress={chooseFile}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View>
              {filePath ? (
                <Image
                  source={{uri: filePath.uri}}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    margin: 5,
                  }}
                />
              ) : null}
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 16}}>{username}</Text>
              <Text style={{color: '#797979'}}>{description}</Text>
            </View>
          </View>

          <Text
            style={{
              color: '#eb4034',
              marginTop: 12,
              marginBottom: 12,
              fontWeight: '600',
            }}>
            {error}
          </Text>
          {!Array.isArray(route.params) ? (
            <Button
              mode="contained"
              onPress={async () => {
                setLoading(true);

                if (Array.isArray(route.params)) {
                } else {
                  // Create
                  if (!fullName) {
                    setError('Bạn phải điền tên của mình!');
                    setLoading(false);

                    return;
                  } else if (!username) {
                    setError('Bạn phải điền tên đăng nhập!');
                    setLoading(false);

                    return;
                  } else if (!password) {
                    setError('Bạn phải điền mật khẩu!');
                    setLoading(false);

                    return;
                  } else if (password !== rePassword) {
                    setError('Hai mật khẩi phải giống nhau!');
                    setLoading(false);

                    return;
                  } else if (!filePath) {
                    setError('Bạn cần upload avatar!');
                    setLoading(false);

                    return;
                  } else {
                    setError('');
                  }
                  const {fileName, type, uri} = filePath;

                  const urlAvatar = await firebaseInstance.uploadFile(
                    `users/${fileName}`,
                    type,
                    uri,
                  );
                  await register(
                    fullName,
                    username,
                    password,
                    description,
                    urlAvatar,
                  );
                }
                setLoading(false);
                navigation.navigate('ListUser');
              }}
              loading={loading}>
              Thêm user
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export {CreateUser};
