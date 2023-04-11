
import {View, Image, StyleSheet} from 'react-native';
import SignupForm from '../components/signup/SignupForm';
const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://img.icons8.com/fluency/256/instagram-new.png',
            height: 100,
            width: 100,
          }}
        />
        <SignupForm />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    height: 100,
    width: 100,
  },
});
export default SignupScreen;
