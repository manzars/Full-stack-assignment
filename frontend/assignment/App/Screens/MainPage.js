import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';
import colors from '../Utility/colors';
import Card from '../Components/Card';
import UserContext from '../Utility/Context';
import axios from 'axios';
import Heading from '../Components/Heading';
import {useIsFocused} from '@react-navigation/native';

const MainPage = props => {
  const user = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://192.168.1.106:8000/api/employee/all',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${user.token}`,
      },
    })
      .then(ress => {
        setData(ress.data);
        setIsFetching(false);
      })
      .catch(err => {
        alert('An error occured!');
        setIsFetching(false);
      });
  };

  const crossPressed = index => {
    setIsFetching(true);
    console.log(index);

    axios({
      method: 'DELETE',
      url: `http://192.168.1.106:8000/api/employee/delete/${index}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${user.token}`,
      },
    })
      .then(ress => {
        fetchData();
        setIsFetching(false);
      })
      .catch(err => {
        alert('An error occured!');
        setIsFetching(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eee" />
      <Heading heading="All Employee" />
      <FlatList
        data={data}
        keyExtractor={item => item.pk.toString()}
        renderItem={({item, index}) => (
          <Card
            item={item}
            index={index}
            crossPressed={crossPressed}
            {...props}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        ListFooterComponent={() => <View style={{height: 10}}></View>}
        ListHeaderComponent={() => <View style={{height: 10}}></View>}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching}
        onRefresh={() => {
          fetchData();
          setIsFetching(true);
        }}
      />
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
