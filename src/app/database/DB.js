import app from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';



const GoogleSigninConfiguration = () => {
  GoogleSignin.configure({
    webClientId: '116318799974-1rmuqbdhdr1f2uv5kiit85njvdsq0ejg.apps.googleusercontent.com',
  });
};


export {
  app,
  auth,
  firestore,
  storage,
  GoogleSignin,
  GoogleSigninConfiguration,
  messaging,
  
}