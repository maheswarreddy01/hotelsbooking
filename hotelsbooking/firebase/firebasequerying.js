// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseCreds";
import { getDatabase, onValue, push, ref, set, orderByChild } from "firebase/database"
import { getAuth } from 'firebase/auth'

// Initialize Firebase
export const initializeDb = initializeApp(firebaseConfig);

export const firebaseAUth = getAuth(initializeDb)

export const writeData = (data) => {
    const db = getDatabase()
    const refr = ref(db, `hotels`)
    push(refr, data)
}

export const getData = (updatefunc) => {
    const db = getDatabase()
    const refr = ref(db, `hotels/`)
    onValue(refr, (snap) => {
        if (snap.val()) {
            const valobj = snap.val()
            var arr = []
            Object.keys(valobj).map((key, indx) => {
                arr.push({ ...valobj[key], id: key })
            })
            updatefunc(arr)
        }
        else {
            updatefunc([])
        }

    })
}

export const writeOrders = (user, hotel, data) => {
    console.log(data);
    const db = getDatabase()
    const refr = ref(db, `orders/` + user + '/' + hotel)
    push(refr, data)
    console.log(data);
}

export const writeAvailability = (hotel, type, number, date, id) => {
    console.log(String(new Date()).split(' ')[1]);
    const db = getDatabase()
    
    const refr = ref(db, `availability/` + hotel + '/' + String(new Date(date)).split(' ')[1] + ' ' + String(new Date(date)).split(' ')[2] + ', ' + String(new Date(date)).split(' ')[3] + '/' + type)
    set(refr, number)
}



export const getDataForAvailability = (hotel, type, updatefunc) => {
    const db = getDatabase()
    const refr = ref(db, `availability/` + hotel + '/' + String(new Date()).split(' ')[1] + ' ' + String(new Date()).split(' ')[2] + ', ' + String(new Date()).split(' ')[3] + '/' + '/' + type)
    onValue(refr, (snap) => {
        if (snap.val()) {
            const valobj = snap.val()
            
            updatefunc(valobj)
        }
        else {
            updatefunc([])
        }

    })
}


export const getOrders = (user, updatefunc) => {
    const db = getDatabase()
    const refr = ref(db, `orders/` + user + '/')
    onValue(refr, (snap) => {
        if (snap.val()) {
            const valobj = snap.val()
            var arr = []
            Object.keys(valobj).map((key, indx) => {
                arr.push({ ...valobj[key], id: key })
            })
            var arr2 = []
            arr.forEach((val) => {
                let dataarr = []
                Object.entries(val).forEach((v) => {
                    if (v[0] != 'id') {
                        arr2.push({ data: v[1], hotel: val.id })
                    }
                });
                //  arr2.push(dataarr)
            })
            updatefunc(arr2)
        }
        else {
            updatefunc([])
        }

    })
}