import React from 'react'
import { SafeAreaView, StatusBar, KeyboardAvoidingView } from 'react-native';
import Login from '../../components/auth/Login/Login';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <StatusBar hidden={false} backgroundColor={colors.red_100} />
      <KeyboardAvoidingView
        style={globalStyles.authContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Login navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen;
