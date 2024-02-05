import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/Colors';
import Item from './Item';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../api/AuthContentApi';
import { getFormatedDate } from '../../utils/Functions';

const Body = () => {

  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage</Text>
      <Item icon="water" title={user.bloodgroup ? user.bloodgroup : 'Blood Group'} onPress={() => navigation.navigate('BloodGroup')} />
      <Item icon="calendar" title={user.lastbleed ? getFormatedDate(new Date(user.lastbleed), "WWW MMM DD YYYY") : 'Last Donation'} onPress={() => navigation.navigate('LastBleed')} />
      <Item icon="location" title={user.address ? user.address.substr(0, 50).concat('...') : 'Address'} onPress={() => navigation.navigate('Address')} />
      <Item icon="call" title={user.phone ? user.phone : 'Phone #'} onPress={() => navigation.navigate('PhoneNumber')} />
      <Item icon="male-female-sharp" title={user.gender ? user.gender : 'Gender'} onPress={() => navigation.navigate('Gender')} />
      <Item icon="calendar" title={user.dob ? getFormatedDate(new Date(user.dob), "WWW MMM DD YYYY") : 'Date of Birth'} onPress={() => navigation.navigate('DateOfBirth')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  heading: {
    color: colors.grey_200,
    fontFamily: 'Kalam-Regular',
    marginTop: 10,
    marginLeft: 5,
    fontSize: 16,
  }
});

export default Body
