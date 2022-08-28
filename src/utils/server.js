import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    addDoc,
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
        { channels, name, code, domain = '', jointype = '' }
    ) {
        if (!this.isNameTaken(name))
            throw new Error('Un serveur à ce nom existe déjà.')
        const ref = collection(db, 'servers')

        addDoc(ref, {
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
     * addSub is used to create a sub server to an organisation.
     * It doesn't use the add function because it is located appart of
     * the servers
     * @param {Object} user the logged-in user information
     * @param {Object} param1 the sub server information to create
     */
    static async addSub(
        user,
        { channels, name, code, domain = '', jointype = '', orga }
    ) {
        const ref = collection(db, `orgaServers/${orga}/servers`)

        addDoc(ref, {
            name,
            code,
            domain,
            jointype,
            orga,
        }).then(async (ref) => {
            await User.addRole(user.uid, 'Owner', ref.id)
            channels.forEach((channel) => Channels.add(channel, ref.id))
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
            if (this.isEmailDomainValidated(user, server)) {
                const alreadyInServer = User.isInServer(user.uid, server.id)
                if (!alreadyInServer) {
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
                } else {
                    rej(`Vous avez déjà rejoins ce serveur`)
                }
            } else {
                rej(
                    "Le serveur que vous essayez de rejoindre n'accepte pas le domaine de votre email. Essayez avec un email autorisé par le server"
                )
            }
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
}

export default Server
