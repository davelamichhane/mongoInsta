import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailVerification from '../screens/EmailVerificationScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import Temp from '../screens/Temp';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Temp" component={Temp} />
      </Stack.Navigator>
  );
};

export const SignedOutStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name='EmailVerification' component={EmailVerification} />
      </Stack.Navigator>
  );
};
