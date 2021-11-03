import React, { Component } from 'react';
import '../styles/Header.css';
import { Avatar } from '@material-ui/core';

class Header extends Component {
    render() {
        return (
            <div className="header">

                <div className="header__components">

                    <div className="header__title">
                        <h1>Pando</h1>           
                    </div>
                    <div className="header__avatar">
                        <Avatar className="user__avatar" />
                    </div>


                </div>
            </div>
        );
    }
}

export default Header;