import { getDatabase, increment, ref, update } from 'firebase/database'
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
import Server from './server'
import User from './user'

/**
 * Handle Organisation based client-server api interaction
 *
 * TODO : - verify if the orga name is taken
 *  - Save draft in a cookie
 */
class Organisation {
    /**
     * Add a new organisation and its collections/subcollections/servers
     * Add the owner to the orgarnisation users
     * Add the organisation to the user's organisation array
     *
     * @param {string} name the organisation name
     * @param {string} domain the email domain to accept (empty = all)
     * @param {string} jointype whether users can join on demand or automatically
     * @param {Object} collections a node containing all collections, subCollection and servers
     * @param {Array} channels a default channels array used as a placeholder while creating servers
     * @param {Object} user the user data - auth instance
     */
    static async add({ name, domain, jointype, collections, channels }, user) {
        const orgaCollec = collection(db, 'organisations')
        const userRef = doc(db, 'users', user.uid)
        // Add the orga data
        const orgaCollecRef = await addDoc(orgaCollec, {
            name,
            collections,
            domain,
            jointype,
            channels,
            owner: {
                uid: user.uid,
                username: user.displayName,
            },
        })
        const orgaCollecRoleRef = doc(db, 'orgaUsers', orgaCollecRef.id)
        const orgaArrayRef = doc(db, 'orgaArray', orgaCollecRef.id)

        // Add the owner in the orga user list
        await setDoc(orgaCollecRoleRef, {
            username: user.displayName,
            role: 'owner',
            uid: user.uid,
        })

        await setDoc(orgaArrayRef, {
            name,
        })

        // Add the organisation in the user data
        await updateDoc(userRef, {
            organisation: arrayUnion({ id: orgaCollecRef.id, name: name }),
            organisation_id: arrayUnion(orgaCollecRef.id),
        })

        const promises = []
        // Add the servers
        collections.forEach((collec) => {
            collec.servers.forEach(async (server) => {
                server.orga = name
                // We add every promises in an array to execute later
                promises.push(async () => {
                    return Server.addSub(user, server).then(async (id) => {
                        console.log('joining', server.name)
                        await Organisation.joinServer(
                            user,
                            name,
                            {
                                ...server,
                                id: id,
                            },
                            true
                        )
                    })
                })
            })
            collec.subCollection.forEach((subCollec) => {
                subCollec.servers.forEach(async (server) => {
                    server.orga = name
                    // We add every promises in an array to execute later
                    promises.push(async () => {
                        return Server.addSub(user, server).then(async (id) => {
                            await Organisation.joinServer(
                                user,
                                name,
                                {
                                    ...server,
                                    id: id,
                                },
                                true
                            )
                        })
                    })
                })
            })
        })

        console.log(promises)
        // We execute all the promises in SERIE
        for (const promise of promises) {
            console.log(promise)
            await promise()
        }
    }

    static search() {
        const ref = collection(db, 'orgaArray')
        const data = []
        getDocs(ref).then((snapshot) => {
            snapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            })
        })
        return data
    }

    /**
     * Query in the Organisation a server with the same name & code then retrieve it
     * @param {String} orga The name of the organisation where to query the server
     * @param {String} serverName The name of the server to query
     * @param {String} serverCode The secret code of the server to query
     * @returns The server information or nothing
     */
    static async queryServer(orga, serverName, serverCode) {
        const ref = collection(db, 'orgaServers', orga, 'servers')
        const q = query(
            ref,
            where('name', '==', serverName),
            where('code', '==', serverCode)
        )
        let server
        await getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                server = doc.data()
                server.id = doc.id
                return server
            })
        })
        return server
    }

    static async joinServer(user, orga, server, skipVerif = false) {
        const userRef = doc(db, 'users', user.uid)
        const rltdb = getDatabase()
        const serversStatsRef = ref(rltdb, `serverstats/${server.id}`)

        return new Promise(async (res, rej) => {
            if (!skipVerif && !Server.isEmailDomainValidated(user, server)) {
                rej(
                    `Le serveur que vous essayez de rejoindre n'accepte pas le domaine de votre adresse mail. 
                Essayez avec une adresse mail autorisée par le serveur.`
                )
            }
            if (
                !skipVerif &&
                (await User.isInOrgaServer(user.uid, server.id, orga))
            ) {
                rej(`Vous avez déjà rejoins ce serveur.`)
            }
            // Check either if we have to create the whole data,
            // add the server to the organisation
            // or create the orga and add the server
            let currentServerList = (await User.get(user.uid))?.orgaServers
            const serverData = { id: server.id, name: server.name, orga: orga }
            if (!currentServerList || currentServerList?.length === 0) {
                currentServerList = [{ name: orga, servers: [serverData] }]
            } else {
                const currentOrga = currentServerList.find(
                    (organisation) => organisation.name === orga
                )
                if (currentOrga && Object.keys(currentOrga).length > 0) {
                    currentServerList
                        .find((organisation) => organisation.name === orga)
                        .servers.push(serverData)
                } else {
                    currentServerList.push({
                        name: orga,
                        servers: [serverData],
                    })
                }
            }
            await updateDoc(userRef, {
                orgaServers: currentServerList,
                orgaServersId: arrayUnion(server.id),
            })
            const updates = {}
            updates[`memberCount`] = increment(1)
            await update(serversStatsRef, updates)

            res(
                "Vous avez rejoins ce serveur avec succès !\nVous allez maintenant être redirigé vers l'application"
            )
        })
    }

    static async isNameAvailable(name) {
        const ref = collection(db, 'orgaArray')
        const q = query(ref, where('name', '==', name))
        return await getDocs(q).then((querySnapshot) => {
            let answer = true
            querySnapshot.forEach((doc) => {
                if (doc.data()?.name === name) {
                    answer = false
                    return false
                }
            })
            return answer
        })
    }
}

export default Organisation
