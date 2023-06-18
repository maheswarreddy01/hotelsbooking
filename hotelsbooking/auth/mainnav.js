import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
// import AuthContext from '../auth/authprovider'
// import { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Login from '../comp/Login'
import Auth from '../auth/auth';
import { AuthContext } from '../auth/authprovider';
import AppScreens from '../auth/appScreens'

const Mainnav = () => {
    const {loginTokens} = useContext(AuthContext)

  // let {loginTokens} = useContext(AuthContext)
  return (
      <>
      <NavigationContainer>
      {loginTokens? < AppScreens />: <Auth/>}
      {/* <Auth /> */}
      </NavigationContainer>
    </>
  )
}

export default Mainnav

const styles = StyleSheet.create({})