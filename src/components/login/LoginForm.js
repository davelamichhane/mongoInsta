import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Auth} from 'aws-amplify';
import {useContext} from 'react';
import { UserContext } from '../../navigation/AuthNavigation';

const LoginForm = () => {
  const navigation = useNavigation();
  const setIsLoggedIn = useContext(UserContext);

  const loginFormSchema = Yup.object().shape({
    username: Yup.string().required('A username is required'),
    password: Yup.string()
      .required()
      .min(8, 'Your password needs to be 8 characters'),
  });

  const onLogin = async (username, password) => {
    try {
      await Auth.signIn(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Incorrect Username or Password', error.message, [
        {
          text: 'OK',
          style: 'cancel',
        },
        {
          text: 'Sign Up',
          onPress: () => navigation.push('Signup'),
        },
      ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={values => onLogin(values.username, values.password)}
        validationSchema={loginFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor: values.username.length < 1 ? '#ccc' : 'red',
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

            <View style={{alignItems: 'flex-end', marginBottom: 30}}>
              <Text style={{color: '#6bb0f5'}}>Forgot password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
              android_ripple={{color: '#fff'}}>
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('Signup')}>
                <Text style={styles.signupText}>Sign Up</Text>
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
export default LoginForm;
