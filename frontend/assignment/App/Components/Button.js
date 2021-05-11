import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../Utility/colors';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.ButtonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 60,
    alignSelf: 'center',
    backgroundColor: colors.blue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10%',
  },
  ButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Button;
