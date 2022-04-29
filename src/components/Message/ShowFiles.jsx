import { StyleReactPlayer } from './MessageStyle'
const ShowFiles = ({ name, url }) => {
    if (name && url) {
        const extension = name.split('.').slice(-1)[0]

        // Load image
        const imgExtension = 'jpeg, gif, png, svg, jpg'.split(', ')
        if (imgExtension.includes(extension)) {
            return <img src={url} alt={name} />
        }
        // Load video
        const videoExtension = 'mp4, mov, webm'.split(', ')
        if (videoExtension.includes(extension)) {
            // Using html video player didn't work as expected...
            // so yes, im using another dependencies...
            return (
                <StyleReactPlayer
                    style={{ maxWidth: '40vw' }}
                    url={url}
                    controls
                />
            )
        }
        // Load music
        const musicExtension = 'wav, mp3, m4a, wma'.split(', ')
        if (musicExtension.includes(extension)) {
            return <audio controls src={url} />
        }
    }
    return null
}

export default ShowFiles
