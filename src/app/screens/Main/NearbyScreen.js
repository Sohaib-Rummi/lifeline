import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { globalStyles } from '../../constants/Style'
import Nearby from '../../components/Nearby/Nearby'
import { AppContext } from '../../api/AppContentApi'
import { colors } from '../../constants/Colors'
import {
  requestForLocationPermission,
  checkLocationPermission,
  requestForeEableGPS
} from '../../api/PermissionsApi';

const NearbyScreen = () => {

  const { 
    getUserCurrentLocation,
    userCurrentLocation,
    getFormattedAddress,
  } = useContext(AppContext);

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkLocationPermission();
      if (permission === "granted") {
        const result = await requestForeEableGPS();
        if (result) {
          getUserCurrentLocation();
        }
      }
      else {
        const result = await requestForLocationPermission();
        if(result === "granted"){
          const result = await requestForeEableGPS();
          if (result) {
            getUserCurrentLocation();
          }
        }
      }
    }
    checkPermission();
  }, []);

  useEffect(() => {
    if(userCurrentLocation != null){
      getFormattedAddress(userCurrentLocation.latitude, userCurrentLocation.longitude);
    }
  }, [userCurrentLocation])



  return (
    <View style={globalStyles.wrapper}>
      {
        userCurrentLocation ? <Nearby  location={userCurrentLocation} /> :
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.grey_100}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default NearbyScreen
