import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../constants/Style';
import BloodRequest from '../../components/BloodRequest/BloodRequest';
const BloodRequestScreen = ({route}) => {
  const donor_id = route?.params?.donor_id;
  return (
    <View style={globalStyles.wrapper}>
      <BloodRequest donor_id={donor_id}/>
    </View>
  )
}

export default BloodRequestScreen

const styles = StyleSheet.create({})