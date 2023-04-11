import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { USERS } from '../../data/USERS';

const Stories = () => {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map(user => {
          return (
            <View key={user.id} style={{alignItems: 'center'}}>
              <TouchableOpacity>
                <Image
                  key={user.id}
                  source={{uri: user.image}}
                  style={styles.story}
                />
              </TouchableOpacity>
              <Text style={styles.text}>
                {user.username.length <= 13
                  ? user.username
                  : user.username.slice(0, 10).concat('...')}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
  text: {
    color: 'white',
    fontSize: 10,
  },
});
export default Stories;
