import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { bloodrequests } from '../../../database/Collections';
import { AuthContext } from '../../../api/AuthContentApi';
import { colors } from '../../../constants/Colors';
import Item from './Item';
import { getTodayDate } from '../../../utils/Functions';
const Recieve = () => {
  const { user, currentUserId } = useContext(AuthContext)
  const [recieveRequests, setRecieveRequests] = useState([]);
  const [error, setError] = useState(null);

  const getRecieveRequests = async () => {
    try {
      let requests = [];
      const querySnapshot = await bloodrequests
      .where('donor_id', '==', `${currentUserId}`)
      .where('request_approved', '==', 0)
      .where('requestStatus', '==', 1)
      .orderBy('createdAt', 'desc')
      .get();
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((documentSnapshot) => {
          let todayDate = new Date(getTodayDate());
          let required_date = new Date(documentSnapshot.data().required_date);
          if(required_date >= todayDate){
            requests.push(documentSnapshot.data());
          }
          else if(requests.length === 0){
            setError('No Received Requests Found!');
          }
        });
        setRecieveRequests(requests);
      }
      else {
        setError('No Received Requests Found!');
      }
    } catch (error) {
      console.log("Get Recieve Requests Error : ", error);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => { getRecieveRequests() }, 2000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <View style={styles.container}>
      {
        recieveRequests.length > 0 ?
          <FlatList
            data={recieveRequests}
            renderItem={({ item }) => <Item request={item} sender_component={"recieve"} />}
            keyExtractor={(item, i) => i*i}
          /> : error != null ?
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

export default Recieve

