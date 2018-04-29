import './index.css';

import React, { Component } from 'react';

export default class Register extends Component {
    render() {
        return(
            <div>
                <div className="hide-body"/>
                <div className="register">
                    <p>Imię</p>
                    <span className="glyphicon glyphicon-user"></span>
                    <input/>
                    <p>Email</p>
                    <span className="glyphicon glyphicon-envelope"></span>
                    <input/>
                    <p>Nazwa użytkownika</p>
                    <span className="glyphicon glyphicon-eye-open"></span>
                    <input/>
                    <p>Hasło</p>
                    <span className="glyphicon glyphicon-lock"></span>
                    <input/>
                    <p>Powtórz hasło</p>
                    <span className="glyphicon glyphicon-lock"></span>
                    <input/>
                </div>
            </div>
        )
    }
}