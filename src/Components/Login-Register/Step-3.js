import './index.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Dane Opcjonalne</p>
                <div className="register-login-form-register">
                    <input type="text" placeholder="Miasto"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Region"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Telefon"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Osoba Polecająca"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}