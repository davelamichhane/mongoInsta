import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';

const getRandomProfilePicture = async () => {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  return data.results[0].picture.large;
};

const SignupForm = () => {
  const navigation = useNavigation();

  // Schema for signup form
  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(8, 'Your password needs to be 8 characters'),
  });

  // What happens during signup
  const onSignup = async (email, password, username) => {
    try {
      //mongodb signup
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', username: '', password: ''}}
        onSubmit={values =>
          onSignup(values.email, values.password, values.username)
        }
        validationSchema={signupFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              // email
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number or email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            <View
              //username
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length > 4
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="username"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>

            <View
              //password
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('Login')}>
                <Text style={styles.signupText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 1,
  },
  wrapper: {
    marginTop: 80,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#0096f6' : '#9acaf7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
  },
  signupText: {
    color: '#6bb0f5',
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
export default SignupForm;
