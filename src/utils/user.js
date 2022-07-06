import { sendEmailVerification } from 'firebase/auth'
import {
    Timestamp,
    doc,
    updateDoc,
    arrayRemove,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    getDoc,
    addDoc,
    setDoc,
} from 'firebase/firestore'
import { db } from './firebase/config'

class User {
    static async add({ lastLogin, uid, name, avatar, email }, user) {
        const userRef = doc(db, 'users', uid)
        return setDoc(userRef, {
            data: {
                lastLogin,
                uid,
                name,
                avatar,
                email,
            },
        }).then(() => sendEmailVerification(user))
    }
}

export default User
