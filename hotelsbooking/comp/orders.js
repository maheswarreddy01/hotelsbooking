import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from '@rneui/themed';
import { getOrders } from '../firebase/firebasequerying';
import { AuthContext } from '../auth/authprovider';

const DATAimage = {
    "Comfort sutes": require('../assets/comfort.jpeg'),
    "Rodeway inn": require('../assets/rodeway.jpeg'),
    "Holiday Inn": require('../assets/holiday.jpeg'),
    // img02n: require('../assets/icons/img02n.png'),
    // img03d: require('../assets/icons/img03d.png'),
    // img03n: require('../assets/icons/img03n.png'),
    // img04d: require('../assets/icons/img04d.png'),
    // img04n: require('../assets/icons/img04n.png'),
    // img09d: require('../assets/icons/img09d.png'),
    // img09n: require('../assets/icons/img09n.png'),
    // img10d: require('../assets/icons/img10d.png'),
    // img10n: require('../assets/icons/img10n.png'),
    // img13d: require('../assets/icons/img13d.png'),
    // img13n: require('../assets/icons/img13n.png'),
    // img50d: require('../assets/icons/img13d.png'),
    // img50n: require('../assets/icons/img13n.png'),
};

const Orders = () => {
    const { user } = useContext(AuthContext)
    const [data, setDate] = useState()
    const [datac, setDatec] = useState()
    
    useEffect(() => {
        getOrders(user.uid, (val) => {
            
            const today = new Date();
            upcoming = []
            pas = []
            val.map((m) => {
                if(new Date(m.data.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)){
                    console.log('coming11', m);
                    pas.push(m)
                }
                else{
                    console.log('coming22', m);
                    upcoming.push(m)
                }
            })
            setDate(upcoming)
            setDatec(pas)
            console.log("orders", data);
        })
    },[])
    return (
        <ScrollView>
            <View>
                <Text style={styles.sideheaders}>Up Coming 🌃</Text>
                {
                    data?.map((item, index) => {
                        let date = item.data.date.split(' ')[1] + ' ' + item.data.date.split(' ')[2] +', ' +item.data.date.split(' ')[3]
                        return (
                            <Card key={index} containerStyle={{ height: 130 }}>
                                <View >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: 100, width: '50%' }} source={DATAimage[item.hotel]} />
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 8 }}>{item?.hotel}</Text>
                                            <Text style={{ color: 'red', fontWeight: 'bold' }}>{item?.data?.price} $</Text>
                                            <Text style={{fontWeight:'bold'}}>CheckIn: {date}</Text>
                                            <Text style={{fontWeight:'bold'}}>Room Type: {item?.data?.type}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    })
                }
            </View>

            <View>
                <Text style={styles.sideheaders}>Completed 🌃</Text>
                {
                    datac?.map((item, index) => {
                        let date = item.data.date.split(' ')[1] + ' ' + item.data.date.split(' ')[2] +', ' +item.data.date.split(' ')[3]
                        return (
                            <Card key={index} containerStyle={{ height: 130 }}>
                                <View >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ height: 100, width: '50%' }} source={DATAimage[item.hotel]} />
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 8 }}>{item?.hotel}</Text>
                                            <Text style={{ color: 'red', fontWeight: 'bold' }}>{item?.data?.price} $</Text>
                                            <Text style={{fontWeight:'bold'}}>CheckIn: {date}</Text>
                                            <Text style={{fontWeight:'bold'}}>Room Type: {item?.data?.type}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default Orders

const styles = StyleSheet.create({
    sideheaders: {
        padding: 15,
        fontSize: 15,
        fontWeight: 500,
    }
})