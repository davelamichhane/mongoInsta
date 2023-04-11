import React from 'react';
import {Button, Image, TextInput} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation, useRoute} from '@react-navigation/native';

const uploadPostSchema = Yup.object().shape({
  caption: Yup.string().max(2200, 'Caption has reached max chat'),
});

const FormikPostUploader = () => {
  const navigation = useNavigation();
  const imageUri = useRoute().params.imageUri;

  const uploadImage = async () => {
    try {
      // mongobd upload
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={{caption: ''}}
      onSubmit={values => {
        uploadImage();
        navigation.goBack();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}>
      {({handleBlur, handleChange, handleSubmit, values, isValid}) => (
        <>
          <Image
            source={{uri: imageUri}}
            style={{
              height: 350,
              width: 350,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <TextInput
            placeholder="write a caption..."
            placeholderTextColor="grey"
            multiline={true}
            style={{color: 'white', fontSize: 16}}
            onChangeText={handleChange('caption')}
            onBlur={handleBlur('caption')}
            value={values.caption}
          />
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
