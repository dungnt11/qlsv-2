import React from 'react';
import { View, ScrollView } from 'react-native';

import { Card, Title, Paragraph, Button } from 'react-native-paper';

const HomeNavigator = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 100,
      }}
    >
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={{
          marginBottom: 20,
          width: 200
        }}
      >
        Thêm bài viết
      </Button>
      
      <ScrollView>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

export { HomeNavigator };
