import './style.css';
import React, { Component } from 'react';
import logoUser from '../../Images/users-login.png';
import completeLogo from '../../Images/register-accepted.png';
import {addUser, sendReferencePicture, tryLoginUser} from '../../Firebase/index.js';
import Step1 from './Step-1.js';
import Step2 from './Step-2.js';
import Step3 from './Step-3.js';
import Step4 from './Step-4.js';
import arrowUp from '../../Images/arrow-up.png';
import FadeIn from 'react-fade-in';

export default class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            stepRegister: 0,
        }
        this.resetSectionRegisterLogin = this.resetSectionRegisterLogin.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    resetSectionRegisterLogin() {
        this.setState({stepRegister: 0});
    }

    nextStep() {
        this.setState({stepRegister: this.state.stepRegister + 1});
    }

    render() {
        return(
            <div className="register-login">
                {this.props.sectionRegisterLogin.visibleBackGround ?
                    <FadeIn>
                        <div 
                            className="register-login-background"
                            onClick={()=>{
                                this.resetSectionRegisterLogin();
                                this.props.setSectionRegisterLogin(false,false,false);
                            }}
                        />
                    </FadeIn>
                    :null
                }
                {this.props.sectionRegisterLogin.visibleRegister ?
                    <FadeIn>
                        <div className="register-login-table">
                            <img className="register-login-image" src={logoUser} alt="logo-user"/>
                            <div className="register-login-exit-validation"
                                 onClick={()=>{
                                    this.resetSectionRegisterLogin(); 
                                    this.props.setSectionRegisterLogin(false,false,false);
                                }}
                            >
                                <span className="glyphicon glyphicon-remove login-register-glyphicon-remove"/>
                                <p className="login-register-exit-menu">WYJŚCIE</p>
                            </div> 
                            <React.Fragment>
                                {this.state.stepRegister === 0 ? 
                                <Step1/>
                                :this.state.stepRegister === 1 ?
                                    <Step2/>
                                    :this.state.stepRegister === 2 ?
                                        <Step3/>
                                        :this.state.stepRegister === 3 ?
                                            <Step4
                                            uploadFile={this.uploadFile}
                                            uploadPicture={this.uploadPicture}
                                            showRegulations={this.props.showRegulations}/>
                                        :null}
                            </React.Fragment>
                            {this.state.stepRegister !== 3 ?
                                <button className={"register-login-button-register-login-next-step btn btn-success"} onClick={this.nextStep}>Następny Krok</button>
                                :<button className={"register-login-button-register-login-last-step btn btn-success"} onClick={this.nextStepRegistration}>Zarejestruj</button>}
                            <div className="register-login-form-register-pointers">
                                <div 
                                    className="register-login-form-register-pointer"
                                    style={this.state.stepRegister >= 0 ? 
                                        {backgroundColor:'rgb(92,184,92)'}
                                        :{backgroundColor:'gray'}}
                                >
                                </div>
                                <div 
                                    className="register-login-form-register-pointer"
                                    style={this.state.stepRegister >= 1 ? 
                                        {backgroundColor:'rgb(92,184,92)'}
                                        :{backgroundColor:'gray'}}
                                >
                                </div>
                                <div 
                                    className="register-login-form-register-pointer"
                                    style={this.state.stepRegister >= 2 ? 
                                        {backgroundColor:'rgb(92,184,92)'}
                                        :{backgroundColor:'gray'}}
                                >
                                </div>
                                <div 
                                    className="register-login-form-register-pointer"
                                    style={this.state.stepRegister === 3 ? 
                                        {backgroundColor:'rgb(92,184,92)'}
                                        :{backgroundColor:'gray'}}
                                >
                                </div>
                            </div>
                            <p className="register-login-form-register-already-account" 
                                onClick={()=>{
                                    this.props.setSectionRegisterLogin(true,false,true);
                                }}
                            >
                            Masz już konto? Zaloguj się.
                            </p>
                        </div>
                    </FadeIn>
                    :null
                }
                {this.props.sectionRegisterLogin.visibleLogin ?
                <FadeIn>
                    <div className="register-login-register-complete">
                        <div className="register-login-register-complete-block">
                            <p className="register-login-register-complete-text">Rejestacja Przebiegła Pomyślnie!
                                <img className="register-login-register-complete-img" src={completeLogo} alt="complete-logo"/>
                            </p>
                        </div>
                    </div>
                        <div className="register-login-login-users-table">
                            <img className="register-login-image" src={logoUser} alt="logo-user"/>
                            <div className="register-login-exit-validation">
                                <span className="glyphicon glyphicon-remove login-register-glyphicon-remove"></span>
                                <p 
                                    className="login-register-exit-menu" 
                                    onClick={()=>{
                                                    this.resetSectionRegisterLogin();
                                                    this.props.setSectionRegisterLogin(false,false,false);
                                            }}
                                >
                                WYJŚCIE
                                </p>
                            </div>
                            <p className="register-login-text">Logowanie</p>
                            <div className="register-login-form-login">
                                <input type="text" placeholder="Nazwa użytkownika"  className="register-login-form-login-input"/>
                                <div className="register-login-form-register-underline"></div>
                                <input type="password" placeholder="Hasło"  className="register-login-form-login-input"/>
                                <div className="register-login-form-register-underline">
                                    <img src={arrowUp} alt="arrow-up" className="register-login-arrow-up-wrong"/>                        
                                    <div className="register-login-table-wrong-password-login">
                                        <p>Złe hasło lub zła nazwa użytkowika</p>
                                    </div>
                                </div>
                            </div>
                            <div className="register-login-save-password">
                                <input className="register-login-check-save-password" type="checkbox"/>
                                <span > Zapamiętaj moje hasło.</span>
                            </div>
                            <p className="register-login-remember-password">* Przypomnij mi hasło.</p>
                            <button className="register-login-button-login btn btn-primary" onClick={this.loginUsers}>Zaloguj</button>
                            <p 
                                className="register-login-form-login-already-account"
                                onClick={()=>{
                                    this.props.setSectionRegisterLogin(true,true,false);
                                        }}
                            >
                            Nie masz jeszcze konta? Zarejestruj się.
                            </p>
                    </div>
                </FadeIn>
                :null}
            </div>
        )
    }
}

var dateRegister = [];