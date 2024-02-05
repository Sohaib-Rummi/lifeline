import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { images } from '../../constants/Images';
import { AppContext } from '../../api/AppContentApi';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../constants/Colors';
const Body = () => {
  const navigation = useNavigation();
  const [alert, setAlert] = useState(false);
  const { user, toggleStatus } = useContext(AppContext);
  const toggle_switch = () => {
    if (user.status === 1) {
      toggleStatus(0);
    }
    else if(user.address == "" || user.bloodgroup == "" || user.phone == ""){
      setAlert(true);
    }
    else{
      toggleStatus(1);
    }
  };

  const isProfileComplete = (screenName) => {
    if(user.address == "" || user.bloodgroup == "" || user.phone == ""){
      setAlert(true);
    }
    else{
      navigation.navigate(screenName); 
    }

  }


  

  return (

    <View style={styles.container}>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Manage Profile"
        message="Please complete your profile to become a donor or make a request. It will help people's to reach you easily"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Manage"
        confirmButtonColor={colors.green}
        cancelButtonColor={colors.red}
        titleStyle={{
          color:colors.red,
          fontFamily:'Roboto-Bold'
        }}
        cancelButtonStyle={{
          paddingVertical:8,
          paddingHorizontal:25,
        }}
        confirmButtonStyle={{
          paddingVertical:8,
          paddingHorizontal:25,
        }}
        onCancelPressed={() => {
          setAlert(false);
        }}
        onConfirmPressed={() => {
          navigation.navigate('Profile');
        }}
      />
      <Item title="Blood Request " image={images.heart_icon} onPress={() => { isProfileComplete('BloodRequestScreen');}} />
      <Item title="Blood Request (Urgent)" image={images.blood_bag_icon} onPress={() => { isProfileComplete('UrgentBloodRequestScreen') }} />
      <Item title="Manage Blood Requests" image={images.blood_drop_icon} onPress={() => { isProfileComplete('ManageRequestsScreen') }} />
      <Item title="Your Blood  Requests" image={images.blood_d__icon} onPress={() => { navigation.navigate('ManageMyRequestsScreen') }} />
      <Item title="Manage Profile" image={images.person_icon} onPress={() => { navigation.navigate('Profile') }} imageStyle={{ marginTop: -10 }} />
      <Item title="Available to Donate" image={user.status === 0 ? images.toggle_off_icon : images.toggle_on_icon} onPress={toggle_switch} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  }
});

export default Body;
