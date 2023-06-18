import { StyleSheet, View,Text, Image, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Orders from './orders';
// import { Tab, Text, TabView } from '@rneui/themed';
import { TabView, SceneMap } from 'react-native-tab-view';
import { AuthContext } from '../auth/authprovider';

const Setting = () => {
  
 const {logout, user} = useContext(AuthContext)
   const handleCalButton = () =>{

    }
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Profile' },
      { key: 'second', title: 'Orders' },
    ]);

    const FirstRoute = () => (
            <View style={{ alignItems: 'center', padding: 10 }}>
                <View style={{ borderRadius: "50%" }}>
                    <Image style={{ borderRadius: 50, height: 100, width: 100, }} source={require('../assets/img2.jpeg')} />
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.displayName}</Text>

                    
                </View>
            <TouchableOpacity style={{marginTop:20}} onPress={() =>{logout()}}>
                <Text style={styles.button}>
                    Log Out
                </Text>
            </TouchableOpacity>
            </View>
      );
      
      const SecondRoute = () => (
        <Orders />
      );
      
      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });


    return (
            <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
    )
}

export default Setting

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#7CC6FE',
        color: '#FFFF',
        fontSize: 20,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        fontWeight: 600,
        fontFamily: 'Cochin',
        marginRight: 15
    },
    buttonCon: {
        marginTop: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})