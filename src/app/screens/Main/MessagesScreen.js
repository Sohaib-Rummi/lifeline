import React from 'react'
import { SafeAreaView,  View } from 'react-native'
import { globalStyles } from '../../constants/Style';
import Messages from '../../components/Chats/Messages';
const MessagesScreen = () => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
      <Messages/>
    </SafeAreaView>
  )
}

export default MessagesScreen