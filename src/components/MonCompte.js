import React, { Component } from "react";
import { Avatar } from '@material-ui/core';

export default class MonCompte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...JSON.parse(localStorage.getItem('user_data'))
        }
    }
    logout = () => {
        localStorage.removeItem('online');
        localStorage.removeItem('user_data');
    }
    
    render() {
    return (
      <div>
          {console.log(this.state.avatar)}
        <div className="compte">
          <h1>Mon compte</h1>
          <div>
            <Avatar src={`http://localhost/Project-Plateforme/src/images/avatars/${this.state.avatar}`}/>
            <div id="pseudo">{this.state.pseudo}</div>
            <div id="mail">{this.state.mail}</div>
          </div>
        </div>
        <div className="password">
          <h1>Mot de passe</h1>
          <button>Changer le mot de passe</button>
          <button onClick={this.logout}>Logout</button>
          <button>Supprimer le compte</button>
        </div>
      </div>
    );
  }
}
