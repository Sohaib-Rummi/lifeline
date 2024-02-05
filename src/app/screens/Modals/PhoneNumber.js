import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style';
import Title from './components/Title';
import Button from './components/Button';
import { colors } from '../../constants/Colors';
import { AuthContext } from '../../api/AuthContentApi'

const PhoneNumber = ({navigation}) => {
  const {
    updateProfile,
    error,
    message,
    setMessage,
    setError,
    user
  } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState(null);

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
    <View style={[globalStyles.wrapper, { paddingHorizontal: 20 }]}>
      <Title title="Your Phone Number" />
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
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.defaultText}>+92</Text>
        </View>
        <View style={styles.verticalDivider}></View>
        <TextInput
          inputMode='numeric'
          value={phoneNumber}
          defaultValue={user.phone && user.phone}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder='eg:03123456789'
          placeholderTextColor={colors.grey}
          maxLength={11}
          cursorColor={colors.black}
          style={styles.input}

        />
      </View>
      <Button onPress={() => updateProfile('Phone Number', 'phone', phoneNumber)} />
    </View>
  )
}

export default PhoneNumber

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    backgroundColor: colors.white,
    height: 50,
    elevation: 3,
    borderRadius: 15,
    flexDirection: 'row',

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
    fontFamily: 'Kalam-Regular'

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
  }
})