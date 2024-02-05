import React, { useState, useContext, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../constants/Style';
import { colors } from '../../../constants/Colors';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import Button from '../../ui/Form/Button';
import Iconic from '../../ui/Icons/Icons';
import { AuthContext } from '../../../api/AuthContentApi';
import { GoogleSigninConfiguration } from '../../../database/DB';
const Login = ({ navigation }) => {
    const { login, 
        error, 
        setError, 
        googleLogin,
        message,
        setMessage
    
    } = useContext(AuthContext);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [iconName, setIconName] = useState('eye-off-outline');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const iconHandler = () => {
        if (iconName === "eye-off-outline") {
            setIconName('eye-outline');
            setSecureTextEntry(false);
        }
        else {
            setIconName('eye-off-outline');
            setSecureTextEntry(true);
        }
    }


    useEffect(()=>{
        GoogleSigninConfiguration();
    },[]);

    useEffect(() => {
        let interval = null;
        if (message) {
            interval = setTimeout(() => {
                setMessage(null);
            }, 5000)
        }
        return () => {
            clearTimeout(interval);
        }
    }, [message]);

    useEffect(()=>{
        let interval = null;
        if(error){
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
            <View style={globalStyles.authHeadingContainer}>
                <Text style={globalStyles.authHeading}>LifeLine</Text>
                <Text style={globalStyles.authSubheading}>Login your account</Text>
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
            <View style={globalStyles.authInputContainer}>
                <Label label="Email" />
                <Input
                    autoComplete='email'
                    inputMode="email"
                    keyboardType="email-address"
                    cursorColor={colors.black}
                    placeholder="Email"
                    placeholderTextColor={colors.grey_100}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Label label="Password" />
                <Input
                    secureTextEntry={secureTextEntry}
                    cursorColor={colors.black}
                    type="password"
                    placeholder="Password"
                    placeholderTextColor={colors.grey_100}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Iconic name={iconName} size={18} color="#8c8c8c" style={{ position: 'absolute', bottom: 38, right: 40 }} onPress={() => iconHandler()} />
                <TouchableOpacity style={globalStyles.smallTextContainer} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={globalStyles.smallText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.authButtonContainer}>
                <Button text="Login" onPress={() => login(email, password)} />
            </View>
            <View style={globalStyles.divider}>
                <Text style={globalStyles.dividerText}>or</Text>
            </View>
            <View style={globalStyles.authButtonContainer}>
                <TouchableOpacity style={globalStyles.googleButton} onPress={()=>googleLogin()}>
                    <Image source={require('../../../assets/images/google.png')} style={globalStyles.googleButtonImage} resizeMode='contain' />
                    <Text style={globalStyles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.smallTextContainer, { marginTop: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                <Text style={globalStyles.smallText}>Not a member?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                    <Text style={[globalStyles.smallText, { fontWeight: 'bold', marginLeft: 2, fontSize: 14 }]}>Signup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Login
