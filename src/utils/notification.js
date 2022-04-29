import { getDatabase, ref, update } from 'firebase/database'

function setNotificationAsSent(uid, id_channel, id_server) {
    const db = getDatabase()
    const updates = {}
    updates[`channels/${id_server}/${id_channel}/seen/${uid}`] = 'sent'
    update(ref(db), updates)
}
function askNotification() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.log('This browser does not support desktop notification')
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission()
    }
}

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
        notification.onclick = (e) => {
            window.open(
                process.env.NODE_ENV === 'production'
                    ? `https://apando.fr/app/${serverName}/${id_server}/${id_channel}`
                    : `http://localhost:3000/app/${serverName}/${id_server}/${id_channel}`
            )
        }
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                notification.close()
            }
        })
    }
    setNotificationAsSent(uid, id_channel, id_server)
}

export { setNotificationAsSent, askNotification, sendNotificationWeb }
