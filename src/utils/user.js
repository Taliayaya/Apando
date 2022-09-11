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

    static async get(uid) {
        const userRef = doc(db, 'users', uid)

        return getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) return docSnap.data()
        })
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

    /**
     * Check if the user is in the server
     * @param {string} uid is the user to check
     * @param {string} server_id is the target server id
     * @returns a bool whether the user joined or not the target server
     */
    static async isInServer(uid, server_id) {
        const userRef = doc(db, 'users', uid)

        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
            const serversList = docSnap.data()?.serversid
            if (serversList) {
                const isAlreadyIn = serversList.includes(server_id)
                return isAlreadyIn
            }
            return false
        }
        return false
    }

    /**
     * Search if the user is already in this server or not
     * @param {String} uid The id of the user to analyse
     * @param {String} server_id The id of the server to analyse
     * @param {String} orga The name of the organisation containing the servers
     * @returns A Boolean. True if the user is in, False either.
     */
    static async isInOrgaServer(uid, server_id, orga) {
        const userRef = doc(db, 'users', uid)
        console.log(uid, server_id, orga)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
            const orgaArray = docSnap.data()?.orgaServers
            const orgaServers = orgaArray.find(
                (data) => data?.name === orga
            )?.servers
            if (!orgaArray || orgaArray.length === 0) return false
            if (orgaServers) {
                const server = orgaServers?.find(
                    (data) => data.id === server_id
                )
                console.log(server, !!server)
                if (!server) return false

                return Object.keys(server)?.length !== 0
            }
            return false
        }
        return false
    }

    static async banFrom(server_id, uid, isSubServer) {
        const userRef = doc(db, 'users', uid)

        isSubServer
            ? await updateDoc(userRef, {
                  orgaServersId: arrayRemove(server_id),
              })
            : await updateDoc(userRef, { serversid: arrayRemove(server_id) })
        await this.addRole(uid, 'Banned', server_id)
    }
}

export default User
