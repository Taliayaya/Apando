import {
    getDatabase,
    ref,
    push,
    set,
    get,
    child,
    remove,
} from 'firebase/database'
import { Timestamp } from 'firebase/firestore'

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

async function writeUserRole(uid, role, serverID) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${serverID}/` + uid)
    set(memberRef, {
        role: role,
    })
}

function removeUserRole(uid, serverID) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${serverID}/` + uid)
    remove(memberRef)
}

async function getUserRole(uid, serverID) {
    const dbRef = ref(getDatabase())
    const roleRef = `roles/${serverID}/${uid}`
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

function addNewChannel(name, serverID) {
    /**
     * Ajoute le nouveau salon dans rltd
     */
    const db = getDatabase()
    const channelRef = ref(db, `channels/` + serverID)
    const newChannelRef = push(channelRef)

    set(newChannelRef, {
        name: name,
    })
}

function createChannelListFromString(channelsString, serverID) {
    /**
     * A partir d'une chaîne de caractère, utilise la fonction addNewChannel
     * et crée des salons correspondants aux mots séparés par des \n
     *
     * Ignore s'ils sont "vide"
     */
    const channelsList = channelsString.split('\n')

    for (let i = 0; i < channelsList.length; i++) {
        if (channelsList[i].trim().length > 0) {
            addNewChannel(channelsList[i], serverID)
        }
    }
}

function deleteChannel(id_channel, serverID) {
    /**
     * Supprime le salon correspondant
     */
    const db = getDatabase()
    const channelRef = ref(db, `channels/${serverID}/` + id_channel)
    const messagesOfChannelsRef = ref(db, `messages/${serverID}/` + id_channel)
    remove(channelRef)
    remove(messagesOfChannelsRef)
}

export {
    writeUserMessage,
    writeUserRole,
    getUserRole,
    removeUserRole,
    addNewChannel,
    createChannelListFromString,
    deleteChannel,
}
