import React from 'react'
import { SafeAreaView, View } from 'react-native';
import { globalStyles } from '../../constants/Style';
import Profile from '../../components/Profile/Profile';
const ProfileScreen = () => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <View style={[globalStyles.wrapper, {paddingBottom:10}]}>
        <Profile/>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen;
