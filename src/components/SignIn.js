import React, { Component } from 'react';
import '../styles/Login.css'
import axios from 'axios';

const API_PATH ="http://localhost/Project-Plateforme/src/php/index.php";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            u_password: '',
            email: '',
            u_password_verif: '',
            error: null,
            valueAdded: false
        }
    }
    handleFormSubmit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: `${API_PATH}`,
            headers: {'content-type': 'application/json'},
            data: this.state
        })
        .then(result => {
            this.setState({
                valueAdded: result.data.sent
            })
        })
        .catch(error => this.setState({
            error: error.message
        }))
    }
    render() {
        return (
            <div>
                
                <p>Contact Me</p>
                    <div>
                    <form action="#" >
                     <label>Pseudo</label>
                     <input type="text" id="username" name="username" placeholder="Votre pseudo..."
                       value={this.state.username}
                       onChange={e => this.setState({ username: e.target.value })}
                       required
                     />

                     <label>Email</label>
                     <input type="email" id="email" name="email" placeholder="Votre email"
                       value={this.state.email}
                       onChange={e => this.setState({ email: e.target.value })}
                       required
                     />

                     <label>mot de passe</label>
                     <input type="password" id="password" name="password" required
                       value={this.state.u_password}
                       onChange={e => this.setState({ u_password: e.target.value })}
                     />
                    <label>confirmer le mot de passe</label>
                     <input type="password" id="password_verif" name="password_verif"
                       onChange={e => this.setState({ u_password_verif: e.target.value })}
                       value={this.state.u_password_verif}
                       required
                     />
                     <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                    <div>
                        {this.state.valueAdded && <div>Merci de vous être inscrit !</div>}
                    </div>
                    </form >
                    </div>
            </div>
        );
    }
}

export default SignIn;