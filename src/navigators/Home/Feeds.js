import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import IconOc from 'react-native-vector-icons/Octicons';

const HomeNavigator = ({navigation}) => {
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
          onPress={() => navigation.navigate('Home')}
        />
      </View>

      <ScrollView>
        <Card>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export {HomeNavigator};
