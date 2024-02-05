import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './Style';

const OnBoardScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>LifeLine</Text>
          <Text style={styles.subHeading}>Where life find you again.</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/OnBoard/logo.png')} style={styles.image}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.replace('LoginScreen')}>
            <Text style={styles.buttonText}>Get Started!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OnBoardScreen;
