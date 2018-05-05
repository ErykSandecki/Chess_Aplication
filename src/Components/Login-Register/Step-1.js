import './index.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Tworzenie Konta</p>
                <div className="register-login-form-register">
                    <input type="text" placeholder="Nazwa Użytkownika"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="E-mail"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="password" placeholder="Hasło"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="password" placeholder="Powtórz Hasło"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}