import React from 'react';
import {Text, View, Alert} from 'react-native';
import {DataTable} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import IconOc from 'react-native-vector-icons/Octicons';
import IconIon from 'react-native-vector-icons/Ionicons';
import {firebase} from '../../firebase/Firebase';

const ListUser = ({navigation}) => {
  const [listUser, setListUser] = React.useState();

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('users')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          setListUser(snapshot.val());
        }
      });
  }, []);

  return (
    <View style={{marginTop: getStatusBarHeight(), marginHorizontal: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 17,
        }}>
        <IconOc
          name="settings"
          color="rgb(108, 108, 139)"
          size={20}
          style={{fontSize: 25}}
        />
        <Text style={{fontSize: 20}}>Quản lý nhân viên</Text>
        <IconIon
          name="md-person-add-outline"
          color="rgb(108, 108, 139)"
          size={20}
          style={{fontSize: 25}}
          onPress={() => navigation.navigate('CreateUser')}
        />
      </View>
      {listUser ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Hành động</DataTable.Title>
          </DataTable.Header>

          {Object.keys(listUser).map((key) => (
            <DataTable.Row key={key}>
              <DataTable.Cell>{listUser[key].email}</DataTable.Cell>
              <DataTable.Cell>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <View>
                    <IconIon
                      size={20}
                      name="eye"
                      onPress={async () => {
                        await firebase.default
                          .database()
                          .ref('users')
                          .orderByChild('email')
                          .equalTo(listUser[key].email)
                          .on('value', (snapshot) => {
                            if (snapshot.val()) {
                              navigation.navigate('CreateUser', snapshot.val());
                            }
                          });
                      }}
                    />
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <IconIon
                      size={30}
                      name="close"
                      onPress={async () => {
                        try {
                          const removedUser = await firebase.default
                            .database()
                            .ref(`users/${key}`)
                            .remove();
                          if (removedUser) {
                            Alert.alert('Xóa user thành công!');
                          }
                        } catch (e) {
                          Alert.alert('Lỗi! Liên hệ admin!');
                        }
                      }}
                    />
                  </View>
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export {ListUser};
