import React from "react";
import "../styles/Login.css";
import Login from "./Login";
import SignIn from "./SignIn";

export default class LoginSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      formShowed: 0,
    };
  }
  showLogin = () => {
    this.setState({ formShowed: 0 });
  };
  showSignIn = () => {
    this.setState({ formShowed: 1 });
  };

  render() {
    // On définit les classes de base
    let loginClassName = "login__button";
    let signinClassName = "signin__button";
    if (this.state.formShowed === 0) {
      // On ajoute la classe selected et on réinitialise l'autre
      loginClassName += " selected";
      signinClassName = "signin__button";
    } else {
      // same but reversed
      signinClassName += " selected";
      loginClassName = "login__button";
    }
    return (
      <div className="login__page">
        <h1 className="header__title">Pando</h1>
        <div className="wrapper">
          <div className="swap">
            <p className={loginClassName} onClick={this.showLogin}>
              Connexion
            </p>
            <p className={signinClassName} onClick={this.showSignIn}>
              Inscription
            </p>
          </div>
          {this.state.formShowed === 0 ? (
            <Login
              online={this.state.online}
              toggleOnline={this.state.toggleOnline}
              toggleSignIn={this.state.toggleSignIn}
            />
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    );
  }
}
