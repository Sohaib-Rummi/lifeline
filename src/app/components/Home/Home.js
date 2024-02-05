import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import Header from './Header'
import Body from './Body'
import { AuthContext } from '../../api/AuthContentApi';
import AwesomeAlert from 'react-native-awesome-alerts';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  const {  profileAlert, setProfileAlert } = useContext(AuthContext);


  return (
    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
      {
        profileAlert && (
          <AwesomeAlert
            show={profileAlert}
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
              color: colors.red,
              fontFamily: 'Roboto-Bold'
            }}
            cancelButtonStyle={{
              paddingVertical: 8,
              paddingHorizontal: 25,
            }}
            confirmButtonStyle={{
              paddingVertical: 8,
              paddingHorizontal: 25,
            }}
            onCancelPressed={() => {
              setProfileAlert(false);
            }}
            onConfirmPressed={() => {
              navigation.navigate('Profile');
              setProfileAlert(false);
            }}
          />
        )
      }

      <Header />
      <Body />
    </ScrollView>
  )
}

export default Home
