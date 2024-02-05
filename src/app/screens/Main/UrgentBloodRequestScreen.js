import React from 'react';
import { View } from 'react-native'
import { globalStyles } from '../../constants/Style';
import UrgentBloodRequest from '../../components/BloodRequest/UrgentBloodRequest';
const UrgentBloodRequestScreen = () => {
  return (
    <View style={globalStyles.wrapper}>
      <UrgentBloodRequest/>
    </View>
  )
}

export default UrgentBloodRequestScreen
