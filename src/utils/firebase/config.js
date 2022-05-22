// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

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
