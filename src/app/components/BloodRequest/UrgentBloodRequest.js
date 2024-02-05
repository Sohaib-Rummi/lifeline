import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { globalStyles } from '../../constants/Style';
import { colors } from '../../constants/Colors';
import Label from '../ui/Form/Label';
import Input from '../ui/Form/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../../api/AuthContentApi';
import { AppContext } from '../../api/AppContentApi';
import { ScrollView } from 'react-native-gesture-handler';
import Iconic from '../ui/Icons/Icons';
import { useNavigation } from '@react-navigation/native';
import { getTodayDate, getFormatedDate } from '../../utils/Functions';
import { validateName, validatePhoneNumber } from '../../utils/Functions';
import Toast from 'react-native-toast-message'
const UrgentBloodRequest = () => {
    const navigation = useNavigation();
    const {
        user,
        error,
        setError,
    } = useContext(AuthContext);
    const { 
        formattedAddress,
        makeUrgentBloodRequest,
        getRequestGeometryAddress,
        isLoading,
        showToast,
        setShowToast
     } = useContext(AppContext);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [isValid, setIsValid] = useState(false);
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


    const validate_fields =  () => {
        if (!validateName(name)) {
            setError('Invalid Name. Name should contain letters and whire space')
        }
        else if (!validatePhoneNumber(phone)) {
            setError('Invalid Phone Number');
        }
        else if (value === null) {
            setError("Blood Group is required")
        }
        else if (name === null) {
            setError('Name is required')
        }
        else if (phone === null) {
            setError('Phone Number is required')
        }
        else{
           setIsValid(true);
        }
    }

    useEffect(()=>{
        if(isValid){
            const requestedUserLocation = async () => {
                try {
                    const location = await getRequestGeometryAddress(formattedAddress);
                    if(location){
                        console.log(location);
                        const data = {
                            name:name,
                            phone:phone,
                            image:user.image,
                            blood_group:value,
                            sender_location:location,
                            createdAt:new Date(),
                        }
                        makeUrgentBloodRequest(data);
                        setIsValid(false);
                    }

                } catch (error) {
                    console.log("Getting Location error in blood request:", error);
                }
            }
            requestedUserLocation();
        }

    }, [isValid])


    useEffect(() => {
        if(showToast){
            Toast.show({
                type: 'success',
                text1: 'Request send successfully!',
                onHide: () => {
                    setShowToast(false);
                }
              });
        }
    }, [showToast])

    return (
        <KeyboardAvoidingView style={[globalStyles.wrapper, { paddingTop: 40 }]}>
            <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
                {
                    error && <View style={globalStyles.errorContainer}>
                        <Text style={globalStyles.error}>{error}</Text>
                    </View>
                }
                <View style={styles.inputsContainer}>
                    <Label label="Name*" style={{ color: colors.red, marginLeft: 8 }} />
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            defaultValue={user.name && user.name}
                            placeholderTextColor={colors.grey}
                            style={[styles.input, { borderWidth: 0, marginTop: 0, }]}
                        />
                    </View>
                    <Label label="Phone*" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.inputContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.defaultText}>+92</Text>
                        </View>
                        <View style={styles.verticalDivider}></View>
                        <TextInput
                            inputMode='numeric'
                            placeholder='eg:03123456789'
                            placeholderTextColor={colors.grey}
                            defaultValue={user.phone && user.phone}
                            maxLength={11}
                            cursorColor={colors.black}
                            style={styles.input}
                            value={phone}
                            onChangeText={(text) => setPhone(text)}

                        />
                    </View>
                    <Label label="Blood Required Location*" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.addressContainer}>
                        <View style={styles.address}>
                            <Text style={styles.userAddress}>{formattedAddress.substr(0, 50).concat('...')}</Text>
                        </View>
                        <TouchableOpacity style={styles.markerButton} >
                            <Iconic name="location" size={24} color={colors.red} onPress={() => {
                                navigation.navigate('Map')
                            }} />
                        </TouchableOpacity>
                    </View>
                    <Label label="Required Blood Group*" style={{ color: colors.red, marginLeft: 8, marginTop: 20 }} />
                    <View style={styles.inputContainer}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder='Select Blood Group'
                            maxHeight={150}
                            onChangeValue={(value) => setValue(value)}
                            style={styles.dropdown}
                            listMode="SCROLLVIEW"
                            dropDownDirection="Bottom"
                            dropDownContainerStyle={{
                                borderWidth: 0,
                            }}

                        />

                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => validate_fields()}>
                        {
                            !isLoading ? <Text style={styles.buttonText}>Send Request</Text>
                            : <ActivityIndicator size={"small"} color={colors.red_100}/>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    heading: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        color: colors.red,
        fontFamily: 'Kalam-Regular',
        fontSize: 26
    },
    inputsContainer: {
        paddingHorizontal: 30,


    },
    inputContainer: {
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginTop: 5,

    },
    textContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    defaultText: {
        color: colors.grey_100,
        fontSize: 18,
        fontFamily: 'Kalam-Regular',


    },
    verticalDivider: {
        height: '50%',
        width: .5,
        marginTop: 12,
        backgroundColor: colors.grey
    },
    input: {
        width: '100%',
        height: '100%',
        color: colors.black,
        paddingHorizontal: 10,
        alignItems: 'center',
        fontSize: 18,
        zIndex: -1
    },
    dropdown: {
        borderColor: colors.white,
        borderRadius: 15,
    },
    button: {
        marginBottom: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red,
        marginHorizontal: 30,
        marginTop: 40,
        borderRadius: 100,
        zIndex: -1,

    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Roboto-Regular'
    },
    addressContainer: {
        marginTop: 5,
        backgroundColor: colors.white,
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
    },
    address: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        flexWrap: 'wrap',
        width: '85%',
    },
    markerButton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAddress: {
        color: colors.grey_100,
        fontSize: 16
    },
    datContaienr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginTop: 5,
    },
    date: {
        color: colors.grey_200,
        fontSize: 16,
        fontFamily: 'Roboto-Light'

    },
    calendarContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    calendar: {
        calendarBackground: colors.white,
        selectedDayBackgroundColor: colors.red,
        selectedDayTextColor: colors.white,
        dayTextColor: colors.grey_200,
        textDisabledColor: colors.grey,
        monthTextColor: colors.black,
        textMonthFontWeight: 'bold',
        arrowColor: colors.red,
    }
});

export default UrgentBloodRequest

