import React, { Component } from 'react';
import MonCompte from './MonCompte';
import ProfileUtilisateur from './ProfileUtilisateur';

export default class Profile extends Component {
    render() {
        return (
            <div className="">
                <MonCompte />
                <ProfileUtilisateur />
            </div>
        );
    }
}



