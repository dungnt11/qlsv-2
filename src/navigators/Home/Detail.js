import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {firebase} from '../../firebase/Firebase';

const Detail = ({route, navigation}) => {
  const [userInfo, setUserInfo] = React.useState();
  const {images, image, title, user, contentPost} = route.params;

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('users')
      .orderByChild('email')
      .equalTo(user)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const user = Object.values(snapshot.val())[0];
          const id = Object.keys(snapshot.val())[0];
          setUserInfo({
            name: user.fullName,
            email: user.email,
            avatar: user.avatar,
            description: user.description,
            id: id,
            _id: id,
          });
        }
      });
  }, []);

  return (
    <View
      style={{
        marginTop: getStatusBarHeight(),
        marginHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name="keyboard-backspace"
          color="#ccc"
          size={20}
          style={{fontSize: 25}}
          onPress={() => navigation.navigate('Feeds')}
        />
        <Text
          style={{
            color: 'rgb(108, 108, 139)',
            marginLeft: 10,
            fontSize: 17,
          }}>
          Quay lại
        </Text>
      </View>
      <View>
        {userInfo ? (
          <ScrollView>
            <Image
              source={{uri: image.uri}}
              style={{
                height: 300,
                borderRadius: 20,
              }}
            />

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: userInfo.avatar}}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                }}
              />

              <View style={{marginLeft: 20}}>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  {userInfo.name}
                </Text>
                <Text style={{color: '#888888'}}>{userInfo.description}</Text>
              </View>
            </View>
            <View style={{marginTop: 40}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>

              <Text style={{marginTop: 10}}>{contentPost}</Text>
            </View>
            {images ? (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginHorizontal: -5,
                }}>
                {images.map((image) => (
                  <View key={image.id} style={{position: 'relative'}}>
                    <Image
                      source={{uri: image.uri}}
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        margin: 5,
                      }}
                    />
                  </View>
                ))}
              </View>
            ) : null}
          </ScrollView>
        ) : (
          <Text>Loading..</Text>
        )}
      </View>
    </View>
  );
};

export {Detail};
