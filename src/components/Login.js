import axios from "axios";
import React, { Component } from "react";
import "../styles/Login.css";

// Chemin d'accès vers le fichier PHP traitant le login
const API_LOGIN_PATH = "http://localhost/Project-Plateforme/src/php/login.php";
class Login extends Component {
  constructor(props) {
    super(props);
    // On ajoute ici les props existant
    this.parent = {
      ...props,
    };
    // On crée nos props ici
    this.state = {
      username_or_email: "",
      u_password: "",
      error: null,
      online: false,
    };
  }
  // Fonction qui s'active lorsqu'on envoie le formulaire
  handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // On envoie les données au php avec axios
    axios({
      method: "post",
      url: `${API_LOGIN_PATH}`,
      headers: { "content-type": "application/json" },
      // Les données à envoyer
      data: this.state,
    })
      // Après être passé par le php, on récup les infos
      .then((result) => {
        this.setState({
          online: result.data.logged,
        });
        {
          this.state.online ? this.parent.toggleOnline() : "";
        }
      })
      .catch((error) =>
        this.setState({
          error: error.message,
        })
      );
  }
  render() {
    return (
      <div className="login__page">
        <h1 className="header__title">Pango</h1>
        <div className="wrapper">
          <h2 className="login__title">Se connecter</h2>
          {/* Quand on clique dessus, active le signup form*/}
          <p onClick={this.parent.toggleSignIn}>S'inscrire</p>
          <form action="#">
            <div className="field">
              <input
                type="text"
                name="username_or_email"
                required
                value={this.state.username_or_email}
                onChange={(e) =>
                  this.setState({ username_or_email: e.target.value })
                }
              />
              <label>e-mail ou pseudo</label>
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                required
                value={this.state.u_password}
                onChange={(e) => this.setState({ u_password: e.target.value })}
              />
              <label>mot de passe</label>
            </div>
            <input type="checkbox" value="Rester connecté" />
            <div className="field">
              <input
                type="submit"
                onClick={(e) => this.handleFormSubmit(e)}
                value="Valider"
              />
            </div>
            {this.props.online && <div>Logged in</div>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
