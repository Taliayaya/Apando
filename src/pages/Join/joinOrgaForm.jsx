import React from 'react'
import { Search } from '@mui/icons-material'

import {
    InputBase,
    List,
    ListItem,
    Paper,
    Typography,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
function JoinOrgaForm({ orgaArray }) {
    const [search, setSearch] = React.useState('')

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
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
                                <Typography>{name}</Typography>
                            </ListItem>
                        )
                    })}
            </List>
        </React.Fragment>
    )
}

export default JoinOrgaForm
