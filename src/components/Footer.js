import React from "react";
import '../styles/Footer.css';

export default function Footer() {
  return (
  <footer className="footer">
    <div className="footer__addr">
      <h1 className="footer__logo">Pando</h1>
      <h6>Contact</h6>
      <address>
        <a className="footer__btn" href="mailto:e.mayeux.ilan@bs78.org">
          Email Us
        </a>
      </address>
    </div>
    <ul className="footer__nav">
      <li className="nav__item">
        <h6 className="nav__title">Entreprise</h6>

        <ul className="nav__ul">
          <li>
            <a href="#">À propos</a>
          </li>
          <li>
            <a href="https://discord.gg/uHjC3bZKT4">Emplois</a>
          </li>
          <li>
            <a href="https://github.com/Taliayaya/Project-Plateforme">
              Espace actualités
            </a>
          </li>
        </ul>
      </li>

      <li className="nav__item nav__item--extra">
        <h6 className="nav__title">Ressources</h6>

        <ul className="nav__ul nav__ul--extra">
          <li>
            <a href="#">Html</a>
          </li>
          <li>
            <a href="#">Css</a>
          </li>
          <li>
            <a href="#">React</a>
          </li>
          <li>
            <a href="#">Php</a>
          </li>
          <li>
            <a href="https://github.com/Taliayaya/Project-Plateforme">Github</a>
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
            <a href="#">Conditions</a>
          </li>
          <li>
            <a href="#">Confidentialité</a>
          </li>
          <li>
            <a href="#">Paramètres des cookies</a>
          </li>
          <li>
            <a href="#">Charte d'utilisation</a>
          </li>
          <li>
            <a href="#">Remerciements</a>
          </li>
          <li>
            <a href="#">Licences</a>
          </li>
          <li>
            <a href="#">Modération</a>
          </li>
        </ul>
      </li>
    </ul>
    <hr/>
    <div className="legal">
      <p>&copy; 2021 Pando. Tous droits réservés.</p>

      <div className="legal__links">
        <span>Fait avec <span className="heart">♥</span> depuis ma chambre</span>
      </div>
    </div>
  </footer>
  );
}
