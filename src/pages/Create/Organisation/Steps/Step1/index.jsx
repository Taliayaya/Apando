import { Autorenew, ExpandMore, Tag } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormHelperText,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material'
import React from 'react'
import { Text } from '../../StyledOrga'

export default ({ orgaInfo, setOrgaInfo }) => {
    const [expanded, setExpanded] = React.useState(false)

    const handleAccordions = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handleChange = (props) => (e) => {
        setOrgaInfo({ ...orgaInfo, [props]: e.target.value })
    }
    return (
        <React.Fragment>
            <TextField
                label="Nom de l'organisation"
                value={orgaInfo.name}
                onChange={handleChange('name')}
                autoFocus
                inputProps={{
                    maxLength: 30,
                    minLength: 4,
                }}
            />
            <Text>Choisissez le nom de votre Organisation</Text>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleAccordions('panel1')}
                style={{ maxWidth: '400px' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    color="primary"
                    aria-controls="panel1bh-content"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Paramètres des Serveurs
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Modifier les paramètres globaux des serveurs
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Domaine"
                        variant="standard"
                        color="secondary"
                        aria-describedby="domain-helper"
                        value={orgaInfo.domain}
                        onChange={handleChange('domain')}
                        margin="normal"
                        helperText="Seules les adresses mails avec le domaine indiquée
                        pourront rejoindre les serveurs. 
                        Laisser vide pour tout accepter"
                        placeholder="e.g. gmail.com ou vide "
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    @
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Méthode pour rejoindre"
                        variant="standard"
                        color="secondary"
                        select
                        aria-describedby="domain-helper"
                        value={orgaInfo.jointype}
                        onChange={handleChange('jointype')}
                        marin="normal"
                        helperText="Sur Demande : La confirmation d'un administrateur 
                        est nécessaire pour rejoindre un serveur"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Autorenew />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="auto">Automatiquement</MenuItem>
                        <MenuItem value="manual">Sur Demande</MenuItem>
                    </TextField>
                    <TextField
                        label="Salons par défaut"
                        variant="standard"
                        color="secondary"
                        value={orgaInfo.channels}
                        onChange={handleChange('channels')}
                        margin="normal"
                        helperText="Les salons à ajouter par défaut. Plusieurs salons peuvent être ajouté en les séparant par des espaces / virgules...
                        D'autres salons pourront être ajoutés spécifiquement plus tard"
                        placeholder="e.g. Bienvenue Général Aide "
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tag />
                                </InputAdornment>
                            ),
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}
