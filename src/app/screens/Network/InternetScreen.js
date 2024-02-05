import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Iconic from '../../components/ui/Icons/Icons';
import { colors } from '../../constants/Colors';
const InternetScreen = () => {
  return (
    <View style={styles.container}>
      <Iconic name="cloud-offline-outline" color={colors.grey_100} size={32}/>
      <Text style={styles.text}>Internet is not connected</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        paddingHorizontal:30,
    },
    text:{
        color:colors.grey_100,
        fontSize:18,
        marginTop:10,
        fontFamily:'Roboto-Regular',
        textAlign:'center',
    }
});

export default InternetScreen

