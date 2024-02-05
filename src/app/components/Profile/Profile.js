import React, { useContext } from 'react'
import { ScrollView } from 'react-native';
import Header from '../Home/Header';
import Body from './Body';
import LoginModal from '../ui/Modals/LoginModal';
import { AppContext } from '../../api/AppContentApi';
const Profile = () => {
  const {modalVisible} = useContext(AppContext)
  return (
    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
        <LoginModal visible={modalVisible} animation={'fade'} transparent={true} />
        <Header />
        <Body/>
    </ScrollView>
  )
}

export default Profile
