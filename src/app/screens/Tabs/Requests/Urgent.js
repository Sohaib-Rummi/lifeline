import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { urgentbloodrequests } from '../../../database/Collections';
import { AuthContext } from '../../../api/AuthContentApi';
import Item from './Item';
import { colors } from '../../../constants/Colors';
import { getTodayDate } from '../../../utils/Functions';
const Urgent = () => {
  const { user, currentUserId } = useContext(AuthContext)
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [error, setError] = useState(null);

  const getNormalRequests = async () => {
    try {
      let requests = [];
      const querySnapshot = await urgentbloodrequests
      .orderBy('createdAt', 'desc')
      .get();
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          let todayDate = new Date(getTodayDate());
          let required_date = new Date(documentSnapshot.data().createdAt.toDate());
          if(todayDate <= required_date){
            requests.push(documentSnapshot.data());
          }
          else if(requests.length === 0){
            setError('No Urgent Requests Found!');
          }
        });
        setUrgentRequests(requests);
      }
      else {
        setError('No Urgent Requests Found!');
      }
    } catch (error) {
      console.log("Get Urgent Requests Error : ", error);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => { getNormalRequests() }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <View style={styles.container}>
      {
        urgentRequests.length > 0 ?
          <FlatList
            data={urgentRequests}
            renderItem={({ item }) => item.id != currentUserId && <Item request={item} />}
            keyExtractor={(item, i) => i*i}
          />
          : error != null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colors.grey_200 }}>{error}</Text>
            </View> :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.grey_200} />
            </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  }
})

export default Urgent

