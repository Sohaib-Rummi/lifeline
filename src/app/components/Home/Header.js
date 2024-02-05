import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import Toast from 'react-native-toast-message';
import {
  requestForStoragePermission,
  checkStoragePermission
} from '../../api/PermissionsApi';


const Header = () => {

  const {
    user,
    error,
    setError,
    message,
    setMessage,
    uploadProfile,
  } = useContext(AuthContext);


  const {
    city,
    country,
  } = useContext(AppContext);


  const onPressHandler = async () => {
    const permission = await checkStoragePermission();
    if (permission === 'granted') {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        mediaType: 'photo'
      }).then(async (image) => {
        Toast.show({
          type: 'info',
          text1: 'Image is uploading....'
        });
        const result = await uploadProfile(image.path);
        if(result){
          Toast.show({
            type: 'success',
            text1: 'Image uploaded successfully....'
          });
        }
        else{
          Toast.show({
            type: 'error',
            text1: 'Sorry, something went wrong'
          });
        }
      })
        .catch((error) => {
          console.log("Image Picker error", error);
        });
    }
    else {
      await requestForStoragePermission();
    }
  }

  useEffect(() => {
    let interval = null;
    if (message) {
      interval = setTimeout(() => {
        setMessage(null);
      }, 2000)
    }
    return () => {
      clearTimeout(interval);
    }
  }, [message]);

  useEffect(() => {
    let interval = null;
    if (error) {
      interval = setTimeout(() => {
        setError(null);
      }, 3000)
    }
    return () => {
      clearTimeout(interval);
    }
  }, [error]);

  return (

    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => onPressHandler()}>
          {
            user.image ? <Image source={{ uri: user.image }} style={styles.image} resizeMode='contain' />
              : <Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
          }
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name && user.name}</Text>
        {
          <Text style={styles.userAddress}>
          {
            user.city && user.country ? `${user.city}, ${user.country}` : `${city}, ${country}`
          }
          </Text>
        }
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    padding: 15,
    elevation: 3,
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: colors.grey_200,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 2,
  },
  userAddress: {
    color: colors.grey_100,
  }
})

export default Header;
