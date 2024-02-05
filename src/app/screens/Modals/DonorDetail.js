import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import Item from './components/Item';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../api/AuthContentApi';
const DonorDetail = ({ route }) => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [donor, setDonor] = useState(route.params.donor);
  return (
    <View style={globalStyles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.imageContainer}>
            {
              donor.image ? <Image source={{ uri: donor.image }} style={styles.image} resizeMode='contain' />
                : <Image source={images.user_default_icon} style={styles.image} resizeMode='contain' />
            }
          </View>
          <Text style={styles.userName}>{donor.name && donor.name}</Text>
          <Text style={styles.userAddress}>{donor.city && donor.country ? `${donor.city}, ${donor.country}` : `${city}, ${country}`}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <Item icon="water" title={donor.bloodgroup}/>
        <Item icon="call" title={donor.phone} />
        <Item icon="location" title={donor.address.substr(0, 50).concat('...')} />
      </View>
      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BloodRequestScreen', {donor_id: donor.id})}>
              <Text style={styles.buttonText}>Send Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatScreen', {sender : user, receiver:donor})}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 200,
    padding: 15,
    elevation: 3,
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  userName: {
    fontFamily: 'Roboto-Regular',
    color: colors.grey_200,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 2,
  },
  userAddress: {
    color: colors.grey_100,
  },

  bodyContainer: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    gap:10,
    marginTop:20,
  },
  button:{
    backgroundColor:colors.red,
    height:50,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:15,
    width:150
  },
  buttonText:{
    color:colors.white,
    fontSize:16,
    fontFamily:'Roboto-Light'
  }




})



export default DonorDetail

