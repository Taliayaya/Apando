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
import {
    getDatabase,
    ref,
    push,
    set,
    get,
    child,
    remove,
    increment,
    update,
} from 'firebase/database'
import { db } from './firebase/config'

/**
 * Handle User based client-server interaction
 */
class User {
    /**
     * Add a new user in the database
     *
     * @param {Objec} param0 user data to add
     * @param {Object} user current user instance - auth instance
     * @returns A Promise that add the user data
     */
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
    /**
     * Change the target user role into a new one.
     * Each role can give specials interactions to the server
     * Example : Owner, Admin, Délégué, Muted, Banned...
     * @param {string} uid is the role update target uid
     * @param {string} role is the role name
     * @param {string} server_id is the environment where it takes place
     */
    static async addRole(uid, role, server_id) {
        const db = getDatabase()
        const memberRef = ref(db, `roles/${server_id}/${uid}`)
        set(memberRef, {
            role: role,
        })
    }

    /**
     * Retrieve the user role in a target server
     * @param {string} uid is the target user to retrieve
     * @param {string} server_id is where the server environment
     * @returns the user role in the current server
     */
    static async getRole(uid, server_id) {
        const dbRef = ref(getDatabase())
        const roleRef = `roles/${server_id}/${uid}`
        return get(child(dbRef, roleRef))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const role = snapshot.val()
                    return role
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    /**
     * Remove the target user role.
     * @param {string} uid the target user id
     * @param {string} server_id is the current server id
     */
    static async removeRole(uid, server_id) {
        const db = getDatabase()
        const memberRef = ref(db, `roles/${server_id}/` + uid)
        remove(memberRef)
    }
}

export default User
