import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../api/AuthContentApi'
import { AppContext } from '../../api/AppContentApi';
import Iconic from '../../components/ui/Icons/Icons';



const Address = ({ navigation }) => {
  const {
    error,
    message,
    setMessage,
    setError,
    user
  } = useContext(AuthContext);
  const {getGeometryAddress, formattedAddress} = useContext(AppContext);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
        navigation.goBack();
      }, 3000)
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000)
    }
  }, [error]);


  const onPressHandler  = async () => {
    await getGeometryAddress(formattedAddress);
  }

  return (
    <View style={[globalStyles.wrapper, { paddingHorizontal: 20 }]}>
      <Title title="Your Current Address" />
      {
        message && <View style={[globalStyles.errorContainer, { backgroundColor: '#b2f6a2' }]}>
          <Text style={[globalStyles.error, { color: '#31ba12' }]}>{message}</Text>
        </View>
      }
      {
        error && <View style={globalStyles.errorContainer}>
          <Text style={globalStyles.error}>{error}</Text>
        </View>
      }
      <View style={styles.addressContainer}>
        <View style={styles.address}>
          <Text style={styles.userAddress}>{ formattedAddress.substr(0,50).concat('...')}</Text>
        </View>
        <TouchableOpacity style={styles.markerButton} >
          <Iconic name="location" size={24} color={colors.red} onPress={()=>{navigation.navigate('Map')}}/>
        </TouchableOpacity>
      </View>
      <Button onPress={() => onPressHandler()} />
    </View>
  )
}

export default Address

const styles = StyleSheet.create({
  addressContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
    height: 50,
    elevation: 3,
    borderRadius: 15,
    flexDirection: 'row',
  },
  address:{
    alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    flexWrap:'wrap',
    width:'85%',
  },
  markerButton:{
    width:'15%',
    justifyContent:'center',
    alignItems:'center',
  },
  userAddress:{
    color:colors.grey_100,
    fontSize:16
  }


})