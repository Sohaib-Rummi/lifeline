import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../constants/Colors';


const AlertMessage = ({show, onPress}) => {
  return (
    <AwesomeAlert
    show={show}
    showProgress={false}
    title="Alert!"
    message="Your message contains abusive content and cannot be sent."
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showCancelButton={true}
    cancelText="Ok"
    cancelButtonColor={colors.red}
    titleStyle={{
      color: colors.red,
      fontFamily: 'Roboto-Bold'
    }}
    cancelButtonStyle={{
      paddingVertical: 8,
      paddingHorizontal: 50,
    }}
    onCancelPressed={() => {
      onPress();
    }}
  />
  )
}

export default AlertMessage;