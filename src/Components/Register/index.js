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
                    <input className="input-register"/>
                    <p>Email</p>
                    <span className="glyphicon glyphicon-envelope"></span>
                    <input className="input-register"/>
                    <p>Nazwa użytkownika</p>
                    <span className="glyphicon glyphicon-eye-open"></span>
                    <input className="input-register"/>
                    <p>Hasło</p>
                    <span className="glyphicon glyphicon-lock"></span>
                    <input className="input-register"/>
                    <p>Powtórz hasło</p>
                    <span className="glyphicon glyphicon-lock"></span>
                    <input className="input-register"/>
                </div>
            </div>
        )
    }
}