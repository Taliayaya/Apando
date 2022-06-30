import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import Collection from './Collection'
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
    },
    {
        name: 'Première',
        description: 'moi avant',
        subCollection: [],
    },
]
const collectionsTest = [
    {
        name: 'Lycée',
        description: '',
        subCollection: subCollectionTemplate,
    },
    { name: 'Collège', description: 'Pour le collège', subCollection: [] },
    { name: 'Primaire', description: 'Pour le primaire', subCollection: [] },
]

function Step2({ orgaInfo, setOrgaInfo }) {
    const [collections, setCollections] = React.useState(collectionsTest)
    const [depth, setDepth] = React.useState([])

    const subCollections =
        depth.length > 0 &&
        collections.filter((value) => value.name === depth[0])[0].subCollection

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
            display = subCollections
            break
        case 2:
            display = subCollections
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
                    />
                ))}
                <AddCollectionDiv>
                    <AddRoundedStyle sx={{ fontSize: 100 }} />
                    <Typography
                        style={{ marginTop: '10px' }}
                        color="text.secondary"
                    >
                        Ajouter une collection
                    </Typography>
                </AddCollectionDiv>
            </CollectionsContainer>
        </React.Fragment>
    )
}

export default Step2
