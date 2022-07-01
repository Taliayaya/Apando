import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import AddCollectionDialog from './AddCollectionDialog'
import AddServerDialog from './AddServerDialog'
import Collection from './Collection'
import ServerBox from './ServerBox'
import {
    AddCollectionDiv,
    AddRoundedStyle,
    BreadText,
    CollectionsContainer,
} from './StyleStep2'

const subCollectionTemplate = [
    {
        name: 'Terminal',
        description: 'Les bests',
        subCollection: [],
        servers: [],
    },
    {
        name: 'Première',
        description: 'moi avant',
        subCollection: [],
        servers: [],
    },
]
const collectionsTest = [
    {
        name: 'Lycée',
        description: '',
        subCollection: subCollectionTemplate,
        servers: [],
    },
    {
        name: 'Collège',
        description: 'Pour le collège',
        subCollection: [],
        servers: [],
    },
    {
        name: 'Primaire',
        description: 'Pour le primaire',
        subCollection: [],
        servers: [],
    },
]

function Step2({ orgaInfo, setOrgaInfo }) {
    const [collections, setCollections] = React.useState(collectionsTest)
    const [depth, setDepth] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [openServerDialog, setOpenServerDialog] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseServerDialog = () => setOpenServerDialog(false)

    const subCollections =
        depth.length > 0 &&
        collections.filter((value) => value.name === depth[0])[0]

    const servers =
        depth.length === 2 &&
        subCollections.filter((value) => value.name === depth[2])
    console.log(depth)
    let display
    switch (depth.length) {
        case 0:
            display = collections
            break
        case 1:
            display = subCollections.subCollection
            break
        case 2:
            display = subCollections.subCollection
            break
        default:
            display = collections

            break
    }

    const handleBreadcrumbsClick = (index) => {
        const newDepth = depth.slice(0, index)
        console.log(newDepth)
        setDepth(newDepth)
    }

    const handleDeleteCollection = (name) => {
        const newArray = collections.filter((values) => name !== values.name)
        setCollections(newArray)
    }

    const handleAddSubCollection = (newCollection, parent) => {
        collections
            .find((element) => element.name === parent)
            .subCollection.push(newCollection)

        console.log('collections', collections)
        setCollections(collections)
    }

    const handleAddServer = (serverInfo) => {
        collections
            .find((element) => element.name === depth[0])
            .servers.push(serverInfo)

        console.log(collections)
        setCollections(collections)
    }

    return (
        <React.Fragment>
            {/* <h2>Ajouter des serveurs</h2> */}
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNext fontSize="small" />}
            >
                <BreadText
                    underline="hover"
                    key="1"
                    color="inherit"
                    onClick={() => setDepth([])}
                >
                    {orgaInfo.name}
                </BreadText>
                {depth.map((name, index) => (
                    <BreadText
                        underline="hover"
                        key={index + 2}
                        color="inherit"
                        onClick={() => handleBreadcrumbsClick(index + 1)}
                    >
                        {name}
                    </BreadText>
                ))}
            </Breadcrumbs>
            <CollectionsContainer>
                {display.map(({ name, description, subCollection }) => (
                    <Collection
                        name={name}
                        key={name}
                        description={description}
                        subCollection={subCollection}
                        depth={depth}
                        setDepth={setDepth}
                        handleDelete={handleDeleteCollection}
                        handleAddSubCollection={handleAddSubCollection}
                    />
                ))}
                {depth.length > 0 &&
                    subCollections.servers.map((server) => (
                        <ServerBox {...server} />
                    ))}
                {depth.length < 2 && (
                    <AddCollectionDiv onClick={() => setOpen(true)}>
                        <AddRoundedStyle sx={{ fontSize: 100 }} />
                        <Typography
                            style={{ marginTop: '10px' }}
                            color="text.secondary"
                        >
                            Ajouter une collection
                        </Typography>
                    </AddCollectionDiv>
                )}
                {depth.length > 0 && (
                    <AddCollectionDiv onClick={() => setOpenServerDialog(true)}>
                        <AddRoundedStyle sx={{ fontSize: 100 }} />
                        <Typography
                            style={{ marginTop: '10px' }}
                            color="text.secondary"
                        >
                            Ajouter un serveur
                        </Typography>
                    </AddCollectionDiv>
                )}
                <AddCollectionDialog
                    open={open}
                    onClose={handleClose}
                    collections={collections}
                    setCollections={setCollections}
                />
                <AddServerDialog
                    open={openServerDialog}
                    onClose={handleCloseServerDialog}
                    handleAddServer={handleAddServer}
                />
            </CollectionsContainer>
        </React.Fragment>
    )
}

export default Step2
