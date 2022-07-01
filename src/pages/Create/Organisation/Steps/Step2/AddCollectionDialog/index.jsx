import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material'

function AddCollectionDialog({
    open,
    onClose,
    collections,
    setCollections,
    message,
}) {
    const [form, setForm] = React.useState({
        name: '',
        description: '',
        subCollection: [],
    })

    const handleChangeName = (event) => {
        const { value } = event.target
        setForm({
            ...form,
            name: value,
        })
    }

    const handleChangeDesc = (event) => {
        setForm({
            ...form,
            description: event.target.value,
        })
    }

    const handleSubmit = () => {
        const newCollections = collections
        newCollections.push(form)
        setCollections(newCollections)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{message ?? 'Ajouter une collection'}</DialogTitle>
            <DialogContent>
                <TextField
                    color="secondary"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nom de la collection"
                    variant="standard"
                    fullWidth
                    value={form.name}
                    onChange={handleChangeName}
                    inputProps={{ maxLength: 20 }}
                />
                <TextField
                    color="secondary"
                    margin="dense"
                    id="description"
                    label="Description"
                    variant="standard"
                    multiline
                    fullWidth
                    inputProps={{ maxLength: 300 }}
                    value={form.description}
                    onChange={handleChangeDesc}
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

export default AddCollectionDialog
