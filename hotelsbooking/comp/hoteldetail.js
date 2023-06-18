import { StyleSheet, Text, View, ScrollView, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Card } from '@rneui/themed';
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Input } from 'react-native-elements';
import { AuthContext } from '../auth/authprovider';
import { getDataForAvailability, writeAvailability, writeOrders } from '../firebase/firebasequerying';
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



const Hoteldetail = ({ route, navigation }) => {
    const { user } = useContext(AuthContext)
    let data = route.params.item
    const [price, setPrice] = useState(0)
    const [roomnumber, setRoomnumber] = useState(0)
    const [roomtype, setRoomtype] = useState('')
    const [nqqa, setnqqa] = useState(0)
    const [nk1, setNk1V] = useState(0)
    const [nk, setNkV] = useState(0)
    let dic = {
        nk: '',
        nk1: '',
        nqq: ''
    }
    let color = "#E97451"
    let [colors, setcolors] = useState({
        color1: "#7CC6FE",
        color2: "#7CC6FE",
        color3: "#7CC6FE",
    })
    const [inputDate, setInputDate] = React.useState(undefined)
    const handleCalButton = () => {
        let numbersroom11 = 0
        if (roomtype == 'nqq')
            numbersroom11 = data.roomtype - nqqa
        if (roomtype == 'nk')
            numbersroom11 = data.roomtype - nk
        if (roomtype == 'nk1')
            numbersroom11 = data.roomtype - nk1
        if (roomnumber != 0 && inputDate != undefined && roomtype && numbersroom11 !=0 ) {

            let final = {
                'numberOfRooms': roomnumber,
                'price': price * roomnumber,
                'date': String(inputDate),
                'type': roomtype
            }
            writeOrders(user.uid, data.id, final)
            let numbersroom = 0
            if (roomtype == 'nqq')
                numbersroom = Number(roomnumber) + Number(nqqa)
            if (roomtype == 'nk')
                numbersroom = Number(roomnumber) + Number(nk)
            if (roomtype == 'nk1')
                numbersroom = Number(roomnumber) + Number(nk1)
                console.log(numbersroom, 'checking');
            writeAvailability(data.id, roomtype, numbersroom, inputDate)
            alert("Reservation is confirmed")
            navigation.navigate('Orders')
        }
        else {
            console.log(roomtype, inputDate);
            alert('Please select all the details')
        }
    }

    const handleTypeSelection = (id) => {

        if (id == 1) {
            setcolors({
                color1: "#E97451",
                color2: "#7CC6FE",
                color3: "#7CC6FE",
            })
            setPrice(data.nk)
            setRoomtype('nk')
        }
        else if (id == 2) {
            setcolors({
                color1: "#7CC6FE",
                color2: "#E97451",
                color3: "#7CC6FE",
            })
            setPrice(data.nqq)
            setRoomtype('nqq')
        }
        else if (id == 3) {
            setcolors({
                color1: "#7CC6FE",
                color2: "#7CC6FE",
                color3: "#E97451",
            })
            setPrice(data.nk1)
            setRoomtype('nk1')
        }
    }

    useEffect(() => {
        console.log(route.params.item)
        getDataForAvailability(data.id, 'nk', (val) => {
            if (val) {
                setNkV(val)
            }
        })
        getDataForAvailability(data.id, 'nqq', (val) => {
            if (val) {

                setnqqa(val)
            }
            console.log(val);
        })
        getDataForAvailability(data.id, 'nk1', (val) => {
            if (val) {
                setNk1V(val)

            }
        })
    }, [])

    return (
        <ScrollView>
            <View>
                <View >
                    <View style={{ flexDirection: 'row', padding: 8 }}>
                        <Image style={{ height: 100, width: '50%', borderRadius: 8 }} source={DATAimage[data.image]} />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 8 }}>{data.id}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ padding: 18 }}>
                <Text>📍 4855 28th St SE, Grand Rapids, 49512, United States of America –</Text>
                <ScrollView horizontal={true}>
                    <Card containerStyle={styles.posters1}>
                        <Image style={styles.img} source={DATAimage[data.image]}></Image>
                    </Card>
                    <Card containerStyle={styles.posters1}>
                        <Image style={styles.img} source={require('../assets/room1.webp')}></Image>
                    </Card>
                    <Card containerStyle={styles.posters1}>
                        <Image style={styles.img} source={require('../assets/image3.avif')}></Image>
                    </Card>
                    <Card containerStyle={styles.posters1}>
                        <Image style={styles.img} source={require('../assets/room2.jpeg')}></Image>
                    </Card>
                </ScrollView>

                <ScrollView horizontal={true}>
                    <Card containerStyle={styles.posters}>
                        <Text>🛜 Free WiFi</Text>
                    </Card>
                    <Card containerStyle={styles.posters}>
                        <Text>🅿️ Free parking</Text>
                    </Card>
                    <Card containerStyle={styles.posters}>
                        <Text>⏡ Bathtub</Text>
                    </Card>
                    <Card containerStyle={styles.posters}>
                        <Text>❆ Air conditioning</Text>
                    </Card>
                </ScrollView>
            </View>
            <View style={{ padding: 8 }}>
                <SafeAreaView>
                    <View style={{ justifyContent: 'center', flex: 1, width: '100%' }}>
                        <DatePickerInput
                            locale="en"
                            label="Date"
                            value={inputDate}
                            onChange={(d) => setInputDate(d)}
                            inputMode="start"
                        />
                    </View>
                </SafeAreaView>

            </View>
            <View>

                <TextInput
                    style={styles.input}
                    value={roomnumber}
                    placeholder="Enter Number of rooms"
                    onChangeText={val => setRoomnumber(val)}
                />
            </View>

            <View>
                <ScrollView>
                    <View style={{ padding: 8, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 15 }}>Room Type</Text>
                        <Text style={{ marginLeft: 30, fontWeight: 'bold', fontSize: 15 }}>Availability</Text>
                        <Text style={{ marginLeft: 60, fontWeight: 'bold', fontSize: 15 }}>Price</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleTypeSelection(1)}>

                        <Card containerStyle={[styles.posters, { borderColor: colors.color1 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 10 }}>NK</Text>
                                <Text style={{ marginLeft: 80 }}>{data.nka - nk}</Text>
                                <Text style={{ marginLeft: 110 }}>{data.nk}$</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTypeSelection(2)}>

                        <Card containerStyle={[styles.posters, { borderColor: colors.color2 }]}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={{ marginLeft: 10 }}>NQQ</Text>
                                <Text style={{ marginLeft: 80 }}>{data.nqqa - nqqa}</Text>
                                <Text style={{ marginLeft: 110 }}>{data.nqq}$</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTypeSelection(3)}>

                        <Card containerStyle={[styles.posters, { borderColor: colors.color3 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ marginLeft: 10 }}>NK1</Text>
                                <Text style={{ marginLeft: 80 }}>{data.nk1a - nk1}</Text>
                                <Text style={{ marginLeft: 110 }}>{data.nk1}$</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Your Total: {Number(price) * Number(roomnumber)}$</Text>
                    <TouchableOpacity style={{ padding: 8 }} onPress={handleCalButton}>
                        <Text style={styles.button}>
                            Proceed
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

export default Hoteldetail

const styles = StyleSheet.create({
    img: {
        height: 200,
        width: 250
    },
    posters1: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',

    },
    posters: {
        padding: 5,
        margin: 5,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        backgroundColor: "#7CC6FE"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    button: {
        backgroundColor: '#E97451',
        color: '#FFFF',
        fontSize: 20,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        fontWeight: 600,
        fontFamily: 'Cochin',
        marginRight: 15
    },
})