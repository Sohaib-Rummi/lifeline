import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react'
import { colors } from '../../../constants/Colors';
import Iconic from '../../../components/ui/Icons/Icons';
import { getFormatedDate } from '../../../utils/Functions';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../api/AuthContentApi';
import { bloodrequests } from '../../../database/Collections';

const ItemContent = ({ icon, style, text }) => {
    return (
        <View style={[style && style, { flexDirection: 'row', alignItems: 'center' }]}>
            <Iconic name={icon} size={22} color={colors.red} />
            <Text style={[styles.text, { fontSize: 16, fontFamily: 'Roboto-Regular', marginLeft: 10, }]}>{text}</Text>
        </View>
    );
}

const Button = ({ text, onPress, style, loading }) => {
    return (
        <TouchableOpacity style={[styles.button, style && style]} onPress={() => { onPress() }}>
        {
            loading ? <ActivityIndicator size={"small"} color={colors.red_50}/>
            : <Text style={styles.buttonText}>{text}</Text>
        }
            
        </TouchableOpacity>
    );
}


const Item = ({ request, sender_component }) => {
    const navigation = useNavigation();
    const {
        user,
        getUserById
    } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnMapPress = () => {
        navigation.navigate('Map', { location: request.sender_location });
    }

    const handleOnMessagePress = async (requester_id) => {
        try {
            const reciever = await getUserById(requester_id);
            if (reciever) {
                navigation.navigate('ChatScreen', { sender: user, receiver: reciever });
            }
        } catch (error) {
            console.log("Get user by id at : Tabs/RequestItem.js", error);
        }
    }

    const handleOnCancelPress = async (request_id) => {
        try {
            setIsLoading(true);
            const  querySnapshot = await bloodrequests.where('request_id', '==', request_id).get();
            if(querySnapshot.size > 0){
                querySnapshot.forEach(async documentSnapshot => {
                    const doc_id = documentSnapshot.id;
                    if(doc_id){
                        await bloodrequests.doc(doc_id).update({ 
                            requestStatus:0,
                        }).then(() => {
                            console.log("Request Update")
                            setIsLoading(false);
                        }).catch((err) => {
                            setIsLoading(false);
                            console.log("Request Update Error", err)
                        })
                    }
                })
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Find Request Error", error);
        }
    }

    const handleOnAcceptPress = async (request_id) => {
        try {
            setIsLoading(true);
            const  querySnapshot = await bloodrequests.where('request_id', '==', request_id).get();
            if(querySnapshot.size > 0){
                querySnapshot.forEach(async documentSnapshot => {
                    const doc_id = documentSnapshot.id;
                    if(doc_id){
                        await bloodrequests.doc(doc_id).update({ 
                            request_approved:1,
                        }).then(() => {
                            console.log("Request Update")
                            setIsLoading(false);
                        }).catch((err) => {
                            setIsLoading(false);
                            console.log("Request Update Error", err)
                        })
                    }
                })
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Find Request Error", error);
        }
    }

    return (
        <View style={styles.itemContainer} key={request.request_id}>
            <View style={styles.itemContentConatiner}>
                <ItemContent
                    icon={"person"}
                    text={request.name}
                />
                <ItemContent
                    icon={"call"}
                    text={request.phone}
                />

            </View>
            <View style={[styles.itemContentConatiner, { marginTop: 10 }]}>
                <ItemContent
                    icon={"water"}
                    text={`Blood ${request.blood_group}`}
                />
                <ItemContent
                    icon={"calendar"}
                    text={
                        request.hasOwnProperty('required_date') ?
                            `${getFormatedDate(new Date(request.required_date), "WWW MMM DD")}` :
                            `${getFormatedDate(new Date(request.createdAt.toDate()), "WWW MMM DD")}`
                    }
                />
            </View>
            <View style={styles.locationConatiner}>
                <Iconic name={"location"} size={24} color={colors.red}/>
                <Text style={[styles.text, {flex:1}]}>{request.sender_address}</Text>
            </View>
            {
                sender_component && sender_component === "send" ?
                <View style={[styles.itemContentConatiner, { marginTop: 20, justifyContent: 'center', alignItems:'center' },]}>
                    <Button 
                    text="Cancel" 
                    style={{paddingHorizontal:100}} 
                    onPress={() => handleOnCancelPress(request.request_id)}
                    loading={isLoading} 
                    />
                </View> : sender_component && sender_component === "recieve" ?
                <View style={[styles.itemContentConatiner, { marginTop: 20, justifyContent: 'center', alignItems:'center' },]}>
                    <Button 
                    text="Accept" 
                    style={{paddingHorizontal:100}} 
                    onPress={() => handleOnAcceptPress(request.request_id)}
                    loading={isLoading} 
                    />
                </View> :
                <View style={[styles.itemContentConatiner, { marginTop: 20, justifyContent: 'space-around' },]}>
                    <Button text="Location" onPress={handleOnMapPress} />
                    <Button text="Message" onPress={() => handleOnMessagePress(request.id)} />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        shadowColor: 'rgba(0,0,0,0.8)',
        elevation: 2,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    text: {
        color: colors.grey_200,
    },
    itemContentConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationConatiner:{
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        paddingRight:5,
    
    },
    button: {
        backgroundColor: colors.red_100,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    }

})

export default Item;

