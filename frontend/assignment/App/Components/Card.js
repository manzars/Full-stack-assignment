import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../Utility/colors';

const Card = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: 'http://192.168.1.106:8000/media/document/IMG_20210504_211116_OX1V6M2.jpg',
        }}
      />
      <View style={styles.writtenArea}>
        <Text>User: 8</Text>
        <Text>Salary: 1234</Text>
        <Text>Last company: xyz</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 100,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  image: {width: 80, height: 80, marginLeft: 10, borderRadius: 10},
  writtenArea: {
    marginLeft: 10,
  },
});
export default Card;
