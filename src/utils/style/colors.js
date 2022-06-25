import { createTheme } from '@mui/material'
import { getCookie } from '../function'
import spring from './themes/spring.json'
import summer from './themes/summer.json'

const ctheme = getCookie('theme')

let theme
switch (ctheme) {
    case 'spring':
        theme = spring.palette
        break
    case 'summer':
        theme = summer.palette
        break
    default:
        let date = new Date()
        if (date.getMonth() <= 3 && date.getDay() < 21) {
            theme = spring.palette
        } else {
            theme = summer.palette
        }
}

const themeMui = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: theme.chat_bg_color,
        },
        success: {
            main: '#388e3c',
        },
        secondary: {
            main: theme.chat_input_bg_color,
        },
    },
})
export { theme, themeMui }
