import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../Utility/colors';

const Heading = props => {
  return <Text style={styles.heading}>{props.heading}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 30,
    color: colors.black,
    marginTop: '20%',
    fontWeight: 'bold',
    marginBottom: '10%',
  },
});

export default Heading;
