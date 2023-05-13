import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import {createUser} from '../../graphql/mutations';
import {API} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

const defaultState = {
  name: '',
  bio: '',
  pronouns: '',
  gender: '',
};

const UpdateProfileForm = () => {
  const [data, setData] = useState(defaultState);
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const {name, bio, pronouns, gender} = data;
    try {
      await API.graphql({
        query: createUser,
        variables: {
          input: {
            name,
            bio,
            pronouns,
            gender,
          },
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS',
      });
      setData(defaultState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={newText => setData({...data, name: newText})}
        value={data.name}
        placeholder="name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={newText => setData({...data, bio: newText})}
        value={data.bio}
        placeholder="bio"
        style={styles.textInput}
        multiline={true}
      />
      <TextInput
        onChangeText={newText => setData({...data, pronouns: newText})}
        value={data.pronouns}
        placeholder="pronouns"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={newText => setData({...data, gender: newText})}
        value={data.gender}
        placeholder="gender"
        style={styles.textInput}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.navigate('Home')} />
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
  },
});

export default UpdateProfileForm;
