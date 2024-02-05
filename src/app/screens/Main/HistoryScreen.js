import React, { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import History from '../../components/History/History'
import { bloodrequests } from '../../database/Collections'
import { AuthContext } from '../../api/AuthContentApi'
import { request } from 'react-native-permissions'
import { colors } from '../../constants/Colors'
const HistoryScreen = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const getAcceptedRequest = async () => {
    try {
      const querySnapshot = await bloodrequests
        .where('request_approved', '==', 1)
        .where('id', '==', user.id)
        .orderBy('createdAt', 'desc')
        .get();
      if (querySnapshot.size > 0) {
        let requests_arr = [];
        const querySnapshot_2 = await bloodrequests
          .where('request_approved', '==', 1)
          .where('donor_id', '==', user.id)
          .orderBy('createdAt', 'desc')
          .get();
        querySnapshot.forEach(documentSnapshot => {
          requests_arr.push(documentSnapshot.data());
        })
        
        if (querySnapshot_2.size > 0) {
          querySnapshot_2.forEach(documentSnapshot => {
            requests_arr.push(documentSnapshot.data());
          })
        }
        else{
          console.log("Error on 2")
        }
        requests_arr.sort((a, b) => {
          if (a.createdAt.seconds < b.createdAt.seconds) return 1;
          if (a.createdAt.seconds > b.createdAt.seconds) return -1;
          return 0;
        });
        setRequests(requests_arr);
      }
      else {
        console.log("Error  on 1");
      }
    } catch (error) {
      console.log("Fetch Requests error in HistoryScreen.js", error)
    }
  }

  useEffect(() => {
    getAcceptedRequest();
  }, [])


 

  return (
    <SafeAreaView style={globalStyles.wrapper}>
    {
      requests.length > 0 ? 
      <History requests={requests} />
      : <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}> 
        <ActivityIndicator size="large" color={colors.grey_200}/>
      </View>
    }
      
    </SafeAreaView>
  )
}

export default HistoryScreen;