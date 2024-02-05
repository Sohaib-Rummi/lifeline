import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../constants/Style';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from './components/Button';
import Title from './components/Title';
import { AuthContext } from '../../api/AuthContentApi';

const BloodGroup = ({navigation}) => {
    const {
        updateProfile,
        error,
        message,
        setMessage,
        setError,
    } = useContext(AuthContext);
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


    useEffect(()=>{
        if(message){
            setTimeout(() => {
                setMessage(null);
                navigation.goBack();
            }, 3000)
        }
    }, [message]);

    useEffect(()=>{
        if(error){
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    }, [error]);

    return (
        <View style={[globalStyles.wrapper, { paddingHorizontal: 20, }]}>
            <Title title="Your Blood Group" />
            {
                message && <View style={[globalStyles.errorContainer, { backgroundColor: '#b2f6a2' }]}>
                    <Text style={[globalStyles.error, { color: '#31ba12' }]}>{message}</Text>
                </View>
            }
            {
                error && <View style={globalStyles.errorContainer}>
                    <Text style={globalStyles.error}>{error}</Text>
                </View>
            }
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='Select Blood Group'
                style={styles.dropdown}
                maxHeight={400}
                onChangeValue={(value) => setValue(value)}
            />
            <Button onPress={() => updateProfile('Blood Group', 'bloodgroup', value)} />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 30,
    },

})

export default BloodGroup
