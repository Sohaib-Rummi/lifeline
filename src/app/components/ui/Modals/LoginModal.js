import React, {useContext} from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import { AppContext } from '../../../api/AppContentApi';
import { AuthContext } from '../../../api/AuthContentApi';
const LoginModal = ({visible, animation, transparent}) => {

  const {setModalVisible} = useContext(AppContext);
  const {logout} = useContext(AuthContext);
    return (
    <View style={globalStyles.wrapper}>
      <Modal
        visible={visible}
        animationType={animation}
        transparent={transparent}
      >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
            <Text style={styles.modalMessage}>Do you want to logout?</Text>
            <View style={styles.modalButton}>
                <TouchableOpacity style={[styles.button, styles.logout]} onPress={
                    () => {
                        logout();
                        setModalVisible(false);
                    }
                }>
                    <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        setModalVisible(false);
                    }
                }>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:20,
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    modalBox:{
        width:'100%',
        height:200,
        elevation:3,
        backgroundColor:colors.white,
        borderRadius:15,
        paddingVertical:30,
        paddingHorizontal:20,
        justifyContent:'space-between',
    },
    modalMessage:{
        fontFamily:'Roboto-Regular',
        fontSize:20,
        color:colors.black,
        textAlign:'center',
        marginTop:15,
    },
    modalButton:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    button:{
        width:'48%',
        height:50,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:3,
        backgroundColor:colors.white,
    },
    logout:{
        backgroundColor:colors.red,
    },
    buttonText:{
        color:colors.black,
        fontSize:16,
    },
    logoutText:{
        color:colors.white,
    }


});

export default LoginModal

