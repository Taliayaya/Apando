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

/**
 * Add a 0 before months number so that its always composed of 2 numbers
 *
 * Example:
 *  - 4 (April) => 04
 *  - 11 (November) => 11
 * @param {Number} month a number from 1 to 12 representing months
 * @returns this same number but formatted
 */
const handleMonth = (month) => {
    if (month < 10) {
        return '0' + month
    }
    return month
}

/**
 * Make the links target _blank so it doesn't open on the same window
 * @param {ReactComponent} props children that are in this link
 * @returns A link component with target _blank
 */
function LinkRenderer(props) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    )
}

/**
 * Format a timestamp into a day/month/year for dates after 2 days ago
 * Else it formats `how long ago + hours ` => Yesterday at 11:53
 *
 * @param {Number} timestamp is the timestamp to format
 * @returns the formatted timestamp
 */
const handleMessageData = (timestamp) => {
    // We are in France, so we use CET timeshift !!!
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
        timeStyle: 'medium',
        timeZone: 'CET',
    })
    const now = new Date()
    const date = new Date(timestamp * 1000)
    var day
    var hours = ''

    const isSameMonthAndYear =
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear()

    /**
     * For a better understanding, users might like to see a message sent
     * two days ago in a different format, and with a better readability.
     * So here, we have "Aujourd'hui" (Today), "Hier" (Yesterday) and
     * "Avant-hier" (Day before yesterday).
     */
    if (isSameMonthAndYear && now.getDate() - 2 <= date.getDate()) {
        hours = dateFormat.format(new Date(timestamp * 1e3)).slice(0, -3)
        if (now.getDate() === date.getDate()) {
            day = "Aujourd'hui à "
        } else if (now.getDate() - 1 === date.getDate()) {
            day = 'Hier à '
        } else {
            day = 'Avant-hier à '
        }
        /**
         * Otherwise, we use the french standard date notation :
         * day/month/year and hours/minutes aren't important so
         * lets keep it simple.
         */
    } else {
        const dateDay = date.getDate()
        const monthsInt = date.getMonth() + 1
        const dateMonth = handleMonth(monthsInt)
        const dateYear = date.getFullYear()
        day = dateDay + '/' + dateMonth + '/' + dateYear
    }
    const formattedTime = day + hours
    return formattedTime
}

export { handleMessageData, LinkRenderer }
