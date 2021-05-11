import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../Utility/colors';
import TextInput from '../Components/TextInput';
import Heading from '../Components/Heading';
import Button from '../Components/Button';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../Utility/Context';

const RegisterScreen = props => {
  const user = useContext(UserContext);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let formdata = new FormData();
  let formdata1 = new FormData();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const onPress = () => {
    if (fName.length < 1) {
      alert('Invalid first name');
      return;
    }
    if (lName.length < 1) {
      alert('Invalid last name');
      return;
    }
    if (email.length < 1) {
      alert('Invalid email');
      return;
    }
    if (username.length < 1) {
      alert('Invalid Username');
      return;
    }
    if (password.length < 1) {
      alert('Invalid Password');
      return;
    }

    formdata.append('first_name', fName);
    formdata.append('last_name', lName);
    formdata.append('email', email);
    formdata.append('username', username);
    formdata.append('password', password);

    console.log(formdata);

    axios({
      method: 'POST',
      url: 'http://192.168.1.106:8000/api/account/register',
      data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        formdata1.append('username', username);
        formdata1.append('password', password);
        axios({
          method: 'POST',
          url: 'http://192.168.1.106:8000/api/account/gettoken',
          data: formdata1,
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
        console.log(err.response);
        alert('An error occured!');
      });
  };

  return (
    <View style={styles.container}>
      <Heading heading="Register" />
      <TextInput
        placeholder="First Name"
        onChangeValue={value => {
          setFName(value);
        }}
        value={fName}
      />
      <TextInput
        placeholder="Last Name"
        onChangeValue={value => {
          setLName(value);
        }}
        value={lName}
      />
      <TextInput
        placeholder="Email"
        onChangeValue={value => {
          setEmail(value);
        }}
        value={email}
      />
      <TextInput
        placeholder="Username"
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

      <Button title="Register" onPress={onPress} />

      <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.next}>Click here to login</Text>
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

export default RegisterScreen;
