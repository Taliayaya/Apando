import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'
import { Container, Image404, NotFoundTitle } from './StyleNotFound'

function NotFound() {
    const navigate = useNavigate()
    return (
        <BackgroundAnimation sakura={true}>
            <Header authLinks={true} />
            <Container>
                <Image404 />
                <NotFoundTitle>
                    Oupsss, il semblerait que tu te sois perdue dans cette
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
        </BackgroundAnimation>
    )
}

export default NotFound
