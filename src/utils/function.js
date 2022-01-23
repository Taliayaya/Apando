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

function writeUserRole(uid, role, serverID) {
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

export { writeUserMessage, writeUserRole, getUserRole, removeUserRole }
