import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../Utility/colors';

import TextInput from '../Components/TextInput';
import Button from '../Components/Button';
import Heading from '../Components/Heading';

import axios from 'axios';
import UserContext from '../Utility/Context';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
  const user = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let formdata = new FormData();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const onPress = () => {
    if (username.length < 1) {
      alert('Invalid Username');
      return;
    }
    if (password.length < 1) {
      alert('Invalid Password');
      return;
    }

    formdata.append('username', username);
    formdata.append('password', password);

    axios({
      method: 'POST',
      url: 'http://192.168.1.106:8000/api/account/login',
      data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log(res.response);
        axios({
          method: 'POST',
          url: 'http://192.168.1.106:8000/api/account/gettoken',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(ress => {
            storeData(ress.data.token);
            user.setToken(ress.data.token);
            user.setUser(res.data);
          })
          .catch(err => {
            alert('An error occured!');
          });
      })
      .catch(err => {
        alert('An error occured!');
      });
  };

  return (
    <View style={styles.container}>
      <Heading heading="Login" />
      <TextInput
        placeholder="username"
        onChangeValue={value => {
          setUsername(value);
        }}
        value={username}
      />

      <TextInput
        placeholder="Password"
        onChangeValue={value => {
          setPassword(value);
        }}
        value={password}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={onPress} />

      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text style={styles.next}>Click here to register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  next: {
    color: colors.blue,
    alignSelf: 'center',
  },
});

export default LoginScreen;
