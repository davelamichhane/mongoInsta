import {React} from '.react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Auth} from 'aws-amplify';
import {useContext} from 'react';
import {UserContext} from '../../navigation/AuthNavigation';

const Header = () => {
  const navigation = useNavigation();
  const setIsLoggedIn = useContext(UserContext);
  const handleSignout = async () => {
    try {
      const isAuthneticated = await Auth.currentAuthenticatedUser();
      if (isAuthneticated) {
        Auth.signOut();
        setIsLoggedIn(false);
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Instagram Logo */}
      <TouchableOpacity onPress={handleSignout}>
        <Image
          style={styles.logo}
          source={require('../../assets/header-logo.png')}
        />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        {/* Add Post */}
        <TouchableOpacity
          onPress={async () => {
            try {
              const result = await launchImageLibrary({mediaType: 'photo'});
              const imageUri = result.assets[0].uri;
              navigation.navigate('NewPost', {imageUri});
            } catch (error) {
              console.log(error);
            }
          }}>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Notifications (heart) */}
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Messages */}
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  unreadBadge: {
    backgroundColor: '#ff385c',
    position: 'absolute',
    left: 20,
    bottom: 10,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: 600,
  },
});

export default Header;
