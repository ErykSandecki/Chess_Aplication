import './index.css';
import React, { Component } from 'react';
import logoUser from '../../Images/users-login.png';
import completeLogo from '../../Images/register-accepted.png';
import {addUser, sendReferencePicture, getImage} from '../../Firebase/index.js';

export default class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            textRegister: 0,
            stepRegisterUploadPicture: false
        }
        this.hideRegisterLogin = this.hideRegisterLogin.bind(this);
        this.nextStepRegistration = this.nextStepRegistration.bind(this);
    }

    componentDidMount() {
        document.getElementsByClassName("form-register-pointer")[0].style.backgroundColor = "rgb(92,184,92)";
    }

    componentWillReceiveProps() {
        setTimeout(()=>{
            if(this.props.visibleForm) {
                document.getElementsByClassName("login-register")[0].style.display= "unset";
                setTimeout(function(){
                    document.getElementsByClassName("register-login")[0].style.opacity = 0.9;
                },10)
                setTimeout(function(){
                    document.getElementsByClassName("register-login-table")[0].style.opacity = 1;
                },500)
            }
        },100)
    }
    
    hideRegisterLogin() {
        if(this.state.stepRegisterUploadPicture) {
            document.getElementsByClassName("register-upload-input")[0].value = "";
        }
        this.setState({
            stepRegisterUploadPicture: false,
            textRegister : 0,
        })
        this.props.setVisibleForm();
        document.getElementsByClassName("register-login")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
        setTimeout(function() {  
            document.getElementsByClassName("login-register")[0].style.display= "none";
        },500)
        setTimeout(()=>{
            for(let i = 1; i<4;i++) {
                document.getElementsByClassName("form-register-pointer")[i].style.backgroundColor = "gray";    
        }},1000);
        dateRegister = [];
    }

    nextStepRegistration() {
        for(let i = 0; i<4;i++){
            if(this.state.textRegister === 3){
                break;
            }
            if(i === 3 && this.state.textRegister === 0) {
                break;
            }
            dateRegister.push(document.getElementsByClassName("form-register-step-1-input")[i].value);
            
        }
        if(this.state.textRegister === 3) {
            addUser(dateRegister, this.hideRegisterLogin, this.props.setStatusUsers);
            dateRegister = [];
            getImage();
            return;
        }
        this.setState({
            textRegister : this.state.textRegister + 1
        })

        setTimeout(()=>{
            document.getElementsByClassName("form-register-pointer")[this.state.textRegister].style.backgroundColor = "rgb(92,184,92)";
        },100);

        if(this.state.textRegister === 2) { 
            for(let i = 0; i < 4;i++){
                document.getElementsByClassName("form-register-step-1-input")[i].value="";
              }
              document.getElementsByClassName("form-register-step-1-input")[2].type="password";
              document.getElementsByClassName("form-register-step-1-input")[3].type="password";
            this.setState({
                stepRegisterUploadPicture: true
            })
            return;   
        }
        for(let i = 0; i<4; i++) {
            document.getElementsByClassName("form-register-step-1-input")[i].value ="";
        }
        document.getElementsByClassName("form-register-step-1-input")[2].type="text";
        document.getElementsByClassName("form-register-step-1-input")[3].type="text";
    }

    uploadPicture(e) {
        sendReferencePicture(e.target.files[0]);
    }

    uploadFile(){
        document.getElementsByClassName('register-upload-input')[0].click()
    }

    render() {
        const registerText = [
            ['Tworzenie Konta','Nazwa Użytkownika', 'E-mail', 'Hasło', 'Powtórz Hasło'],
            ['Dane Personalne', 'Imie', 'Nazwisko', 'Kraj','Data Urodzenia'],
            ['Dane Opcjonalne', 'Miasto', 'Region', 'Telefon', 'Osoba Polecająca']
        ];

        return(
            <div className="login-register">
                <div className="register-login" onClick={this.hideRegisterLogin}/>
                <div className="register-login-table">
                    <img className="register-login-image" src={logoUser} alt="logo-user"/>
                    <div className="exit-validation-register-login" onClick={this.hideRegisterLogin}>
                        <span className="glyphicon glyphicon-remove"></span>
                        <p className="exit-drop-menu">WYJŚCIE</p>
                    </div>
                    {this.state.stepRegisterUploadPicture ?
                    <React.Fragment>
                        <p className="register-login-text-upload-picture">
                            Dodaj zdjęcie
                        </p>
                        <div className="progress progress-bar-register-upload-picture">
                            <div className="progress-bar-register-upload-picture-status progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                        <button className="btn btn-default choose-file" onClick={this.uploadFile}>Wybierz plik</button>
                        <input type="file" className="register-upload-input" onChange={this.uploadPicture}/>
                    </React.Fragment>
                    :<React.Fragment>
                        <p className="register-login-text-1">{registerText[this.state.textRegister][0]}</p>
                        <div className="form-register-step-1">
                            <input type="text" placeholder={registerText[this.state.textRegister][1]}  className="form-register-step-1-input"/>
                            <div className="form-register-step-1-underline"></div>
                            <input type="text" placeholder={registerText[this.state.textRegister][2]}  className="form-register-step-1-input"/>
                            <div className="form-register-step-1-underline"></div>
                            <input type="password" placeholder={registerText[this.state.textRegister][3]}  className="form-register-step-1-input"/>
                            <div className="form-register-step-1-underline"></div>
                            <input type="password" placeholder={registerText[this.state.textRegister][4]}  className="form-register-step-1-input"/>
                            <div className="form-register-step-1-underline"></div>
                        </div>
                    </React.Fragment>
                    }
                    <button className="button-register-login-next-step btn btn-success" onClick={this.nextStepRegistration}>Następny Krok</button>
                    <div className="form-register-pointers">
                        <div className="form-register-pointer"></div>
                        <div className="form-register-pointer"></div>
                        <div className="form-register-pointer"></div>
                        <div className="form-register-pointer"></div>
                    </div>
                    <p className="form-register-already-account">Masz już konto? Zaloguj się.</p>
                </div>
                <div className="register-complete">
                    <div className="register-complete-block">
                        <p className="register-complete-text">Rejestacja Przebiegła Pomyślnie!<img className="register-complete-img" src={completeLogo} alt="complete-logo"/></p>
                    </div>
                </div>
                <div className="login-users-table">
                    <img className="register-login-image" src={logoUser} alt="logo-user"/>
                    <div className="exit-validation-register-login">
                        <span className="glyphicon glyphicon-remove"></span>
                        <p className="exit-drop-menu">WYJŚCIE</p>
                    </div>
                    <p className="register-login-text-1">Logowanie</p>
                    <div className="form-login">
                        <input type="text" placeholder="Nazwa użytkownika"  className="form-login-input"/>
                        <div className="form-register-step-1-underline"></div>
                        <input type="password" placeholder="Hasło"  className="form-login-input"/>
                        <div className="form-register-step-1-underline"></div>
                    </div>
                    <button className="button-login btn btn-primary">Zaloguj</button>
                </div>
            </div>
        )
    }
}

var dateRegister = [];