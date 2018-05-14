import './style.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Dane Personalne</p>
                <div className="register-login-form-register">
                    <input type="text" placeholder="Imie"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Nazwisko"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Kraj"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" placeholder="Data Urodzenia"  className="register-login-form-register-input"/>
                    <div className="register-login-form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}