import React from 'react'
import { Search } from '@mui/icons-material'

import {
    InputBase,
    List,
    ListItem,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Alert,
    Collapse,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { CollectionIcon } from './JoinStyle'
import Organisation from '../../utils/organisation'

function JoinOrgaForm({ orgaArray }) {
    const [search, setSearch] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState({})
    const [formInput, setFormInput] = React.useState({
        name: '',
        code: '',
    })
    const [feedback, setFeedback] = React.useState(null)

    const handleClickOpen = (name, id) => {
        setOpen(true)
        setSelected({ name: name, id: id })
    }
    const handleClose = () => {
        setOpen(false)

        setSelected({})
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleJoin = async () => {
        setFeedback(null)
        const value = await Organisation.queryServer(
            selected.name,
            formInput.name,
            formInput.code
        )
        console.log(feedback, Boolean(feedback))
        if (!value) {
            setFeedback({
                message: 'Le nom ou le code du serveur est invalide.',
                severity: 'error',
            })
            return
        }
    }

    /**
     * Filter and search organisation as the name is typed
     */
    const filteredSearch =
        orgaArray !== null &&
        orgaArray.filter((orga) => {
            return orga.name.toLowerCase().includes(search.toLocaleLowerCase())
        })
    return (
        <React.Fragment>
            <Paper
                component="form"
                x={{
                    display: 'flex',
                }}
            >
                <InputBase
                    placeholder="Rechercher une Organisation"
                    inputProps={{
                        'aria-label': 'search organisation',
                    }}
                    sx={{ width: 260 }}
                    value={search}
                    onChange={handleSearchChange}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => search.length > 0 && setSearch('')}
                >
                    {search.length > 0 ? <CloseIcon /> : <Search />}
                </IconButton>
            </Paper>

            <List>
                {filteredSearch?.length > 0 &&
                    search.trim().length > 0 &&
                    filteredSearch.map(({ name, id }) => {
                        return (
                            <ListItem key={id}>
                                <ListItemButton
                                    onClick={() => handleClickOpen(name, id)}
                                >
                                    <ListItemIcon>
                                        <CollectionIcon />
                                    </ListItemIcon>
                                    <ListItemText>{name}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Rejoindre un serveur de {selected.name}
                </DialogTitle>
                <DialogContent>
                    Ici tu peux rentrer le code que ton enseignant(e), ton
                    ami(e) ou tes camarades t'ont donné. Courage c'est la
                    dernière étape avant de les rejoindre !
                    <Collapse in={!!feedback}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => setFeedback(null)}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity={feedback?.severity}
                        >
                            {feedback?.message}
                        </Alert>
                    </Collapse>
                    <TextField
                        color="secondary"
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du serveur"
                        variant="standard"
                        fullWidth
                        value={formInput.name}
                        onChange={(e) =>
                            setFormInput({ ...formInput, name: e.target.value })
                        }
                    />
                    <TextField
                        color="secondary"
                        margin="dense"
                        id="name"
                        label="Code du serveur"
                        variant="standard"
                        fullWidth
                        value={formInput.code}
                        onChange={(e) =>
                            setFormInput({ ...formInput, code: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button color="inherit" onClick={handleJoin}>
                        Rejoindre
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default JoinOrgaForm
