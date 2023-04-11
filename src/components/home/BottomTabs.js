import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import {useEffect, useState} from 'react';

const BottomTabs = ({icons}) => {
  const [activeTab, setActiveTab] = useState('Home');

  const Icon = ({icon}) => {
    return (
      <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
        <Image
          source={{uri: activeTab === icon.name ? icon.active : icon.inactive}}
          style={[
            styles.icon,
            icon.name === 'Profile' ? styles.profilePic() : null,
            activeTab === 'Profile' && icon.name === 'Profile'
              ? styles.profilePic('Profile')
              : null,
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => {
          return <Icon icon={icon} key={index} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // position: 'absolute',
    // width: '100%',
    // bottom: '5%',
    // zIndex: 999,
    // backgroundColor: '#000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddintTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderColor: activeTab === 'Profile' ? 'white' : 'black',
  }),
});

export default BottomTabs;
