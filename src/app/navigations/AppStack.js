import React, {useContext, useEffect} from 'react'
import { TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabs  from './Tabs';
import ProfileScreen from '../screens/Main/ProfileScreen';
import BloodGroup from '../screens/Modals/BloodGroup';
import LastBleed from '../screens/Modals/LastBleed';
import DateOfBirth from '../screens/Modals/DateOfBirth';
import Gender from '../screens/Modals/Gender';
import PhoneNumber from '../screens/Modals/PhoneNumber';
import Address from '../screens/Modals/Address';
import Map from '../screens/Modals/Map';
import BloodRequestScreen from '../screens/Main/BloodRequestScreen';
import UrgentBloodRequestScreen from '../screens/Main/UrgentBloodRequestScreen';
import DonorDetail from '../screens/Modals/DonorDetail';
import RequesterDetail from '../screens/Modals/RequesterDetail';
import { AuthContext } from '../api/AuthContentApi';
import { AppContext } from '../api/AppContentApi';
import ChatScreen from '../screens/Main/ChatScreen';
import TopTabs from './TopTabs';
import YourRequestTabs from './YourRequestsTab';
import { messaging } from '../database/DB';
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor:colors.red,
  },
  headerTintColor:colors.white,
  headerTitleStyle: {
    fontFamily:'Kalam-Regular',
    fontSize:24,
    marginLeft:-20,
  }
}

const AppStack = () => {
  const navigation = useNavigation();
  const {isLoggedIn, getCurrentUser} = useContext(AuthContext);
  const {modalVisible, setModalVisible} = useContext(AppContext);
  
  useEffect(()=>{
    if(isLoggedIn){
      getCurrentUser();
    }
  }, [])


  useEffect(() => {
    if (Platform.OS === 'android') {
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const screen = remoteMessage.data.screenName;
        navigation.navigate(screen);
        // console.log('Background notification clicked. Screen:', screen);
      });
    }

  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="App" 
        component={Tabs} 
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={({navigation})=>({
          headerShown:true,
          headerRight:()=>(
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Ionicons name="power" size={24} color={colors.white} style={{marginRight:20}} />
            </TouchableOpacity>
            )
        })}
        />
        <Stack.Screen name="BloodRequestScreen" component={BloodRequestScreen} options={{title:"Blood Request"}}/>
        <Stack.Screen name="UrgentBloodRequestScreen" component={UrgentBloodRequestScreen} options={{title:"Urgent Blood Request"}}/>
        <Stack.Screen name="ManageRequestsScreen" component={TopTabs} options={{title:"Manage Requests"}}/>
        <Stack.Screen name="ManageMyRequestsScreen" component={YourRequestTabs} options={{title:"Your Requests"}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="BloodGroup" component={BloodGroup} options={{title:"Blood Group"}}/>
          <Stack.Screen name="LastBleed" component={LastBleed} options={{title:"Last Donation",}}/>
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{title:"Phone Number"}}/>
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="DateOfBirth" component={DateOfBirth} options={{title:"Date of Birth"}}/>
          <Stack.Screen name="Map" component={Map} options={{title:"Pin Your Location"}}/>
          <Stack.Screen name="DonorDetail" component={DonorDetail} options={{title:"Donor Information"}}/>
          <Stack.Screen name="RequesterDetail" component={RequesterDetail} options={{title:"Requester Information"}}/>
        </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppStack;
