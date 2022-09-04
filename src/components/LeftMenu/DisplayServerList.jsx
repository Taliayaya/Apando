import { List, ListItem, ListItemText } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'

function DisplayServerList({ serverList, handleSelect, isSubServer = false }) {
    return (
        <List sx={{ pt: 0 }}>
            {serverList.map(({ id, name }) => (
                <ListItem
                    key={id}
                    button
                    onClick={() => handleSelect(id, name, isSubServer)}
                >
                    <ListItemText>{name}</ListItemText>
                </ListItem>
            ))}
        </List>
    )
}

DisplayServerList.propTypes = {
    serverList: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelect: PropTypes.func.isRequired,
}

export default DisplayServerList
