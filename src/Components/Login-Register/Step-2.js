import './index.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Dane Personalne</p>
                <div className="form-register">
                    <input type="text" placeholder="Imie"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Nazwisko"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Kraj"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Data Urodzenia"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}