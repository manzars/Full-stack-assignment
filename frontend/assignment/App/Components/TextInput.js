import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TxtInput = props => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={props.onChangeValue}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      placeholderTextColor="#aaa"
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    color: '#000',
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default TxtInput;
