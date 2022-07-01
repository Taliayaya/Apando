import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material'

function AddServerDialog({ open, onClose, title, handleAddServer }) {
    const [form, setForm] = React.useState({
        name: '',
        code: '',
        domain: '',
        jointype: 'manual',
        channels: '',
    })

    const handleSubmit = () => {
        handleAddServer(form)
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
