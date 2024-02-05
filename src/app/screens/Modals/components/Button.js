import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { colors } from '../../../constants/Colors'
import { AuthContext } from '../../../api/AuthContentApi';
const Button = ({onPress, style, text}) => {
    const {isLoading} = useContext(AuthContext)
    return (

        <TouchableOpacity style={[styles.buttonContainer, style && {...style}]} onPress={() => onPress && onPress()}>
        {
            isLoading ? <ActivityIndicator size="small" color={colors.red_50} /> 
            : <Text style={styles.button}>{ text ? text  : 'Save'}</Text>
        }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:100,
        marginTop:20,
        zIndex:-1,
        backgroundColor:colors.red,

    },
    button:{
        fontFamily:'Roboto-Regular',
        fontSize:18,
        color:colors.white
    }
})

export default Button

