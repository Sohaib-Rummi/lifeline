import React, { useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardScreen from '../screens/OnBoard/OnBoardScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import { colors } from '../constants/Colors';
import { AuthContext } from '../api/AuthContentApi';
const Stack = createStackNavigator();
const AuthStack = () => {
  const { isAppFirstLaunched, checkIsAppFirstLaunched } = useContext(AuthContext);
 
  useEffect(() => {
    checkIsAppFirstLaunched();
  }, []);

  return (
    isAppFirstLaunched != null && (
    <Stack.Navigator>

      {
        isAppFirstLaunched && (<Stack.Screen
          name="OnBoardScreen"
          component={OnBoardScreen}
          options={{
            headerShown: false,
          }}
        />) 
      }

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.red_100,
          },
          headerTintColor: colors.white,
          headerTitle: "Sign Up"
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.red_100,
          },
          headerTintColor: colors.white,
          headerTitle: "Forgot Password"
        }}
      />
    </Stack.Navigator>
    )
  );
}

export default AuthStack;
