import './index.css';
import React, { Component } from 'react';
import logoUser from '../../Images/users-login.png';
import completeLogo from '../../Images/register-accepted.png';
import {addUser, sendReferencePicture, tryLoginUser} from '../../Firebase/index.js';
import Step1 from './Step-1.js';
import Step2 from './Step-2.js';
import Step3 from './Step-3.js';
import Step4 from './Step-4.js';
import arrowUp from '../../Images/arrow-up.png';

export default class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            stepRegister: 0,
        }
        this.hideRegisterLogin = this.hideRegisterLogin.bind(this);
        this.nextStepRegistration = this.nextStepRegistration.bind(this);
        this.hideTableLogin = this.hideTableLogin.bind(this);
        this.loginUsers = this.loginUsers.bind(this);
        this.hideBlockRegisterLogin = this.hideBlockRegisterLogin.bind(this);
    }

    componentDidMount() {
        document.getElementsByClassName("form-register-pointer")[0].style.backgroundColor = "rgb(92,184,92)";
    }

    componentWillReceiveProps() {
        let time;
        if(this.props.hiddenBody) {
            time = 1000;
        }
        else {
            time = 0;
        }
        setTimeout(()=> {
            if(this.props.visibleForm) {
                document.getElementsByClassName("login-register")[0].style.display= "block";
                setTimeout(() => {
                    document.getElementsByClassName("register-login")[0].style.opacity = 0.9;
                    setTimeout(() =>{
                        document.getElementsByClassName("register-login-table")[0].style.opacity = 1;
                    },500)
                },time)
            }
        },100)
    }
    
    hideRegisterLogin() {
         this.setState({
            stepRegister : 0,
        })
        this.props.hideVisibleForm();
        this.hideBlockRegisterLogin();
        dateRegister = [];
    }

    hideBlockRegisterLogin() {
        document.getElementsByClassName("register-login")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;  
        setTimeout(() => {  
            document.getElementsByClassName("login-register")[0].style.display= "none";
        },500)
        setTimeout(()=>{
            for(let i = 1; i<4;i++) {
                document.getElementsByClassName("form-register-pointer")[i].style.backgroundColor = "gray";    
        }},1000);
    }

    nextStepRegistration() {
        if(this.state.stepRegister === 3) {
            addUser(dateRegister, this.hideRegisterLogin, this.props.setStatusUsers);
            dateRegister = [];
            return;
        }
        for(let i = 0; i<4;i++){
            dateRegister.push(document.getElementsByClassName("form-register-input")[i].value);   
        }
        this.setState({
            stepRegister : this.state.stepRegister + 1
        })
        setTimeout(()=>{
            document.getElementsByClassName("form-register-pointer")[this.state.stepRegister].style.backgroundColor = "rgb(92,184,92)";
        },100);
    }

    uploadPicture(e) {
        sendReferencePicture(e.target.files[0]);
    }

    uploadFile() {
        document.getElementsByClassName('register-upload-input')[0].click()
    }

    showTableLogin(){
        document.getElementsByClassName("arrow-up-wrong")[0].style.opacity = 0;
        document.getElementsByClassName("table-wrong-password-login")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
        document.getElementsByClassName("login-users-table")[0].style.display = "block";
        setTimeout(function() {
            document.getElementsByClassName("register-login-table")[0].style.display="none";
            document.getElementsByClassName("login-users-table")[0].style.opacity = 1;
        },500)
    }

    hideTableLogin() {
        document.getElementsByClassName("login-users-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-login")[0].style.opacity = 0;
        setTimeout(function(){
            document.getElementsByClassName("login-users-table")[0].style.display = "none";
            document.getElementsByClassName("login-register")[0].style.display = "none";
            document.getElementsByClassName("register-login-table")[0].style.display="block";
        },600);   
    }

    goCreateAccountfromLoginTable() {
        document.getElementsByClassName("login-users-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.display="block";
        setTimeout(() => {   
            document.getElementsByClassName("register-login-table")[0].style.opacity = 1;
            document.getElementsByClassName("login-users-table")[0].style.display = "none";
        },500)
    }

    loginUsers() {
        let userName = document.getElementsByClassName("form-login-input")[0].value;
        let password = document.getElementsByClassName("form-login-input")[1].value;
        tryLoginUser(userName, password, this.hideTableLogin, this.props.setStatusUsers);  
    }

    render() {
        return(
            <div className="login-register">
                <div className="register-login" onClick={()=>{
                        this.hideTableLogin();
                        this.hideRegisterLogin();}}/>
                    <div className="register-login-table">
                        <img className="register-login-image" src={logoUser} alt="logo-user"/>
                        <div className="exit-validation-register-login" onClick={this.hideRegisterLogin}>
                            <span className="glyphicon glyphicon-remove"/>
                            <p className="exit-drop-menu">WYJŚCIE</p>
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
                                        uploadPicture={this.uploadPicture}/>
                                        :null}
                        </React.Fragment>
                        <button className="button-register-login-next-step btn btn-success" onClick={this.nextStepRegistration}>Następny Krok</button>
                        <div className="form-register-pointers">
                            <div className="form-register-pointer"></div>
                            <div className="form-register-pointer"></div>
                            <div className="form-register-pointer"></div>
                            <div className="form-register-pointer"></div>
                        </div>
                        <p className="form-register-already-account" onClick={this.showTableLogin}>Masz już konto? Zaloguj się.</p>
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
                        <p className="exit-drop-menu" onClick={this.hideTableLogin}>WYJŚCIE</p>
                    </div>
                    <p className="register-login-text">Logowanie</p>
                    <div className="form-login">
                        <input type="text" placeholder="Nazwa użytkownika"  className="form-login-input"/>
                        <div className="form-register-underline"></div>
                        <input type="password" placeholder="Hasło"  className="form-login-input"/>
                        <div className="form-register-underline">
                            <img src={arrowUp} alt="arrow-up" className="arrow-up-wrong"/>                        
                            <div className="table-wrong-password-login">
                                <p>Złe hasło lub zła nazwa użytkowika</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-login btn btn-primary" onClick={this.loginUsers}>Zaloguj</button>
                    <div className="save-password">
                        <input type="checkbox"/>
                        <span > Zapamiętaj moje hasło.</span>
                    </div>
                    <p className="remember-password">Przypomnij mi hasło.</p>
                    <p onClick={this.goCreateAccountfromLoginTable} className="form-login-already-account">Nie masz jeszcze konta? Zarejestruj się.</p>
                </div>
            </div>
        )
    }
}

var dateRegister = [];