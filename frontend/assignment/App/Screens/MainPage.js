import React from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import colors from '../Utility/colors';
import Card from '../Components/Card';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eee" />
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
});

export default MainPage;
