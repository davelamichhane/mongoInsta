import {useRoute} from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {Image, View} from 'react-native';

const Temp = () => {
  const [imageUri, setImageUri] = useState(null);
  const key = useRoute().params.key;

  useEffect(() => {
    Storage.get(key)
      .then(result => {
        setImageUri(result);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
};

export default Temp;
