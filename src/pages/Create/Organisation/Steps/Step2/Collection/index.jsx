import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import {
    ChipStack,
    ChipTitle,
    CollectionIcon,
    Container,
    Name,
    SMoreVert,
} from './StyleCollection'
import { Add, Delete } from '@mui/icons-material'
import AddCollectionDialog from '../AddCollectionDialog'
import Settings from '@mui/icons-material/Settings'

function Collection({
    name,
    description,
    subCollection,
    depth,
    setDepth,
    handleDelete,
    handleAddSubCollection,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openAdd, setOpenAdd] = React.useState(false)

    const open = Boolean(anchorEl)
    const hasChildren = subCollection.length > 0
    const handleClick = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const handleCloseDialog = () => setOpenDialog(false)

    const handleSubmitDialog = () => {
        handleDelete(name)
        handleCloseDialog()
    }

    const updateDepth = () => {
        const newDepth = depth.concat([name])
        setDepth(newDepth)
    }
    const setDepthToSubCollection = (subName) => {
        const newDepth = depth.concat([name, subName])
        setDepth(newDepth)
    }

    const handleDeleteSafety = () => {
        if (hasChildren) {
            setOpenDialog(true)
            return
        }
        handleDelete(name)
    }

    return (
        <Container>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs onClick={updateDepth}>
                        <Tooltip title="Collection">
                            <CollectionIcon color="inherit" />
                        </Tooltip>
                        <Name>{name}</Name>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="more"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <SMoreVert />
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography
                    color="text.secondary"
                    variant="body2"
                    onClick={updateDepth}
                >
                    {description}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <ChipTitle>
                            {depth.length === 0
                                ? 'Sous-collections'
                                : 'Serveurs'}
                        </ChipTitle>
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title={
                                depth.length === 0
                                    ? 'Ajouter une sous-collection'
                                    : 'Ajouter un serveur'
                            }
                        >
                            <IconButton onClick={() => setOpenAdd(true)}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <ChipStack>
                    {subCollection.length > 0 ? (
                        subCollection?.map((params) => (
                            <Chip
                                label={params.name}
                                key={params.name}
                                onClick={() =>
                                    setDepthToSubCollection(params.name)
                                }
                                style={{ margin: '5px' }}
                            />
                        ))
                    ) : (
                        <Typography color="text.secondary" variant="body2">
                            {depth.length === 0
                                ? 'Aucune sous-collection'
                                : 'Aucun serveur'}
                        </Typography>
                    )}
                </ChipStack>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleDeleteSafety}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Supprimer</Typography>
                </MenuItem>
                <MenuItem onClick={updateDepth}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Voir</Typography>
                </MenuItem>
            </Menu>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Supprimer la collection ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La collection possède des sous-collections. En la
                        supprimant, les sous-collections seront elles-aussi
                        supprimées. Souhaitez-vous poursuivre ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleCloseDialog}>
                        Annuler
                    </Button>
                    <Button color="inherit" onClick={handleSubmitDialog}>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            <AddCollectionDialog
                onClose={() => setOpenAdd(false)}
                collections={[]}
                open={openAdd}
                message={`Ajouter une collection à ${name}`}
                setCollections={(newCollection) => {
                    handleAddSubCollection(newCollection[0], name)
                }}
            />
        </Container>
    )
}

Collection.propTypes = {
    /**
     * The collection's name
     */
    name: PropTypes.string,
    /**
     * Sort text to describes the collection
     */
    description: PropTypes.string,
    /**
     * An array containing subCollections
     */
    subCollection: PropTypes.array,
    /**
     * How deep the user is
     *
     * e.g. Collection > SubCollection > Server
     */
    depth: PropTypes.array,
    /**
     * A function to delete the current collection
     */
    handleDelete: PropTypes.func,
}

export default Collection
