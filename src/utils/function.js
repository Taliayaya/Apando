import {
    getDatabase,
    ref,
    push,
    set,
    get,
    child,
    remove,
} from 'firebase/database'
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
} from 'firebase/firestore'
import { db } from './firebase/config'

function writeUserMessage(user, message, id_channel) {
    const db = getDatabase()
    const messageListRef = ref(db, 'messages/' + id_channel)
    const newMessageRef = push(messageListRef)

    set(newMessageRef, {
        message: message,
        id_channel: id_channel,
        timestamp: Timestamp.fromDate(new Date()),
        user: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        },
    })
}

async function writeUserRole(uid, role, id_server) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${id_server}/` + uid)
    set(memberRef, {
        role: role,
    })
}

function removeUserRole(uid, id_server) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${id_server}/` + uid)
    remove(memberRef)
}

async function getUserRole(uid, id_server) {
    const dbRef = ref(getDatabase())
    const roleRef = `roles/${id_server}/${uid}`
    return get(child(dbRef, roleRef))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const role = snapshot.val()
                return role
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

/**
 * Ajoute le nouveau salon dans rltd
 */
function addNewChannel(name, id_server) {
    const db = getDatabase()
    const channelRef = ref(db, `channels/` + id_server)
    const newChannelRef = push(channelRef)

    set(newChannelRef, {
        name: name,
    })
}

/**
 * A partir d'une chaîne de caractère, utilise la fonction addNewChannel
 * et crée des salons correspondants aux mots séparés par des \n
 *
 * Ignore s'ils sont "vide"
 */
function createChannelListFromString(channelsString, id_server) {
    const channelsList = channelsString.split('\n')

    for (let i = 0; i < channelsList.length; i++) {
        if (channelsList[i].trim().length > 0) {
            addNewChannel(channelsList[i], id_server)
        }
    }
}

/**
 * Supprime le salon correspondant
 */
function deleteChannel(id_channel, id_server) {
    const db = getDatabase()
    const channelRef = ref(db, `channels/${id_server}/` + id_channel)
    const messagesOfChannelsRef = ref(db, `messages/${id_server}/` + id_channel)
    remove(channelRef)
    remove(messagesOfChannelsRef)
}

/**
 * Permet de bannir un utilisateur du serveur actuel.
 *
 * L'utilisateur banni se voit retiré de la liste des utilisateurs
 * du serveur et se voit octroyé le rôle Banned, l'empêchant de lire
 * les données du serveur en question.
 * @param {string} id_server est l'id associé au serveur où le bannisesement doit
 * être effectué
 * @param {string} uid est l'id de l'utilisateur a bannir
 */
async function banUserFromServer(id_server, uid) {
    console.log("j'ai été cliqué !")
    const userRef = doc(db, 'users', uid)

    await updateDoc(userRef, {
        serversid: arrayRemove(id_server),
    })
    writeUserRole(uid, 'Banned', id_server)
}

/**
 * Search in the table a server associated with this name and password
 *
 * @param {string} serverName is the name of the server the user is
 * trying to join
 * @param {string} serverPassword is the password that allows the user to join
 * or not the server.
 * @returns an Object containing the server name and code or None if empty
 */
async function getServer(serverName, serverPassword) {
    const serversRef = collection(db, 'servers')
    const q = query(
        serversRef,
        where('code', '==', serverPassword),
        where('name', '==', serverName)
    )
    const querySnapshot = await getDocs(q)
    let server = {}
    querySnapshot.forEach((doc) => {
        server = { id: doc.id, name: doc.data().name }
    })
    return server
}

/**
 * Add a new user to the target server
 *
 * @param {Object} user is the auth instance of the current logged user
 * @param {Object} server holds every public information of the target server,
 * server.name, server.code, server.domain. query result of getServer()
 * @returns a Promise, whether or not the user was added in the server
 */
function joinServer(user, server) {
    const userDocRef = doc(db, 'users', user.uid)
    return new Promise(async (res, rej) => {
        if (isEmailDomainValidated(user, server)) {
            await updateDoc(userDocRef, {
                servers: arrayUnion({ id: server.id, name: server.name }),
                serversid: arrayUnion(server.id),
            })
            res(`Vous avez rejoins ce serveur avec succès !
            Vous allez maintenant être redirigé vers l'application`)
        } else {
            rej(
                "Le serveur que vous essayez de rejoindre n'accepte pas le domaine de votre email. Essayez avec un email autorisé par le server"
            )
        }
    })
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
function isEmailDomainValidated(user, server) {
    const userDomain = user.email.split('@')[1]
    const serverDomain = server.domain.trim()
    if (serverDomain) {
        return userDomain === serverDomain
    }
    return true
}

/**
 * Modify the target server settings
 *
 * @param {string} id_server is the target of the changes
 * @param {string} newDomain data : allows owner to filter joining email
 * @param {string} newCode data : the code access to join the server
 * @param {string} newJoinType data : allows users to join without permission or not
 */
async function setServerChanges(id_server, newDomain, newCode, newJoinType) {
    const serverRef = doc(db, 'servers', id_server)
    await updateDoc(serverRef, {
        domain: newDomain,
        code: newCode,
        join: newJoinType,
    })
}

export {
    writeUserMessage,
    writeUserRole,
    getUserRole,
    removeUserRole,
    addNewChannel,
    createChannelListFromString,
    deleteChannel,
    banUserFromServer,
    getServer,
    joinServer,
    setServerChanges,
}
