import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material'

/**
 * Split the string to an array of channel
 *
 * Separators: , ; | \n - | \s
 * @param {string} channels string to split
 * @returns Array of channel
 */
const handleChannelToArray = (channels) => {
    return channels.split(/[\s,;|\/\-\n]+/)
}

function AddServerDialog({ open, onClose, title, handleAddServer }) {
    const [form, setForm] = React.useState({
        name: '',
        code: '',
        domain: '',
        jointype: 'manual',
        channels: '',
    })

    const handleSubmit = () => {
        let newServer = form
        form.channels = handleChannelToArray(form.channels)
        handleAddServer(newServer)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    color="secondary"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nom du serveur"
                    variant="standard"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    inputProps={{ maxLength: 20 }}
                />

                <TextField
                    color="secondary"
                    margin="dense"
                    id="code"
                    label="Code du serveur"
                    variant="standard"
                    fullWidth
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
                <TextField
                    color="secondary"
                    margin="dense"
                    id="channels"
                    label="Ajouter des salons"
                    variant="standard"
                    fullWidth
                    multiline
                    value={form.channels}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            channels: e.target.value,
                        })
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>
                    Annuler
                </Button>
                <Button color="inherit" onClick={handleSubmit}>
                    Ajouter
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddServerDialog
