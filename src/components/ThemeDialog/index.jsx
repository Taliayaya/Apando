import {
    Dialog,
    DialogTitle,
    ListItem,
    ListItemText,
    List,
} from '@mui/material'
import React from 'react'
import themes from '../../utils/style/themes'

export default ({ onClose, selectedValue, open }) => {
    const handleClose = () => {
        onClose(selectedValue)
    }

    const handleListItemClick = (value) => {
        onClose(value)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Thèmes</DialogTitle>
            <List sx={{ pt: 0 }}>
                {themes.map((theme) => (
                    <ListItem
                        button
                        onClick={() => handleListItemClick(theme)}
                        key={theme.name}
                    >
                        <ListItemText
                            primary={theme.name}
                            secondary={`Couleur principale: ${theme.main_color}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}
