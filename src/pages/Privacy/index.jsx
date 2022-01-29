import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { theme } from '../../utils/style/colors'
import { StyledLoginPage } from '../../utils/style/LoginSignStyle'
import { WaveJoin } from '../Join/JoinStyle'
import { HomePage, LastModif, StyledH2, StyledSection } from './StyledPrivacy'

const Privacy = () => {
    return (
        <>
            <Header />
            <StyledLoginPage style={{ marginTop: '-50px', width: '100%' }}>
                <div>
                    <HomePage>
                        <h1
                            style={{
                                color: theme.font_color,
                                paddingTop: '30px',
                                textAlign: 'center',
                            }}
                        >
                            Conditions d'Utilisation de Pando
                        </h1>
                        <LastModif>
                            <strike>
                                Dernière mise à jour et entrée en vigueur :
                            </strike>{' '}
                            En construction
                        </LastModif>
                        <StyledSection>
                            <StyledH2>
                                Bienvenue sur la plateforme Pando
                            </StyledH2>
                            Pando est un service de communication en ligne
                            disponible via le site web Pando pour les
                            utilisateurs du service et géré par l'EDITEUR. Cette
                            Politique de Confidentialité présente notre
                            politique quant-à l'utilisation et le respect des
                            informations recueillies auprès des utilisateurs.
                            /!\ ZONE EN CONSTRUCTION
                        </StyledSection>
                    </HomePage>
                </div>
                <WaveJoin />
                <Footer />
            </StyledLoginPage>
        </>
    )
}

export default Privacy
