import React from 'react'
import { SafeAreaView, StatusBar, KeyboardAvoidingView } from 'react-native';
import Signup from '../../components/auth/Signup/Signup';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <StatusBar hidden={false} backgroundColor={colors.red_100} />
      <KeyboardAvoidingView
        style={globalStyles.authContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Signup navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignupScreen;
