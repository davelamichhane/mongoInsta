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
import Validator from 'email-validator';
import { auth } from '../../firebase';

const LoginForm = () => {
  const navigation = useNavigation();

  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(8, 'Your password needs to be 8 characters'),
  });

  const onLogin = async (email, password) => {
    try {
      //mongodb login
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
        initialValues={{email: '', password: ''}}
        onSubmit={values => onLogin(values.email, values.password)}
        validationSchema={loginFormSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <View
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
                placeholder="Phone number, username or email"
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
