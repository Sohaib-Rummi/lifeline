import React, {useLayoutEffect} from 'react'
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import Chat from '../../components/Chats/Chat';
import { images } from '../../constants/Images';
import Iconic from '../../components/ui/Icons/Icons';
const ChatScreen = ({route, navigation}) => {
  const {sender, receiver} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      headerTitle: '',
      headerStyle:{
        height:70,
        backgroundColor:colors.red,
      },
      headerLeft: () => {
        return (
          <View style={styles.headerStyle}>
            <TouchableOpacity style={{marginLeft:10, height:'100%', justifyContent:'center'}} >
              <Iconic name="arrow-back-outline" size={24} color={colors.white} onPress={() => navigation.goBack()}/>
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
             { 
              receiver.image ? <Image source={{uri: receiver.image}} style={styles.avatar}/>
              : <Image source={images.user_default_icon} style={styles.avatar}/>
            }
            </View>
            <View style={styles.donorInfo}>
              <Text style={styles.donorName}>{receiver.name}</Text>
            </View>
          </View>
        );
      }
    })
  }, [])
 
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <Chat sender={sender} receiver={receiver}/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headerStyle:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    height:'100%'
  },
  avatarContainer:{
    width:50,
    height:50,
    borderRadius:100,
    marginLeft:10,
    overflow:'hidden'
  },
  avatar:{
    width:'100%',
    height:'100%',
    borderRadius:100,
    resizeMode:'cover',
  },
  donorInfo:{
    marginLeft:10,
  },
  donorName:{
    color:colors.white,
    fontSize:18,
    fontFamily:'Roboto-Regular'
  },
  status:{
    color:colors.white,
    fontSize:12,
    marginTop:-3,
  }
})

export default ChatScreen

