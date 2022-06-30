import { TextField } from '@mui/material'
import React from 'react'
import { Text } from '../../StyledOrga'

export default ({ orgaInfo, setOrgaInfo }) => {
    const handleChange = (e) => {
        setOrgaInfo({ ...orgaInfo, name: e.target.value })
    }
    return (
        <React.Fragment>
            <TextField
                label="Nom de l'organisation"
                value={orgaInfo.name}
                onChange={handleChange}
            />
            <Text>Choisissez le nom de votre Organisation</Text>
        </React.Fragment>
    )
}
