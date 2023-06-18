import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../comp/Login';
import Signup from '../comp/signup';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      </Stack.Navigator>
  )
}

export default Auth

const styles = StyleSheet.create({})