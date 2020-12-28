import React from 'react';
import { Text, ImageBackground, View } from 'react-native';

import { width, height } from '../utils/Dimensions';

const Started = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <Text style={{
          fontSize: 40,
          color: 'white',
          backgroundColor: 'rgb(93, 27, 172)',
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          hi
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginTop: 200,
            color: '#fff',
            textAlign: 'center',
            lineHeight: 23
          }}
        >
          Hãy bắt đầu để kết nối với chúng tôi. Chúng tôi có mọi vấn đề mà bạn tìm kiếm.
        </Text>

        <Text
          style={{
            backgroundColor: '#fff',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 30,
            overflow: 'hidden',
          }}
          onPress={() => navigation.navigate('Auth')}
        >Bắt đầu</Text>
      </View>
    </ImageBackground>
    )
}

export { Started };
