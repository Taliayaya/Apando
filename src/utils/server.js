import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    addDoc,
    getDoc,
} from 'firebase/firestore'
import { getDatabase, ref, increment, update } from 'firebase/database'

import { db } from './firebase/config'
import User from './user'
import Channels from './channels'

/**
 * Handle the servers's API
 * Allow to Add && Join servers
 */
class Server {
    /**
     * add is used to create a new server.
     @param {Object} user the logged-in user information
     * @param {Object} param1 the server information to create
     */
    static async add(
        user,
        { channels, name, code, domain = '', jointype = 'auto' }
    ) {
        if (!this.isNameTaken(name))
            throw new Error('Un serveur à ce nom existe déjà.')
        const ref = collection(db, 'servers')

        return addDoc(ref, {
            name: name,
            code: code,
            domain: domain,
            jointype: jointype,
        }).then(async (ref) => {
            await User.addRole(user.uid, 'Owner', ref.id)
            channels.forEach((channel) => Channels.add(channel, ref.id))
            return ref.id
        })
    }
    /**
     * Retrieve the current server data,
     * such as name, id, domain, code, jointype
     * @param {string} id_server target server id
     * @returns the target server data
     */
    static async get(server_id, isSubServer) {
        const serverRef = isSubServer
            ? doc(db, `orgaServers/${isSubServer}/servers/${server_id}`)
            : doc(db, 'servers', server_id)

        const docSnap = await getDoc(serverRef)
        const data = docSnap.data()
        data['id'] = docSnap.id
        return data
    }

    /**
     * addSub is used to create a sub server to an organisation.
     * It doesn't use the add function because it is located appart of
     * the servers
     * @param {Object} user the logged-in user information
     * @param {Object} param1 the sub server information to create
     */
    static async addSub(
        user,
        { channels, name, code, domain = '', jointype = 'auto', orga }
    ) {
        const ref = collection(db, `orgaServers/${orga}/servers`)

        return addDoc(ref, {
            name,
            code,
            domain,
            jointype,
            orga,
        }).then(async (ref) => {
            await User.addRole(user.uid, 'Owner', ref.id)
            channels.forEach((channel) => Channels.add(channel, ref.id))
            return ref.id
        })
    }

    /**
     * Add a new user to the target server
     *
     * @param {Object} user is the auth instance of the current logged user
     * @param {Object} server holds every public information of the target server,
     * server.name, server.code, server.domain. query result of getServer()
     * @returns a Promise, whether or not the user was added in the server
     */
    static async join(user, server) {
        const userDocRef = doc(db, 'users', user.uid)
        const rltdb = getDatabase()
        const serverStatsRef = ref(rltdb, `serverstats/${server.id}`)

        return new Promise(async (res, rej) => {
            if (!this.isEmailDomainValidated(user, server)) {
                rej(
                    "Le serveur que vous essayez de rejoindre n'accepte pas le domaine de votre email. Essayez avec un email autorisé par le serveur"
                )
            }
            const alreadyInServer = await User.isInServer(user.uid, server.id)
            if (alreadyInServer) {
                rej(`Vous avez déjà rejoins ce serveur`)
            }
            await updateDoc(userDocRef, {
                servers: arrayUnion({
                    id: server.id,
                    name: server.name,
                }),
                serversid: arrayUnion(server.id),
            })
            const updates = {}
            updates[`memberCount`] = increment(1)
            update(serverStatsRef, updates)

            res(`Vous avez rejoins ce serveur avec succès !
                Vous allez maintenant être redirigé vers l'application`)
        })
    }

    /**
     * Verify whether the chosen name is usable or not
     * @param {string} name the server name to verify
     * @returns bool - true if its taken
     */
    static async isNameTaken(name) {
        if (name.trim().length === 0)
            throw new Error('Le nom du serveur ne peut pas être vide.')

        const ref = collection(db, 'servers')
        const q = query(ref, where('name', '==', name))
        getDocs(q).then((res) =>
            res.forEach((doc) => {
                if (doc.exists) return true
            })
        )
        return false
    }
    /**
     * Check if the user email domain and the server allowed email domain
     * is equal.
     * If the server did not configure an email domain, returns true
     *
     * @param {Object} user is the auth instance of the current logged user
     * @param {Object} server holds every public information of the target server,
     * server.name, server.code, server.domain. query result of getServer()
     * @returns true if the user email is valid, else false
     */
    static isEmailDomainValidated(user, server) {
        const userDomain = user.email.split('@')[1]
        const serverDomain =
            server?.domain === undefined ? '' : server?.domain.trim()
        if (serverDomain) {
            return userDomain === serverDomain
        }
        return true
    }

    /**
     * Retrieve all the users who joined the current server
     * @param {Object} param0 The current server : id, name & isSubServer
     * @returns The users in this server
     */
    static async getUserList({ id, isSubServer }) {
        const ref = collection(db, 'users')
        const q = query(
            ref,
            where(
                isSubServer ? 'orgaServersId' : 'serversid',
                'array-contains',
                id
            )
        )
        const querySnapshot = await getDocs(q)
        const queryUserList = []
        querySnapshot.forEach((doc) => {
            const data = { id: doc.id, data: doc.data().data }
            queryUserList.push(data)
        })
        return queryUserList
    }

    static async update(id_server, newData, isSubServer) {
        const serverRef = isSubServer
            ? doc(db, `orgaServers/${isSubServer}/servers/${id_server}`)
            : doc(db, 'servers', id_server)
        await updateDoc(serverRef, { ...newData })
    }
}

export default Server
