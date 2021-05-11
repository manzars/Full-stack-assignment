import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import colors from '../Utility/colors';
import Heading from '../Components/Heading';
import TextInput from '../Components/TextInput';
import Button from '../Components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import UserContext from '../Utility/Context';

const UserDetailScreen = props => {
  const {item} = props.route.params;
  let formdata = new FormData();
  const user = useContext(UserContext);

  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    setSalary(item.salary);
    setCompany(item.last_company);
    setName(item.document.split('/')[3]);
  }, []);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        setImage(image);
        setName(image.path.split('/').slice(-1));
      })
      .catch(err => {
        alert('Something went wrong');
      });
  };

  const update = () => {
    console.log('HEll');

    formdata.append('last_company', company);
    formdata.append('salary', salary);
    if (image !== null) {
      console.log(image);
      formdata.append('document', {
        name: name,
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.pathreplace('file://', ''),
      });
    }

    axios({
      method: 'PUT',
      url: `http://192.168.1.106:8000/api/employee/update/${item.pk}/`,
      data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${user.token}`,
      },
    })
      .then(ress => {
        console.log('done');
        props.navigation.goBack();
      })
      .catch(err => {
        alert('An error occured!');
      });
  };

  return (
    <View style={styles.container}>
      <Heading heading="Edit Details" />
      <TextInput
        placeholder="Salary"
        value={salary}
        onChangeValue={value => {
          setSalary(value);
        }}
      />
      <TextInput
        placeholder="Last Company"
        value={company}
        onChangeValue={value => {
          setCompany(value);
        }}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={!name == '' ? () => setName('') : choosePhotoFromLibrary}>
          <View>
            <Text style={styles.buttonText}>
              {!name == '' ? 'Remove' : 'Select Image'}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <Button title="Submit" onPress={update} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
  button: {
    width: 80,
    height: 25,
    backgroundColor: '#aaa',
    borderRadius: 5,
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 5,
    color: '#aaa',
    fontStyle: 'italic',
    fontSize: 12,
    width: '60%',
  },
});

export default UserDetailScreen;
