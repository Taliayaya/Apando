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
import { getStorage, uploadBytes, ref as storageRef } from 'firebase/storage' // Need to alias it in order to avoid collision

function giveUniqueName(filename, namelist) {
    /* Gives an unique name a file, that's different from the rest of the
     * list. The storage shouldn't contain same-name files, so this function
     * tries to give the normal name to the file, then tries again with (1)
     * appended to the file name, and increases this number step by step.
     * filename: string, the name of the file to be inserted
     * filelist: array of strings, the names of the files already inserted
     * Returns: The given name to the file
     */
    if (namelist.every((name) => name !== filename)) return filename
    else {
        const matching = filename.match(/(.*)(\.[a-zA-Z0-9]*$)/)
        // Gets the name and extension of the file
        var count = 0
        while (count++) {
            var incname = matching[1] + '(' + count + ')' + matching[2]
            if (namelist.every((name) => name !== incname)) {
                return incname
            }
        }
    }
}

function storeFiles(files, messageRef) {
    /* Stores the files in the storage, and returns the reference to the folder they're in.
     * If there are no files, returs null.
     * Takes the files and the reference to the message we're sending as arguments.
     */
    if (files.length !== 0) {
        const storage = getStorage()
        const filesPath = messageRef._path.pieces_.slice(1).join('/')
        // The whole path except the 'messages' directory
        var givennames = [] // The names given to each file
        files.forEach((file) => {
            const filename = giveUniqueName(file.name, givennames)
            givennames.push(filename)
            const filesRef = storageRef(
                storage,
                `attachments/${filesPath}/${filename}`
            )
            uploadBytes(filesRef, file)
        })
        return filesPath
    } else return null
}

function writeUserMessage(user, message, id_channel, files = []) {
    const db = getDatabase()
    const messageListRef = ref(db, 'messages/' + id_channel)
    const newMessageRef = push(messageListRef)
    const filesRef = storeFiles(files, newMessageRef)
    set(newMessageRef, {
        message: message,
        id_channel: id_channel,
        timestamp: Timestamp.fromDate(new Date()),
        user: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        },
        files: filesRef ? filesRef : null,
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
