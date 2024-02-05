import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from '../api/AuthContentApi';
import { auth } from '../database/DB';
import InternetScreen from '../screens/Network/InternetScreen';
import NetInfo from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();

const Route = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    getCurrentUser,
  } = useContext(AuthContext)
  const [isConnected, seIsConnected] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        getCurrentUser();
      }
      else {
        setIsLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkInternet = () => {
      const unsubscribe = NetInfo.addEventListener(state => {
        seIsConnected(state.isConnected);
        setInitialLoad(false);
      });
    } 
    setTimeout(() => checkInternet(), 1000);
  }, []);




  if (initialLoad) {
    return null; 
  }

  return (
    <NavigationContainer>
      {
        isConnected ?
          !isLoggedIn ? <AuthStack /> : <AppStack />
          :
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="InternetScreen" component={InternetScreen} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  )
}

export default Route
