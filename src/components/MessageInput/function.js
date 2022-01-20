import { getDatabase, ref, push, set } from 'firebase/database'
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

export { writeUserMessage }
