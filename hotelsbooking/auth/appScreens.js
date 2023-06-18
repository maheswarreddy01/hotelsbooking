import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 

import React from 'react'
import Home from '../comp/home';
import Orders from '../comp/orders';
import Setting from '../comp/setting';
import Hoteldetail from '../comp/hoteldetail';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavogation = () => {
    return(
    <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} options={{
            title: 'Hotels.com',
            headerTitleStyle: {
                color: '#fff',
                fontSize: 24,
            },
            headerStyle: {
                backgroundColor: '#7CC6FE',
            },
        }} />
        <Stack.Screen
            name="detail" component={Hoteldetail} options={{
                title: 'Hotel detail',
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 24,
                },
                headerStyle: {
                    backgroundColor: '#7CC6FE',
                },
            }}
        />
    </Stack.Navigator>
    )
}

const AppScreens = () => {
    return (
        <>
            <Tab.Navigator >
                <Tab.Screen name="/" component={StackNavogation} options={{
                    title: 'Back',
                    headerTitleStyle: {
                        color: '#fff',
                        fontSize: 24,
                    },
                    headerStyle: {
                        backgroundColor: '#7CC6FE',
                    },headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return (
                          <Ionicons
                            name="md-home"
                            size={24}
                            color={tabInfo.focused ? "#7CC6FE" : "#8e8e93"}
                          />
                        );
                      },
                }} />
                <Tab.Screen name="Orders" component={Orders} options={{
                    title: 'Orders',
                    headerTitleStyle: {
                        color: '#fff',
                        fontSize: 24,
                    },
                    headerStyle: {
                        backgroundColor: '#7CC6FE',
                    },
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialIcons name="shopping-bag" size={24} color={tabInfo.focused ? "#7CC6FE" : "#8e8e93"} />
                          
                        );
                      },
                }} />
                <Tab.Screen name="Settings" component={Setting} options={{
                    title: 'Settings',
                    headerTitleStyle: {
                        color: '#fff',
                        fontSize: 24,
                    },
                    headerStyle: {
                        backgroundColor: '#7CC6FE',
                    },
                    tabBarIcon: (tabInfo) => {
                        return (
                          <Ionicons
                            name="ios-settings"
                            size={24}
                            color={tabInfo.focused ? "#7CC6FE" : "#8e8e93"}
                          />
                        );
                      },
                }} />

            </Tab.Navigator>

        </>

    )
}

export default AppScreens

const styles = StyleSheet.create({})