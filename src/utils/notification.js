import { getDatabase, ref, update } from 'firebase/database'

/**
 * Write this notification as sent.
 * This allows the user not to receive more than one notification
 * @param {string} uid the user who saw this notification
 * @param {string} id_channel channel origin of this notification
 * @param {string} id_server server origin of this notification
 */
function setNotificationAsSent(uid, id_channel, id_server) {
    const db = getDatabase()
    const updates = {}
    updates[`channels/${id_server}/${id_channel}/seen/${uid}`] = 'sent'
    update(ref(db), updates)
}

/**
 * Ask the user whether or not he wants to receive our wonderful homemade
 * notification.
 * It checks if his browser supports notifications (old browsers :/ )
 * and serviceworkers. Service Worker are not yet considered but it
 * arrival is already prepared.
 */
function askNotification() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.log('This browser does not support desktop notification')
        // if he already refused, let's not ask him. He can reset his choice later.
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission()
    }
}

/**
 * Create a notification for this user.
 * If the user click on this notification, it opens a new tab
 * to this message (server->channel->message)
 * @param {string} uid whom to send the notification
 * @param {string} id_channel where the notification was sent
 * @param {string} id_server the server in which it is
 * @param {string} img the photoURL of whom sent the message
 * @param {string} message the message to show (message sent)
 * @param {string} channelName the name of the channel where the notification was sent
 * @param {string} serverName the server name in which it is
 * @param {string} username the name who sent this notification
 */
function sendNotificationWeb(
    uid,
    id_channel,
    id_server,
    img,
    message,
    channelName,
    serverName,
    username
) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(
            `Apando - ${serverName}/${channelName} - ${username}`,
            {
                body: message,
                icon: img,
            }
        )
        // Clicking on the notification will open a new tab to
        // where the message was sent
        notification.onclick = (e) => {
            window.open(
                // In order that it can be debugged without changing this line
                // NB : you might have to change the port from 3000 to ...
                // However, 3000 is the default port in React
                process.env.NODE_ENV === 'production'
                    ? `https://apando.fr/app/${serverName}/${id_server}/${id_channel}`
                    : `http://localhost:3000/app/${serverName}/${id_server}/${id_channel}`
            )
        }
        // If the user is already on this window, remove the notification
        // since he knows a bit what's happening
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                notification.close()
            }
        })
    }
    // To avoid sending every second a new one...
    setNotificationAsSent(uid, id_channel, id_server)
}

export { setNotificationAsSent, askNotification, sendNotificationWeb }
