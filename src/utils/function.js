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
} from 'firebase/firestore'
import { db } from './firebase/config'

/**
 * Write the user message in the database to the associated channel
 * Update server stats in real time
 * @param {Object} user is the auth instance of the current logged user
 * @param {string} message is the message to send
 * @param {string} id_channel is the channel in which the message is sent
 * @param {string} id_server is the server in which the message is sent
 */
async function writeUserMessage(user, message, id_channel, id_server) {
    const db = getDatabase()
    const messageListRef = ref(db, 'messages/' + id_channel)
    const newMessageRef = push(messageListRef)
    const updates = {}

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
function setMessageAsSeen(uid, id_channel, id_server) {
    const db = getDatabase()
    const updates = {}
    updates[`channels/${id_server}/${id_channel}/seen/${uid}`] = true
    update(ref(db), updates)
}

/**
 * Change the target user role into a new one.
 * Each role can give specials interactions to the server
 * Example : Owner, Admin, Délégué, Muted, Banned...
 * @param {string} uid is the role update target uid
 * @param {string} role is the role name
 * @param {string} id_server is the environment where it takes place
 */
async function writeUserRole(uid, role, id_server) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${id_server}/` + uid)
    set(memberRef, {
        role: role,
    })
}

/**
 * Remove the target user role.
 * @param {string} uid the target user id
 * @param {string} id_server is the current server id
 */
function removeUserRole(uid, id_server) {
    const db = getDatabase()
    const memberRef = ref(db, `roles/${id_server}/` + uid)
    remove(memberRef)
}

/**
 * Retrieve the user role in a target server
 * @param {string} uid is the target user to retrieve
 * @param {string} id_server is where the server environment
 * @returns the user role in the current server
 */
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
            console.error(error)
        })
}

/**
 * Add a new channel to the target server
 * @param {string} name the new channel name
 * @param {string} id_server is where the channel is added
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
 * Add multiple channels in one time in the target server
 * @param {string} channelsString a string containing multiple channels name separated by \n
 * @param {string} id_server where to add new channels
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
 * Delete a channel from a target server
 * @param {string} id_channel the channel to delete
 * @param {string} id_server where to delete the channel
 */
function deleteChannel(id_channel, id_server) {
    const db = getDatabase()
    const channelRef = ref(db, `channels/${id_server}/` + id_channel)
    const messagesOfChannelsRef = ref(db, `messages/${id_server}/` + id_channel)
    remove(channelRef)
    remove(messagesOfChannelsRef)
}

/**
 * Allow to ban a user from a target server
 *
 * The banned user is removed from the server userlist and get the Banned
 * role
 * This banned role forbid this user to read and send any message.
 * No interaction will be possible for a banned user in the target server
 * @param {string} id_server is the server where to ban the user
 * @param {string} uid is the ban target user id
 */
async function banUserFromServer(id_server, uid) {
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
        server = {
            id: doc.id,
            name: doc.data().name,
            domain: doc.data()?.domain,
            code: doc.data().code,
            jointype: doc.data()?.jointype,
        }
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
    const rltdb = getDatabase()
    const serverStatsRef = ref(rltdb, `serverstats/${server.id}`)

    return new Promise(async (res, rej) => {
        if (isEmailDomainValidated(user, server)) {
            const alreadyInServer = await isUserInTargetServer(
                user.uid,
                server.id
            )
            if (!alreadyInServer) {
                await updateDoc(userDocRef, {
                    servers: arrayUnion({ id: server.id, name: server.name }),
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
 * Create a join request
 *
 * If a server has "jointype: manual" set up, users are unable to automatically
 * join a server. Instead, it creates a request the owner has to accept
 * @param {Object} user the auth instance of the current user
 * @param {string} id_server the target server to request
 */
async function requestJoin(user, id_server) {
    const db = getDatabase()
    const dbRef = ref(db)
    const newRequestRef = ref(db, `/requests/${id_server}/${user.uid}`)
    await get(child(dbRef, `requests/${id_server}/${user.uid}`)).then(
        (snapshot) => {
            if (snapshot.exists()) {
                throw new Error(
                    "Vous avez déjà envoyé une demande d'adhésion à ce serveur"
                )
            }
        }
    )
    set(newRequestRef, {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
    })
    updateInviteCount(id_server)
}

/**
 * Update the target server invite count stats
 * @param {string} id_server the server stats to update
 * @param {int} num the increment number
 */
function updateInviteCount(id_server, num = 1) {
    const db = getDatabase()
    const serverStatsRef = ref(db, `/serverstats/${id_server}/`)
    const updates = {}
    updates['currentInviteCount'] = increment(num)
    update(serverStatsRef, updates)
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
    const serverDomain =
        server?.domain === undefined ? '' : server?.domain.trim()
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
        jointype: newJoinType,
    })
}

/**
 * Check if the user is in the server
 * @param {string} uid is the user to check
 * @param {string} id_server is the target server id
 * @returns a bool whether the user joined or not the target server
 */
async function isUserInTargetServer(uid, id_server) {
    const userRef = doc(db, 'users', uid)

    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
        const serversList = docSnap.data()?.serversid
        if (serversList) {
            const isAlreadyIn = serversList.includes(id_server)
            return isAlreadyIn
        }
        return false
    }
    return false
}

/**
 * Query all the users that joined the target server
 * and retrieve them in an array
 * @param {string} id_server the server to query
 * @returns an array of Object containing users
 */
async function getServerUserList(id_server) {
    const q = query(
        collection(db, 'users'),
        where('serversid', 'array-contains', id_server)
    )

    const querySnapshot = await getDocs(q)
    const queryUserList = []
    querySnapshot.forEach((doc) => {
        const data = { id: doc.id, data: doc.data().data }
        queryUserList.push(data)
    })
    return queryUserList
}

/**
 * Retrieve the current server data,
 * such as name, id, domain, code, jointype
 * @param {string} id_server target server id
 * @returns the target server data
 */
async function getServerInfo(id_server) {
    const serverRef = doc(db, 'servers', id_server)

    const docSnap = await getDoc(serverRef)
    const data = docSnap.data()
    return data
}

/**
 * Create the empty fields to count
 * @param {string} id_server id to locate the server stats
 */
async function createServerStatsField(id_server) {
    const db = getDatabase()
    const serverStatsRef = ref(db, '/serverstats/' + id_server)

    set(serverStatsRef, {
        memberCount: 0,
        currentInviteCount: 0,
        messageCount: 0,
    })
}

/**
 * Update the server counters value :
 * - total Message Counter
 * - channel Message counter
 * @param {string} id_server the target server
 * @param {string} id_channel channel from where the message was sent
 * @param {int} num increment or decrement counters (+1 or -1)
 */
function updateMessageCount(id_server, id_channel, num = 1) {
    const db = getDatabase()
    const serverStatsRef = ref(db, `/serverstats/${id_server}/`)
    const updates = {}
    updates['messageCount'] = increment(num)
    updates[`${id_channel}/messageCount`] = increment(num)
    update(serverStatsRef, updates)
}

/**
 * Remove the user request of the target server
 * and update associated invite count
 * @param {string} uid user's request to remove
 * @param {string} id_server server where the request is from
 */
function removeJoinRequest(uid, id_server) {
    const db = getDatabase()
    const requestRef = ref(db, `/requests/${id_server}/${uid}`)
    remove(requestRef)

    updateInviteCount(id_server, -1)
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
    isUserInTargetServer,
    getServerUserList,
    getServerInfo,
    createServerStatsField,
    updateMessageCount,
    requestJoin,
    removeJoinRequest,
    setMessageAsSeen,
}
