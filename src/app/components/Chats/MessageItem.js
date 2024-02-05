import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/Colors';
import { images } from '../../constants/Images';
import { AuthContext } from '../../api/AuthContentApi';
import { useNavigation } from '@react-navigation/native';

const MessageItem = ({ date, message, sender_id, receiver_id }) => {
    const navigation = useNavigation();
    const {
        user,
        getUserById,
    } = useContext(AuthContext);
    const [sender, setSender] = useState(null);
    const [receiver, setReceiver] = useState(null);

    const getReceiver = async () => {
        try {
            const get_receiver = await getUserById(receiver_id);
            setReceiver(get_receiver);
        } catch (error) {
            console.log(error);
        }
    }

    const getSender = async () => {
        try {
            const get_sender = await getUserById(sender_id);
            setSender(get_sender);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReceiver();
        getSender();
    }, []);

    return (
        
        receiver != null && sender_id  == user.id ?
        <TouchableOpacity style={styles.threadContainer} onPress={() => navigation.navigate('ChatScreen', {sender:sender, receiver:receiver})}>
            <View style={styles.avatarContainer}>
                {
                    receiver.image ? <Image source={{ uri: receiver.image }} style={styles.avatar} />
                        : <Image source={images.user_default_icon} style={styles.avatar} />
                }
            </View>
            <View style={styles.infoContainer}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.name, styles.text]}>{receiver.name}</Text>
                    <Text style={[styles.text, styles.date]}>{date}</Text>
                </View>
                <Text style={[styles.text, styles.message]}>{message}</Text>
            </View>
        </TouchableOpacity>
        : sender != null && receiver_id  == user.id ?
        <TouchableOpacity style={styles.threadContainer} onPress={() => navigation.navigate('ChatScreen', {sender:receiver, receiver:sender})}>
        <View style={styles.avatarContainer}>
            {
                sender.image ? <Image source={{ uri: sender.image }} style={styles.avatar} />
                    : <Image source={images.user_default_icon} style={styles.avatar} />
            }
        </View>
        <View style={styles.infoContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.name, styles.text]}>{sender.name}</Text>
                <Text style={[styles.text, styles.date]}>{date}</Text>
            </View>
            <Text style={[styles.text, styles.message]}>{message}</Text>
        </View>
    </TouchableOpacity>
    :
    <View></View>
    );
}

const styles = StyleSheet.create({
    threadContainer: {
        height: 80,
        borderBottomWidth: .2,
        borderColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: 100,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 100,
    },
    infoContainer: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: 10,
        flexGrow: 1,
    },
    text: {
        color: colors.black,
        fontFamily: 'Roboto-Regular'
    },
    name: {
        fontSize: 18,
    },
    date: {
        fontSize: 14,
        color: colors.grey_100,
        marginRight: 10,
    },
    message: {
        fontSize: 14,
        color: colors.grey_200
    }

})

export default MessageItem

