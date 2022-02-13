// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'

import {
    getAuth,
    browserSessionPersistence,
    setPersistence,
} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    authDomain: 'pando-5ec96.firebaseapp.com',

    projectId: 'pando-5ec96',

    storageBucket: 'pando-5ec96.appspot.com',

    messagingSenderId: '1042949035924',

    appId: '1:1042949035924:web:eafa8f20b2fbec49d72181',

    measurementId: 'G-E819SQL65Y',

    databaseURL:
        'https://pando-5ec96-default-rtdb.europe-west1.firebasedatabase.app/',
}

// Initialize Firebase

export const app = initializeApp(firebaseConfig)

setPersistence(getAuth(), browserSessionPersistence)

// Initialize Cloud Firestore through Firebase

export const db = getFirestore(app)
