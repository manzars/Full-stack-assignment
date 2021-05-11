import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from '../Screens/MainPage';
import UserDetailScreen from '../Screens/UserDetailScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainPage} />
      <Stack.Screen name="Detail" component={UserDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
