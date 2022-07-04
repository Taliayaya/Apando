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
    setFeedback,
    collectionNameTaken,
    setCollectionNameTaken,
}) {
    const [form, setForm] = React.useState({
        name: '',
        description: '',
        subCollection: [],
        servers: [],
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
        if (collectionNameTaken.includes(form.name)) {
            setFeedback({
                message: 'Chaque collection doit avoir un nom unique !',
                severity: 'error',
            })
            return
        }
        const newCollections = collections
        const newArray = collectionNameTaken
        newCollections.push(form)
        newArray.push(form.name)
        setCollectionNameTaken(newArray)
        setCollections(newCollections)
        onClose()
        setFeedback({
            message: `Collection ${form.name} ajoutée !`,
        })
        setForm({ name: '', description: '', subCollection: [], servers: [] })
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
