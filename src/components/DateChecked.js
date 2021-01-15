import React from 'react';
import { Text, View } from 'react-native';

const DateChecked = ({ dateChecked = [], onCheckWord }) => {
  const now = new Date();
  const daysInThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dates = [];
  for (let ind = 1; ind <= daysInThisMonth; ind++) {
    dates.push(
      <Text
        key={ind}
        style={{
          width: '10%',
          height: 35,
          backgroundColor: dateChecked.includes(ind) ? '#191970' : '#ccc',
          marginTop: 20,
          marginRight: 20,
          color: 'white',
          textAlign: 'center',
          lineHeight: 35,
          borderRadius: 10,
          overflow: 'hidden',
        }}
        onPress={() => {
          if (onCheckWord) {
            onCheckWord(ind);
          }
        }}
      >{ind}</Text>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        marginRight: -5,
        justifyContent: 'center',
      }}
    >
      {dates}
    </View>
  );
}

export { DateChecked };
