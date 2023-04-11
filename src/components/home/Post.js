import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Divider } from 'react-native-elements';

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/like.png',
    likedImageUrl: 'https://img.icons8.com/ios-glyphs/90/fa414a/like.png',
  },
  {
    name: 'Comment',
    imageUrl:
      'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble.png',
  },
  {
    name: 'Share',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/60/ffffff/save.png',
  },
];

const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{marginHorizontal: 15, marginTop: 10}}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        < Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({post}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={{uri: post.profile_picture}} style={styles.postHeader} />
      <Text style={styles.text}>{post.user.toLowerCase()}</Text>
    </View>
    <Text style={{color: 'white', fontWeight: 900}}>...</Text>
  </View>
);

const PostImage = ({post}) => {
  return (
    <View style={{width: '100%', height: 450}}>
      <Image source={{uri: post.imageUrl}} style={styles.post} />
    </View>
  );
};

const Icon = ({imgStyle, imgUrl}) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}} />
  </TouchableOpacity>
);

const PostFooter = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[0].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

const Likes = ({post}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: 4}}>
      <Text style={styles.text}>{post.likes.toLocaleString('en')} likes</Text>
    </View>
  );
};

const Caption = ({post}) => {
  return (
    <View style={{marginTop: 3}}>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight: '600'}}>{post.user} </Text>
        <Text>{post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentSection = ({post}) => {
  const number = post.comments.length;
  const all = number > 1 ? 'all' : '';
  const plural = number > 1 ? 'comments' : 'comment';
  const string = `View ${all} ${number} ${plural}`;
  if (number > 0) {
    return <Text style={{color: 'grey'}}>{string}</Text>;
  }
};

const Comments = ({post})=>{
  return <>
    {
      post.comments.map((comment, index)=>{
        return <View key={index} style={{flexDirection:'row', marginTop:5}}>
          <Text style={{color:'white'}}>
            <Text style={{fontWeight:'600'}}>{comment.user} </Text>
            {comment.comment}
          </Text>
        </View>
      })
    }
  </>
}

const styles = StyleSheet.create({
  postHeader: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  text: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 600,
  },
  post: {
    height: '100%',
    resizeMode: 'cover',
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
});
export default Post;
