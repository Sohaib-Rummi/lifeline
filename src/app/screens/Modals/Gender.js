import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../constants/Style';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from './components/Button';
import Title from './components/Title';
import { AuthContext } from '../../api/AuthContentApi';

const Gender = ({navigation}) => {
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
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ]);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
                navigation.goBack();
            }, 3000)
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 5000)
        }
    }, [error]);

    return (
        <View style={[globalStyles.wrapper, { paddingHorizontal: 20, }]}>
            <Title title="Your Gender" />
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
                placeholder='Select Gender'
                style={styles.dropdown}
                maxHeight={400}
                onChangeValue={(value) => setValue(value)}
            />
            <Button onPress={() => value !== null  && updateProfile('Gender', 'gender', value)} />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 30,
    },

})

export default Gender
