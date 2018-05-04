import './index.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Dane Opcjonalne</p>
                <div className="form-register">
                    <input type="text" placeholder="Miasto"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Region"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Telefon"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                    <input type="text" placeholder="Osoba Polecająca"  className="form-register-input"/>
                    <div className="form-register-underline"></div>
                </div>
            </React.Fragment>
        )
    }
}