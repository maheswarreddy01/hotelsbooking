import { ScrollView, StyleSheet, Text, View, Image, SafeAreaView, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/authprovider'

export default function Signup({navigation}) {
    let {login, signUp} = useContext(AuthContext)
    const [emailval, setemail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    handlesignup =() => {
        if(signUp(name, emailval, pass)){
            navigation.navigate('Login')
        }
    }
    handleBack = () => {
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView>
<KeyboardAvoidingView behavior="padding">
        <ScrollView>
            <View style={styles.con1}>
                <View>
                    <Image style={styles.img} source={require('../assets/login.jpg')}></Image>
                    <View style={styles.conn}>
                        <Text style={styles.headerText}>Sign Up</Text>
                    </View>
                </View>
            </View>
            <View style={styles.inputArea}>
                <View>
                <TextInput
                        style={styles.input}
                        value={name}
                        placeholder="Name"
                        onChangeText={val => setName(val)}
                    />
                    <TextInput
                        style={styles.input}
                        value={emailval}
                        placeholder="Email"
                        onChangeText={val => setemail(val)}
                        autoCapitalize='none'

                    />
                    <TextInput
                        style={styles.input}
                        value={pass}
                        placeholder="Password"
                        onChangeText={val => setPass(val)}
                        autoCapitalize='none'
                        secureTextEntry={true}

                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={()=>{handlesignup()}}>
                        <Text style={styles.button}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={()=>{handleBack()}}>
                        <Text style={styles.button}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: 10,
        fontSize: 45,
        fontWeight: 600,
        fontFamily: 'Cochin'
    },

    conn: {
        marginTop: 450,
        width: '100%',
        height: 100,
        position: 'absolute',
        backgroundColor: "#FFFF",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        alignItems: 'center',
    },

    con1: {
        flex: 1,
        alignItems: 'center',
    },

    con2: {
        marginTop: 450,
        flex: 1,
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'gray',
    },

    img: {
        height: 480,
        width: 400
    },
    inputArea: {

        marginTop: 30,
        width: '100%'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },

    header: {

    },
    button: {
        backgroundColor: 'black',
        flex: 1,
        color: '#FFFF',
        fontSize: 20,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        fontWeight: 600,
        fontFamily: 'Cochin'
    }
})