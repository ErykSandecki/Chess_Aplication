import './index.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Tworzenie Konta</p>
                <div className="form-register">
                    <input type="text" placeholder="Nazwa Użytkownika"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="E-mail"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="password" placeholder="Hasło"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="password" placeholder="Powtórz Hasło"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}