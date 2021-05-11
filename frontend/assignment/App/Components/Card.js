import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../Utility/colors';

const Card = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Detail', {
          item: props.item,
        })
      }>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cross}
          onPress={() => props.crossPressed(props.item.pk)}>
          <View>
            <Text style={styles.crossButton}>X</Text>
          </View>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{
            uri: `http://192.168.1.106:8000${props.item.document}`,
          }}
        />
        <View style={styles.writtenArea}>
          <Text>User: {props.item.user}</Text>
          <Text>Salary: {props.item.salary}</Text>
          <Text>Last company: {props.item.last_company}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  image: {width: 80, height: 80, marginLeft: 10, borderRadius: 10},
  writtenArea: {
    marginLeft: 10,
  },
  cross: {
    position: 'absolute',
    height: 30,
    width: 30,
    backgroundColor: colors.white,
    top: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default Card;
