import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'
import MessageItem from './MessageItem'
import { chats as collection } from '../../database/Collections'
import { AuthContext } from '../../api/AuthContentApi'
import { getFormatedDate } from '../../utils/Functions'
import { colors } from '../../constants/Colors'
const Messages = () => {

  const {
    user,
  } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const senderChats = await collection.where('sender_id', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();

      const receiverChats = await collection.where('receiver_id', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();

      const senderChatsData  = senderChats.docs.map(doc => {
        return doc.data();
      });

      const receiverChatsData = receiverChats.docs.map(doc => {
        return doc.data();
      });
      const allChats = [...senderChatsData, ...receiverChatsData];
      setChats(allChats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChats();
    const interval = setInterval(() => {
      fetchChats();
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <View style={styles.container}>
      {
        chats != null ?
          <FlatList
            data={chats}
            renderItem={({ item }) => <MessageItem
              sender_id={item.sender_id}
              receiver_id={item.receiver_id}
              date={getFormatedDate(new Date(item.createdAt.toDate()), "DD-MM-YYYY")}
              message={item.last_message}

            />}
            keyExtractor={(item, i) => i * i}
          />
          :
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={colors.grey_100} />
          </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default Messages

