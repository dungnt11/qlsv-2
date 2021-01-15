import * as React from 'react';

import { TextInput, Text, View } from 'react-native';

const Input = ({ value, onChange, placeholder, center, money, style, ...props }) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <View
      style={center ? {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      } : null}
    >
      <TextInput
        value={money ? formatter.format(+value) : value}
        onChangeText={(value) => {
          return money ? onChange(value.replace(' ₫', '').replace(/\./g, '')) : onChange(value);
        }}
        placeholder={placeholder}
        placeholderTextColor="rgb(173, 173, 173)"
        autoCapitalize="none"
        style={{
          borderBottomColor: 'rgb(236, 236, 236)',
          borderBottomWidth: 2,
          paddingBottom: 5,
          marginVertical: 20,
          fontSize: 16,
          ...style
        }}
        {...props}
      />
    </View>
  );
}

export { Input };
