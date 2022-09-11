import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import './FooterStyle.css'

const StyledFooterLink = styled(Link)`
    color: #737373;
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
        color: #3366cc;
        text-decoration: none;
    }
`

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__addr">
                <h1 className="footer__logo">Apando</h1>
                <h6>Contact</h6>
                <address>
                    <a
                        className="footer__btn"
                        href="mailto:apando.contact@gmail.com"
                    >
                        Nous contacter
                    </a>
                </address>
            </div>
            <ul className="footer__nav">
                <li className="nav__item">
                    <h6 className="nav__title">Entreprise</h6>

                    <ul className="nav__ul">
                        <li>
                            <a href="https://discord.gg/uHjC3bZKT4">
                                Participer au développement
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Taliayaya/Project-Plateforme">
                                Espace actualité et dernières mises à jour
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav__item nav__item--extra">
                    <h6 className="nav__title">Ressources</h6>

                    <ul className="nav__ul">
                        <li>
                            <a href="https://github.com/Taliayaya/Project-Plateforme">
                                Github
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.gg/uHjC3bZKT4">Discord</a>
                        </li>
                    </ul>
                </li>

                <li className="nav__item">
                    <h6 className="nav__title">Chartes</h6>
                    <ul className="nav__ul">
                        <li>
                            <StyledFooterLink to="/terms">
                                Conditions d'utilisation
                            </StyledFooterLink>
                        </li>
                        <li>
                            <StyledFooterLink to="/privacy">
                                Confidentialité
                            </StyledFooterLink>
                        </li>
                    </ul>
                </li>
            </ul>
            <hr />
            <div className="legal">
                <p>&copy; 2021-2022 Apando. Tous droits réservés.</p>
            </div>
        </footer>
    )
}
