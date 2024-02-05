import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../constants/Colors'
const Title = ({title}) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop:30,
    },
    title:{
        color:colors.red,
        fontFamily:'Kalam-Regular',
        fontSize:24,
    },
})

export default Title

