import React, {useContext} from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../../constants/Colors';
import { AuthContext } from '../../../api/AuthContentApi';
const Button = ({text, onPress}) => {
    const {isLoading} = useContext(AuthContext)
    return (
        <TouchableOpacity style={styles.button} onPress={()=>onPress && onPress()}>
            {
                isLoading ? <ActivityIndicator size="small" color={colors.red_50} /> 
                : <Text style={styles.buttonText}>{text}</Text>
            }
            
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        width:'100%',
        height:'100%',
        borderRadius: 100, 
        backgroundColor: colors.red_200,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: colors.white, 
        fontSize: 22, 
        fontFamily: 'Kalam-Regular'
    },
});

export default Button;
