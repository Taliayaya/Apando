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

class Message {
    /**
     * Write the user message in the database to the associated channel
     * Update server stats in real time
     * @param {Object} user is the auth instance of the current logged user
     * @param {string} message is the message to send
     * @param {string} id_channel is the channel in which the message is sent
     * @param {string} id_server is the server in which the message is sent
     * @param {Array} files if files are added to the message (e.g. images, video, etc)
     */
    static async add(
        user = { uid, displayName, photoURL },
        message,
        id_channel,
        id_server,
        files = []
    ) {
        const db = getDatabase()
        const messageListRef = ref(db, 'messages/' + id_channel)
        const newMessageRef = push(messageListRef)
        const updates = {}
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
        /**
         * Reset everybody seen stat (Nobody has seen this new message yet, right ?)
         * Update the server & channels messages stats
         * Save his avatar and name for the notification display
         * Set owner message as seen... for the owner (he knows he sent a new message)
         */
        remove(ref(db, `channels/${id_server}/${id_channel}/seen`))
        updates[`channels/${id_server}/${id_channel}/lastMessage`] = message
        updates[`channels/${id_server}/${id_channel}/lastMessageUser`] =
            user.displayName
        updates[`channels/${id_server}/${id_channel}/lastMessageImg`] =
            user.photoURL
        updates[`channels/${id_server}/${id_channel}/seen/${user.uid}`] = true
        update(ref(db), updates)
    }
    /**
     * Write the message as seen for the target user
     * @param {string} uid is the user id that saw the message
     * @param {string} id_channel where the message was seen
     * @param {string} id_server in which server the channel is
     */
    static setAsSeen(uid, id_channel, id_server) {
        const db = getDatabase()
        const updates = {}
        updates[`channels/${id_server}/${id_channel}/seen/${uid}`] = true
        update(ref(db), updates)
    }
    /**
     * Update the server counters value :
     * - total Message Counter
     * - channel Message counter
     * @param {string} id_server the target server
     * @param {string} id_channel channel from where the message was sent
     * @param {int} num increment or decrement counters (+1 or -1)
     */
    static updateCounter(id_server, id_channel, num = 1) {
        const db = getDatabase()
        const serverStatsRef = ref(db, `/serverstats/${id_server}/`)
        const updates = {}
        updates['messageCount'] = increment(num)
        updates[`${id_channel}/messageCount`] = increment(num)
        update(serverStatsRef, updates)
    }
}

export default Message
