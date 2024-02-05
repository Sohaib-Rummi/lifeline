import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { colors } from '../../constants/Colors';
import Iconic from '../ui/Icons/Icons';

const Item = ({icon, title, image, onPress}) => {
    return (
        <TouchableOpacity style={styles.profileItemcontainer} onPress={() => onPress && onPress()}>
            <Iconic name={icon} size={28} color={colors.red_200}/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles  = StyleSheet.create({
    profileItemcontainer: {
        height: 70,
        elevation: 3,
        marginTop:15,
        borderRadius:15,
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor: colors.white,
        flexWrap:'nowrap',
    },
    imageContainer:{
        width:40,
        height:40,
        overflow: 'hidden',
    },
    image:{
        width:'100%',
        height:'100%',
    },
    titleContainer:{
        height:'100%',
        paddingLeft:10,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',        
    },
    title: {
        fontFamily:'Roboto-Regular',
        color:colors.grey_200,
        fontSize:18,
    },





});


export default Item
