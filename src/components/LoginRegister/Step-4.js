import './style.css';
import React, { Component } from 'react';

export default class Step4 extends Component {
    render() {
        return(
            <React.Fragment>
                <p className="register-login-text">Ostatni Krok</p>
                <p className="register-login-text-register-add-picture">Dodaj zdjęcie:</p>
                <button className="btn btn-default register-login-choose-file" onClick={this.props.uploadFile}>Wybierz plik</button>
                <div className="progress register-login-progress-bar-register-upload-picture">
                    <div className="progress-bar-register-upload-picture-status progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                        <span className="sr-only"></span>
                    </div>
                </div>
                <input type="checkbox"/>
                <span> * Zapoznałem się i akceptuję powyższy 
                    <span className="register-login-regular"
                          onClick={this.props.showRegulations}>regulamin.</span>
                </span>
                <input type="file" className="register-login-register-upload-input" onChange={this.props.uploadPicture}/>
            </React.Fragment>
        )
    }
}