import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './Navigations/MainNavigator';
import AuthNavigator from './Navigations/AuthNavigator';
import UserContext from './Utility/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  let formdata = new FormData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
        formdata.append('token', value);
        axios({
          method: 'POST',
          url: 'http://192.168.1.106:8000/api/account/retrive',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          setUser(res.data);
          setToken(value);
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <UserContext.Provider value={{user, setUser, token, setToken}}>
        <NavigationContainer>
          {!user ? <AuthNavigator /> : <MainNavigator />}
        </NavigationContainer>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
