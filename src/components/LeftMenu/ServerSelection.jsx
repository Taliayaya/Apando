import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { ExpandMore } from '@mui/icons-material'
import DisplayServerList from './DisplayServerList'

function ServerSelection({ serverList, handleServerSelect, orgaServers }) {
    const [open, setOpen] = React.useState(false)
    const handleSelect = (id, name, isSubServer = false) => {
        handleServerSelect(id, name, isSubServer)
        handleClose()
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Changer de Serveur</Button>
            <Dialog onClose={handleClose} open={open} scroll="paper">
                <DialogTitle>Selectionner un serveur</DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{ paddingBottom: 1 }}
                        color="text.secondary"
                        variant="body1"
                    >
                        Organisations
                    </Typography>
                    <Divider />
                    {orgaServers.map(({ name, servers }) => (
                        <Accordion sx={{ marginTop: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                {name}
                            </AccordionSummary>
                            <AccordionDetails>
                                <DisplayServerList
                                    serverList={servers}
                                    handleSelect={handleSelect}
                                    isSubServer={name}
                                />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <Typography
                        sx={{ paddingTop: 2, paddingBottom: 1 }}
                        color="text.secondary"
                        variant="body1"
                    >
                        Serveurs
                    </Typography>
                    <Divider />
                    <DisplayServerList
                        serverList={serverList}
                        handleSelect={handleSelect}
                    />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

ServerSelection.propTypes = {
    handleServerSelect: PropTypes.func.isRequired,
    serverList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}

export default ServerSelection
