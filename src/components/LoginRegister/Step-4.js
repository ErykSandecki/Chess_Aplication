import './style.css';
import React, { Component } from 'react';

export default class Step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureFile: null,
            acceptanceRegulation: false,
        }
        this.sendValue = this.sendValue.bind(this);
        this.upload = React.createRef();
        this.sendValue = this.sendValue.bind(this);
    }

    sendValue() {
        this.props.getValueTheStepRegister(0, this.state);
    }

    setEvent = () => {
        this.upload.current.click();
    }

    uploadPicture = (e) => {this.setState({pictureFile: e.target.files[0]})};

    setAcceptanceRegulation = (e) => {this.setState({acceptanceRegulation: !this.state.acceptanceRegulation})};

    render() {
        return(
            <React.Fragment>
                <p className="register-login-text">Ostatni Krok</p>
                <p className="register-login-text-register-add-picture">Dodaj zdjęcie:</p>
                <button className="btn btn-default register-login-choose-file" 
                        onClick={this.setEvent}
                >
                    Wybierz plik
                </button>
                <div className="progress register-login-progress-bar-register-upload-picture">
                    <div className="progress-bar-register-upload-picture-status progress-bar progress-bar-success progress-bar-striped" 
                         style={{width: this.props.widthBar}}
                         role="progressbar" 
                         aria-valuenow="40" 
                         aria-valuemin="0" 
                         aria-valuemax="100"
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
                <input 
                    type="checkbox"
                    onChange={this.setAcceptanceRegulation}
                />
                <span> * Zapoznałem się i akceptuję powyższy 
                    <span className="register-login-regular"
                          onClick={this.props.showRegulations}> regulamin.</span>
                </span>
                <input type="file" 
                       className="register-login-register-upload-input" 
                       onChange={this.uploadPicture}
                       ref={this.upload}/>
                <button className="register-login-button-register-login-last-step btn btn-success" 
                        onClick={()=>{
                                      this.sendValue();
                                      this.props.nextStep();
                                     }
                                }
                >
                    Zarejestruj
                </button>
                
            </React.Fragment>
        )
    }
}
