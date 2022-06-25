import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Backgrounds from '../../components/Backgrounds'
import Header from '../../components/Header'
import { useAuth } from '../../utils/hooks'
import { Container, Image404, NotFoundTitle } from './StyleNotFound'

function NotFound() {
    const navigate = useNavigate()
    const { themeUsed } = useAuth()
    return (
        <ThemeProvider theme={themeUsed}>
            <Backgrounds sakura={true}>
                <Header authLinks={true} />
                <Container>
                    <Image404 />
                    <NotFoundTitle>
                        Oupsss, il semblerait que tu te sois perdu dans cette
                        forêt.
                    </NotFoundTitle>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/app')}
                    >
                        Revenir à l'app
                    </Button>
                </Container>
            </Backgrounds>
        </ThemeProvider>
    )
}

export default NotFound
