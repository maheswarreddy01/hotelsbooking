import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { firebaseAUth } from '../firebase/firebasequerying'
import { async } from '@firebase/util'
export const AuthContext = createContext()

export const Authprovider = ({ children }) => {
  const [loginTokens, setloginToken] = useState('')
  const [user, setUser] = useState()
  const auth = firebaseAUth

  const signUp = async (name, email, pass) => {
    const auth = firebaseAUth
    try {
      const response = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err,'error'))
        alert("Account created..")
    } catch (error) {
      alert(error.message)
    }

    return true
    
  }

  const login = async (email, pass) => {
    const auth = firebaseAUth
    try {
      const response = await signInWithEmailAndPassword(auth, email, pass);
      console.log(response.user);
      setUser(response.user)
      setloginToken(response._tokenResponse.idToken)
    } catch (error) {
      console.log(error, "mahi");
      alert(error.message)
    }
  }


  const logout = () => {
    setloginToken('')
  }

  return (
    <AuthContext.Provider value={{ login, loginTokens, logout, signUp, user }}>
      {children}
    </AuthContext.Provider>
  )
}