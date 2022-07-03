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
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import {
    ChipStack,
    ChipTitle,
    Container,
    Name,
    SMoreVert,
} from '../Collection/StyleCollection'
import { Add, Delete } from '@mui/icons-material'
import { ServerIcon } from './StyleServerBox'

function ServerBox({
    name,
    description,
    handleDelete,
    channels,
    handleAddChannelToServer,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openAdd, setOpenAdd] = React.useState(false)
    const [newChannel, setNewChannel] = React.useState('')

    const open = Boolean(anchorEl)
    const handleClick = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const handleCloseDialog = () => setOpenDialog(false)

    const handleDeleteSafety = () => {
        handleDelete(name)
    }

    return (
        <Container>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Tooltip title="Server">
                            <ServerIcon />
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
                <Typography color="text.secondary" variant="body2">
                    {description}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <ChipTitle>Salons</ChipTitle>
                    </Grid>
                    <Grid item>
                        <Tooltip title={'Ajouter un salon'}>
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <ChipStack>
                    {channels.length > 0 ? (
                        channels.map((params) => (
                            <Chip
                                label={params}
                                key={params}
                                style={{ margin: '5px' }}
                            />
                        ))
                    ) : (
                        <Typography color="text.secondary" variant="body2">
                            Aucun salon
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
            </Menu>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajouter un salon à {name}</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="standard"
                        value={newChannel}
                        onChange={(e) => setNewChannel(e.target.value)}
                        inputProps={{ maxLength: 20 }}
                        fullWidth
                        color="secondary"
                        label="Nom du salon"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleCloseDialog}>
                        Annuler
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() =>
                            handleAddChannelToServer(name, newChannel)
                        }
                    >
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

ServerBox.propTypes = {
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

export default ServerBox
