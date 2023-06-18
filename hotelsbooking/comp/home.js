import { SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Card } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/authprovider';
import { getData } from '../firebase/firebasequerying';

const DATAimage = {
    comfort: require('../assets/comfort.jpeg'),
    rodeway: require('../assets/rodeway.jpeg'),
    holiday: require('../assets/holiday.jpeg'),
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

const Home = ({navigation}) => {
    const {user} = useContext(AuthContext)
    const [DATA, setData] = useState()
    const handleHistoryClick = (item) => {
        // console.log(id);
        navigation.navigate('detail', {item})
    }

    useEffect(() => {
        getData((val) => {
            setData(val)
        })
    },[])

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.appCon}>
                    <View>
                        <Text style={styles.header}>Hello, {user.displayName} 🫥</Text>
                    </View>
                    <View>
                        <ScrollView horizontal={true}>
                            <Card containerStyle={styles.posters}>
                                <Image style={styles.img} source={require('../assets/img2.jpeg')}></Image>
                            </Card>
                            <Card containerStyle={styles.posters}>
                                <Image style={styles.img} source={require('../assets/hotelimage1.jpeg')}></Image>
                            </Card>
                            <Card containerStyle={styles.posters}>
                                <Image style={styles.img} source={require('../assets/image3.avif')}></Image>
                            </Card>
                            <Card containerStyle={styles.posters}>
                                <Image style={styles.img} source={require('../assets/image4.jpeg')}></Image>
                            </Card>
                        </ScrollView>
                    </View>
                    <View >
                        <View >
                            <Text style={styles.sideheaders}>Near Hotels 📍</Text>
                        </View>
                        <View>
                        
                            {
                                DATA?.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id} onPress={(val) => {
                                            handleHistoryClick(item)
                                        }}>
                                            <Card >
                                                <View style={{ direction: 'row' }}>
                                                    <View >
                                                        <Image style={{ height: 100, width: '100%' }} source={DATAimage[item.image]}></Image>
                                                    </View>
                                                    <View style={{ alignItems: 'center', direction: 'row' }}>
                                                        <Text style={{fontWeight:'bold', fontSize:15, padding:8}}> {item.id}</Text>
                                                        <Text style={{fontWeight:'bold'}}> Book Now: {item.nqq} $</Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    appCon: {
        padding: 8
    },
    header: {
        fontSize: 20,
        fontWeight: 500,
    },
    img: {
        height: 200,
        width: 250
    },
    posters: {
        padding: 0,
        margin: 5

    },
    sideheaders: {
        padding: 8,
        fontSize: 15,
        fontWeight: 500,
    }
})