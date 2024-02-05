import React from 'react'
import { SafeAreaView, StatusBar, KeyboardAvoidingView } from 'react-native';
import ForgotPassword from '../../components/auth/ForgotPassword/ForgotPassword';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <StatusBar hidden={false} backgroundColor={colors.red_100} />
      <KeyboardAvoidingView
        style={globalStyles.authContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ForgotPassword navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen;