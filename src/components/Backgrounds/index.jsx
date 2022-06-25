import React from 'react'
import { useAuth } from '../../utils/hooks'
import Spring from './Spring'
import Summer from './Summer'

export default ({ children }) => {
    const { themeUsed } = useAuth()

    switch (themeUsed.name) {
        case 'spring':
            return <Spring sakura={true}>{children}</Spring>
        case 'summer':
            return <Summer>{children}</Summer>
        default:
            return <Spring sakura={true}>{children}</Spring>
    }
}
