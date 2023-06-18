import { ScrollView, StyleSheet, Text, View, Image, SafeAreaView, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/authprovider'

export default function Login({navigation}) {
    const [emailval, setemail] = useState('')
    const [pass, setPass] = useState('')
    let {login} = useContext(AuthContext)
    const handlesignup = () => {
        console.log("hihiiihi");
        navigation.navigate('signup')
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView  behavior="padding">
        <ScrollView>
            <View style={styles.con1}>
                <View>
                    <Image style={styles.img} source={require('../assets/login.jpg')}></Image>
                    <View style={styles.conn}>
                        <Text style={styles.headerText}>Log In</Text>
                    </View>
                </View>
            </View>
            <View style={styles.inputArea}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={emailval}
                        autoCapitalize='none'
                        placeholder="Email"
                        onChangeText={val => setemail(val)}
                        
                    />
                    <TextInput
                        style={styles.input}
                        value={pass}
                        placeholder="Password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={val => setPass(val)}
                    />
                </View>
                

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={()=>{login(emailval, pass)}}>
                        <Text style={styles.button}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={()=>{handlesignup()}}>
                        <Text style={styles.button}>
                            Sign up
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
        height: 500,
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