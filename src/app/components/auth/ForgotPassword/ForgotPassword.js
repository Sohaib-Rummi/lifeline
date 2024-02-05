import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';
import { AuthContext } from '../../../api/AuthContentApi';
const ForgotPassword = ({ navigation }) => {
    const {
        forgotPassword,
        error,
        setError,
        message,
        setMessage
    } = useContext(AuthContext);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        let interval = null;
        if (message) {
            interval = setTimeout(() => {
                setMessage(null);
                navigation.navigate('LoginScreen');
            }, 2000)
        }
        return () => {
            clearTimeout(interval);
        }
    }, [message]);

    useEffect(() => {
        let interval = null;
        if (error) {
            interval = setTimeout(() => {
                setError(null);
            }, 5000)
        }
        return () => {
            clearTimeout(interval);
        }
    }, [error]);



    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
            <View style={[globalStyles.authHeadingContainer, { paddingTop: 40 }]}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Forgot Password</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Please enter your email address. You will receive a link to create a new password via email
                </Text>
            </View>
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
            <View style={[globalStyles.authInputContainer, { marginBottom: 0 }]}>
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor={colors.grey_100}
                    cursorColor={colors.black}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={[globalStyles.authButtonContainer, { marginTop: 0 }]}>
                <Button text="Send" onPress={() => forgotPassword(email)} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        textAlign: 'center',
        color: colors.grey_50,

    }

})

export default ForgotPassword;
