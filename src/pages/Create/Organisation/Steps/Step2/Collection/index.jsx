import React from 'react'
import PropTypes from 'prop-types'
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material'
import {
    ChipStack,
    ChipTitle,
    Container,
    Name,
    SMoreVert,
} from './StyleCollection'

function Collection({ name, description, subCollection, depth, setDepth }) {
    const updateDepth = () => {
        const newDepth = depth.concat([name])
        setDepth(newDepth)
    }
    const setDepthToSubCollection = (subName) => {
        const newDepth = depth.concat([name, subName])
        setDepth(newDepth)
    }
    return (
        <Container>
            <Box sx={{ my: 3, mx: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs onClick={updateDepth}>
                        <Name>{name}</Name>
                    </Grid>
                    <Grid item>
                        <SMoreVert />
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
                <ChipTitle>Sous-collections</ChipTitle>
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
                            Aucune sous-collection
                        </Typography>
                    )}
                </ChipStack>
            </Box>
        </Container>
    )
}

Collection.propTypes = {
    name: PropTypes.string,
}

export default Collection
