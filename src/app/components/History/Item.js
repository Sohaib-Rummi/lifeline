import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { colors } from '../../constants/Colors'
import { AuthContext } from '../../api/AuthContentApi'
const Item = ({ item }) => {
    const {getUserById, user} = useContext(AuthContext);
    const [donor, setDonor] = useState(null);
    const [applicant, setApplicant] = useState(null)

    const getDonor = async () => {
        try {
            const get_donor = await getUserById(item.donor_id);
            if(get_donor){
                setDonor(get_donor);
            }

        } catch (error) {
            console.log("Get Donor Error", error);
        }
    }

    const getApplicant = async () => {
        try {
            const get_appli = await getUserById(item.id);
            if(get_appli){
                setApplicant(get_appli);
            }

        } catch (error) {
            console.log("Get Appl Error", error);
        }
    }

    useEffect(() => {
        getDonor();
        getApplicant();
    }, [])



    return (
        donor != null && applicant != null && <View style={styles.container}>
            <View style={styles.avatarContainer}>
            {
               <Image source={{uri: user.image }} style={styles.avatar} />
            }
            </View>
            <View style={styles.textContainer}>
                {
                    
                        user.id == item.id ? 
                        <Text style={styles.text}>{`You accepted blood from @${donor.name}`}</Text> 
                        : <Text style={styles.text}>{`You donated blood to @${donor.name}`}</Text>
                    
                }
            </View>
            <View style={styles.avatarContainer}>
            {
                <Image source={{uri: item.donor_id == user.id ? applicant.image : donor.image}} style={styles.avatar} />
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        borderBottomWidth: .5,
        borderColor: colors.grey,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.grey,
        overflow:'hidden'
    },
    avatar:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    textContainer:{
        flexBasis:200,
        paddingHorizontal:10,
    },
    text:{
        color:colors.grey_200
    }
})

export default Item

