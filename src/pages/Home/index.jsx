import React from 'react'
import Footer from '../../components/Footer'
import mascottoCute from '../../assets/images/mascotteCute.png'
import {
    FirstContentContainer,
    FirstDiagonalBox,
    Container,
    Slogan,
    SecondDiagonalBox,
    SecondContentContainer,
    DiagonalBoxContainr,
    MiddleContents,
    LastContainer,
    JoinApandoContainer,
    AuthButtonContainer,
    MascotteCute,
} from './HomeStyle'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'

function Home() {
    const navigate = useNavigate()
    return (
        <>
            <BackgroundAnimation sakura={true}>
                <Header authLinks={true} />
            </BackgroundAnimation>
            <Container>
                <DiagonalBoxContainr>
                    <FirstDiagonalBox>
                        <FirstContentContainer>
                            <Slogan>
                                La plateforme de communication faite pour les
                                étudiants, par des étudiants.
                            </Slogan>
                        </FirstContentContainer>
                    </FirstDiagonalBox>
                    <MiddleContents>
                        <SecondContentContainer>
                            <Slogan
                                style={{ maxWidth: '50em', marginTop: '10em' }}
                            >
                                Créez des serveurs pour retrouver vos camarades{' '}
                                &amp; Organisez des groupes de discussion tout
                                en gardant le contrôle.
                            </Slogan>
                        </SecondContentContainer>
                    </MiddleContents>
                    <SecondDiagonalBox>
                        <SecondContentContainer>
                            <Slogan>
                                Retrouvez vos fonctionnalités préférées :
                                Markdown, Latex... sont au rendez-vous.
                            </Slogan>
                        </SecondContentContainer>
                    </SecondDiagonalBox>
                    <LastContainer>
                        <JoinApandoContainer>
                            <Slogan>
                                Il est temps !
                                <AuthButtonContainer>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/login')}
                                        size="large"
                                    >
                                        Se connecter
                                    </Button>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        onClick={() => navigate('/signup')}
                                    >
                                        S'inscrire
                                    </Button>
                                </AuthButtonContainer>
                            </Slogan>
                            <MascotteCute
                                src={mascottoCute}
                                alt="La mascotte"
                            />
                        </JoinApandoContainer>
                    </LastContainer>
                    <Footer />
                </DiagonalBoxContainr>
            </Container>
            {/* <WaveHome /> */}
        </>
    )
}

export default Home
