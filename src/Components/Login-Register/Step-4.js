import './index.css';
import React, { Component } from 'react';
import Regulations from './Regulations.js';

export default class Step4 extends Component {
    render() {
        return(
            <React.Fragment>
                <p className="register-login-text-upload-picture">Dodaj zdjęcie</p>
                <div className="progress progress-bar-register-upload-picture">
                    <div className="progress-bar-register-upload-picture-status progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                        <span className="sr-only"></span>
                    </div>
                </div>
                <p className="text-register-add-picture">Dodaj zdjęcie</p>
                <button className="btn btn-default choose-file" onClick={this.props.uploadFile}>Wybierz plik</button>
                <div className="register-regular"><Regulations/></div>
                <input type="checkbox"/>
                <span> * Zapoznałem się i akceptuję powyższy regulamin.</span>
                <input type="file" className="register-upload-input" onChange={this.props.uploadPicture}/>
            </React.Fragment>
        )
    }
}
