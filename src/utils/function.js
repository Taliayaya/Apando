import {
    getDatabase,
    ref,
    push,
    set,
    get,
    child,
    remove,
} from 'firebase/database'
import { Timestamp, doc, updateDoc, arrayRemove } from 'firebase/firestore'
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

export {
    writeUserMessage,
    writeUserRole,
    getUserRole,
    removeUserRole,
    addNewChannel,
    createChannelListFromString,
    deleteChannel,
    banUserFromServer,
}
