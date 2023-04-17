import {Auth} from 'aws-amplify';
import {useContext, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {UserContext} from '../navigation/AuthNavigation';

const EmailVerification = () => {
  const {email, password, username} = useRoute().params;
  const [input, setInput] = useState('');
  const setIsLoggedIn = useContext(UserContext);
  const handleChange = text => {
    setInput(text);
  };

  const handleSubmit = async (verificationCode, email, password, username) => {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      await Auth.signIn(username, password);
      setIsLoggedIn(true);
    } catch (err) {
      console.log('error verifying email: ', err);
    }
  };

  return (
    <View style={{marginTop: 160, marginHorizontal: 20}}>
      <Text style={{fontWeight: 500}}>
        Please Enter Verification Code sent to your email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="enter verification code"
        value={input}
        onChangeText={text => handleChange(text)}
        keyboardType="number-pad"
      />
      <Button
        title="Submit"
        onPress={() => handleSubmit(input, email, password, username)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#fafafa',
    marginVertical: 30,
    borderWidth: 1,
  },
});

export default EmailVerification;
