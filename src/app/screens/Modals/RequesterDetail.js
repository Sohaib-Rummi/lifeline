import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import { getFormatedDate } from '../../utils/Functions';
import Item from './components/Item';
import Button from './components/Button';
import { AuthContext } from '../../api/AuthContentApi';
const RequesterDetail = ({ route, navigation }) => {
  const {user} = useContext(AuthContext);
  const [requester, setRequester] = useState(route.params.requester);
  return (
    <View style={globalStyles.wrapper}>
      <View style={styles.bodyContainer}>
        <Item icon="person" title={requester.name}/>
        <Item icon="water" title={requester.blood_group}/>
        <Item icon="call" title={requester.phone} />
        <Item icon="calendar" title={getFormatedDate(new Date(requester.required_date), "WWW MMM DD YYYY") } />
        <Item icon="location" title={requester.sender_address.substr(0, 50).concat('...')} />
      </View>
      <View style={{marginHorizontal:30}}>  
        <Button text="Message" onPress={() => navigation.navigate('ChatScreen', {sender:user, receiver:requester})}/>
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




})



export default RequesterDetail

