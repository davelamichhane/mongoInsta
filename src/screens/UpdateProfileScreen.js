import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import UpdateProfileForm from '../components/profile/UpdateProfileForm';

const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState()
  console.log(profilePic)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image source={ profilePic ? {uri:profilePic} : require('../assets/icons8-test-account-48.png')} />
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'transparent',
              marginTop: 30,
            },
            styles.wrapperCustom,
          ]}
          onPress={async () => {
            try {
              const result = await launchImageLibrary({mediaType: 'photo'});
              setProfilePic(result.assets[0].uri)
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text>choose profile pic</Text>
        </Pressable>
      </View>

      <UpdateProfileForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
  },
});

export default UpdateProfileScreen;
