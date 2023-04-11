import {useNavigation} from '@react-navigation/native';
import FormikPostUploader from './FormikPostUploader';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
          style={{height: 30, width: 30}}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>New Post</Text>
    </View>
  );
};

const AddNewPost = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FormikPostUploader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginRight: 25,
    fontWeight: '700',
  },
});

export default AddNewPost;
