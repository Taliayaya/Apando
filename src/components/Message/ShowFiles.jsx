// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

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
