import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {bottomTabIcons} from '../assets/Bottom Tab Icons';
import Header from '../components/home/Header';
import Post from '../components/home/Post';
import Stories from '../components/home/Stories';
import {POSTS} from '../data/POSTS';
import BottomTabs from '../components/home/BottomTabs';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
export default HomeScreen;
