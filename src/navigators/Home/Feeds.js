import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import IconOc from 'react-native-vector-icons/Octicons';
import {firebase} from '../../firebase/Firebase';

const Feeds = ({navigation}) => {
  const [feeds, setFeeds] = React.useState();

  React.useEffect(() => {
    firebase.default
      .database()
      .ref('/posts')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          setFeeds(snapshot.val());
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
          style={{fontSize: 25}}
        />
        <Text style={{fontSize: 20}}>Feeds</Text>
        <Icon
          name="ios-create-outline"
          color="rgb(108, 108, 139)"
          size={20}
          style={{fontSize: 25}}
          onPress={() => navigation.navigate('CreateFeed')}
        />
      </View>

      {feeds ? (
        <ScrollView>
          {Object.keys(feeds).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => navigation.navigate('Detail', feeds[key])}>
              <Card>
                <Card.Cover source={{uri: feeds[key].image.uri}} />
                <Card.Content>
                  <Title>{feeds[key].title}</Title>
                  <Paragraph>{feeds[key].description}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export {Feeds};
