import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { colors } from '../../constants/Colors';
import Iconic from '../ui/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../constants/Images';
import DropDownPicker from 'react-native-dropdown-picker';

const { width, height } = Dimensions.get('window');


const Nearby = ({ location }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext)
    const {
        getAvailableDonor,
        availableDonors,
        getRequesters,
        getUrgentRequesters,
        urgentRequesters,
        requesters,
        getDonorsByBlood,
        availableDonorsByBlood
    } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'A+', value: 'A+' },
        { label: 'B+', value: 'B+' },
        { label: 'A-', value: 'A-' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
    ]);
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;

    useEffect(() => {
        const getDonors = async () => {
            await getAvailableDonor();
        }
        setInterval(() => { getDonors() }, 10000);

    }, []);

    useEffect(() => {
        const getRequests = async () => {
            await getRequesters();
        }
        setInterval(() => { getRequests() }, 10000);
    }, []);

    useEffect(() => {
        const getUrgentRequests = async () => {
            await getUrgentRequesters();
        }
        setInterval(() => { getUrgentRequests() }, 10000);
    }, []);


    useEffect(() => {
        if(value != null ){
            const getDonorsByBloodGroup = async () => {
                await getDonorsByBlood(value);
            }
            getDonorsByBloodGroup();
        }
    }, [value]);


    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={[styles.dropdown, open ? {borderRadius:20} : {borderRadius:100}]}
                    placeholder='Filter By Blood Group'
                    maxHeight={400}
                    onChangeValue={(value) => setValue(value)}
                />
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: location != null && location.latitude,
                    longitude: location != null && location.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
                }}
            >
                {

                    location != null &&
                    (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            pinColor={colors.blue}
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.callOutView}>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="person" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.name}</Text>
                                        </View>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="call" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.phone}</Text>
                                        </View>
                                        <View style={styles.calloutItemContainer}>
                                            <Iconic name="water" size={18} color={colors.red} />
                                            <Text style={styles.text}>{user.bloodgroup}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    )
                }



                {
                    urgentRequesters && urgentRequesters.map((requester, i) => {

                        if (requester.sender_location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: requester.sender_location.latitude,
                                        longitude: requester.sender_location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    // image={images.wireless_gif_icon}
                                    pinColor={colors.red}
                                    key={i * i}
                                    onPress={() => {
                                        navigation.navigate('RequesterDetail', { requester });
                                    }}
                                >
                                    <View style={{width:70,height:70}}>
                                    <Image source={images.wireless_gif_icon} resizeMode='contain' style={{width:'100%', height:'100%'}}/>
                                    </View>
                                </Marker>

                            );
                        }


                    })
                }

                {
                    requesters && requesters.map((requester, i) => {

                        if (requester.sender_location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: requester.sender_location.latitude,
                                        longitude: requester.sender_location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    // image={images.red_flag_icon}
                                    pinColor={colors.red}
                                    key={i * i}
                                    onPress={() => {
                                        navigation.navigate('RequesterDetail', { requester });
                                    }}
                                />

                            );
                        }


                    })
                }

                {
                    availableDonors && availableDonors.map((donor, i) => {

                        if (donor.email != user.email && donor.location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: donor.location.latitude,
                                        longitude: donor.location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    // image={images.green_flag_icon}
                                    pinColor={colors.green}
                                    key={i * i}
                                    onPress={() => {
                                        navigation.navigate('DonorDetail', { donor });
                                    }}
                                />

                            );
                        }


                    })
                }

                {
                    availableDonorsByBlood && availableDonorsByBlood.map((donor, i) => {

                        if (donor.email != user.email && donor.location.latitude != "") {
                            return (
                                <Marker
                                    coordinate={{
                                        latitude: donor.location.latitude,
                                        longitude: donor.location.longitude,
                                        latitudeDelta: LATITUDE_DELTA,
                                        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
                                    }}
                                    // image={images.green_flag_icon}
                                    pinColor={colors.green}
                                    key={i * i}
                                    onPress={() => {
                                        navigation.navigate('DonorDetail', { donor });
                                    }}
                                />

                            );
                        }


                    })
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    filterContainer: {
        height: 70,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal:30,
        backgroundColor:colors.red_100,

    },
    map: {
        width: width,
        // height: '100%'
        flexGrow: 1,
        zIndex:-1,
    },
    dropdown:{
        borderColor:colors.white,
        borderWidth:2,
    },
    callOutView: {
        elevation: 2,
        borderRadius: 15,
        color: colors.black,
        position: 'relative',
        marginBottom: 10,
        backgroundColor: colors.white,
        padding: 10,
    },

    calloutItemContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    text: {
        color: colors.black,
        marginLeft: 10,
    }
});

export default Nearby

