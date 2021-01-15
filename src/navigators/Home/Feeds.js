import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import IconOc from 'react-native-vector-icons/Octicons';
import _ from 'lodash';
import { firebase } from '../../firebase/Firebase';
import { AuthContext } from '../../components/AppProvider';

const Feeds = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);
  const [feeds, setFeeds] = React.useState();

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('/posts')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          setFeeds(_.filter(snapshot.val(), { ghim: true }).concat(_.filter(snapshot.val(), { ghim: false })));
        }
      });
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: getStatusBarHeight(),
      }}>
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
          style={{ fontSize: 25 }}
        />
        <Text style={{ fontSize: 20 }}>Feeds</Text>
        <Icon
          name="ios-create-outline"
          color="rgb(108, 108, 139)"
          size={20}
          style={{ fontSize: 25 }}
          onPress={() => navigation.navigate('CreateFeed')}
        />
      </View>

      {feeds ? (
        <ScrollView
          style={{
            marginBottom: 120
          }}
        >
          {Object.keys(feeds).map((key) => (
            <>
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate('Detail', feeds[key])}>
                <Card>
                  <Card.Cover source={{ uri: feeds[key].image.uri }} />
                  <Card.Content>
                    <Title>{feeds[key].title}</Title>
                    <Paragraph>{feeds[key].description}</Paragraph>
                  </Card.Content>
                  <View
                    style={{
                      alignItems: 'center'
                    }}
                  >
                  </View>
                </Card>
              </TouchableOpacity>
              {user?.email === 'admin@gmail.com' ? (
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 5
                  }}
                >
                  <IconAnt
                    name="delete"
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
                    onPress={() => {
                      Alert.alert(
                        "Bạn có muốn xóa bài viết này",
                        "Thao tác này không thể hủy bỏ",
                        [
                          {
                            text: "Hủy",
                            style: "cancel"
                          },
                          {
                            text: "Đồng ý", onPress: async () => {
                              try {
                                await firebase.default
                                  .database()
                                  .ref(`posts/${key}`)
                                  .remove();
                              } catch (error) {
                                console.log(error);
                              }
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                  />
                </View>
              ) : null}
            </>
          ))}
        </ScrollView>
      ) : (
          <Text>Loading...</Text>
        )}
    </View>
  );
};

export { Feeds };
