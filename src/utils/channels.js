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

import { db } from './firebase/config'

class Channels {
    /**
     * Add a new channel to the target server
     * @param {string} name the new channel name
     * @param {string} server_id is where the channel is added
     */
    static async add(name, server_id) {
        const db = getDatabase()
        const channelRef = ref(db, `channels/` + server_id)
        const newChannelRef = push(channelRef)

        set(newChannelRef, {
            name: name,
        })
    }
}

export default Channels
