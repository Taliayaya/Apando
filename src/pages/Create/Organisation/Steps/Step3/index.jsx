import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListSubheader,
} from '@mui/material'
import React from 'react'
import { Text } from '../../StyledOrga'
import { CollectionIcon } from '../Step2/Collection/StyleCollection'
import { ServerIcon } from '../Step2/ServerBox/StyleServerBox'

function Step3({ orgaInfo }) {
    const collecNumber = orgaInfo.collections.length
    let subCollecNumber = 0
    orgaInfo.collections.forEach(
        (element) => (subCollecNumber += element.subCollection.length)
    )
    let serverNumber = 0
    orgaInfo.collections.forEach((element) => {
        serverNumber += element.servers.length
        element.subCollection.forEach(
            (sub) => (serverNumber += sub.servers.length)
        )
    })

    return (
        <React.Fragment>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                subheader={<ListSubheader>Résumé</ListSubheader>}
            >
                <ListItem>
                    <ListItemIcon>
                        <CollectionIcon />
                    </ListItemIcon>
                    <Text style={{ margin: 0 }}>
                        {collecNumber} collection{collecNumber > 1 && 's'}
                    </Text>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CollectionIcon />
                    </ListItemIcon>
                    <Text style={{ margin: 0 }}>
                        {subCollecNumber} sous-collection
                        {subCollecNumber > 1 && 's'}
                    </Text>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ServerIcon />
                    </ListItemIcon>
                    <Text style={{ margin: 0 }}>
                        {serverNumber} serveur
                        {serverNumber > 1 && 's'}
                    </Text>
                </ListItem>
            </List>
        </React.Fragment>
    )
}

export default Step3
