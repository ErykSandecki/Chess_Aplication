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
        document.getElementsByClassName("register-login-form-register-pointer")[0].style.backgroundColor = "rgb(92,184,92)";
    }

    componentWillReceiveProps() {
        let time;
        if(this.props.hiddenBody) {
            time = 1000;
        }
        else {
            time = 100;
        }
        setTimeout(()=> {
            if(this.props.visibleForm && this.state.stepRegister !== 3) {
                for(let i = 0; i<4; i++) {
                    document.getElementsByClassName("register-login-form-register-input")[i].value ="";
                  }
                document.getElementsByClassName("register-login")[0].style.display= "block";
                setTimeout(() => {
                    document.getElementsByClassName("register-login-background")[0].style.opacity = 0.9;
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
        document.getElementsByClassName("register-login-background")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;  
        setTimeout(() => {  
            document.getElementsByClassName("register-login")[0].style.display= "none";
        },500)
        setTimeout(()=>{
            for(let i = 1; i<4;i++) {
                document.getElementsByClassName("register-login-form-register-pointer")[i].style.backgroundColor = "gray";    
        }},1000);
    }

    nextStepRegistration() {
        if(this.state.stepRegister === 3) {
            addUser(dateRegister, this.hideRegisterLogin, this.props.setStatusUsers);
            dateRegister = [];
            return;
        }
        for(let i = 0; i<4;i++){
            if(i === 3 && this.state.stepRegister === 0){
                break;
            }
            dateRegister.push(document.getElementsByClassName("register-login-form-register-input")[i].value);   
        }
        this.setState({
            stepRegister : this.state.stepRegister + 1
        })
        setTimeout(()=>{
            document.getElementsByClassName("register-login-form-register-pointer")[this.state.stepRegister].style.backgroundColor = "rgb(92,184,92)";
        },100);
    }

    uploadPicture(e) {
        sendReferencePicture(e.target.files[0]);
        console.log("jest");
    }

    uploadFile() {
        document.getElementsByClassName('register-login-register-upload-input')[0].click()
    }

    showTableLogin(){
        document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-login-users-table")[0].style.display = "block";
        setTimeout(function() {
            document.getElementsByClassName("register-login-table")[0].style.display="none";
            document.getElementsByClassName("register-login-login-users-table")[0].style.opacity = 1;
        },500)
    }

    hideTableLogin() {
        document.getElementsByClassName("register-login-login-users-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-background")[0].style.opacity = 0;
        setTimeout(function(){
            document.getElementsByClassName("register-login-login-users-table")[0].style.display = "none";
            document.getElementsByClassName("register-login")[0].style.display = "none";
            document.getElementsByClassName("register-login-table")[0].style.display="block";
        },600);   
    }

    goCreateAccountfromLoginTable() {
        document.getElementsByClassName("register-login-login-users-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.display="block";
        setTimeout(() => {   
            document.getElementsByClassName("register-login-table")[0].style.opacity = 1;
            document.getElementsByClassName("register-login-login-users-table")[0].style.display = "none";
        },500)
    }

    loginUsers() {
        let userName = document.getElementsByClassName("register-login-form-login-input")[0].value;
        let password = document.getElementsByClassName("register-login-form-login-input")[1].value;
        tryLoginUser(userName, password, this.hideTableLogin, this.props.setStatusUsers);  
    }

    render() {
        return(
            <div className="register-login">
                <div className="register-login-background" onClick={()=>{
                        this.hideTableLogin();
                        this.hideRegisterLogin();}}/>
                    <div className="register-login-table">
                        <img className="register-login-image" src={logoUser} alt="logo-user"/>
                        <div className="register-login-exit-validation" onClick={this.hideRegisterLogin}>
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
                                        uploadPicture={this.uploadPicture}/>
                                        :null}
                        </React.Fragment>
                        <button className="register-login-button-register-login-next-step btn btn-success" onClick={this.nextStepRegistration}>Następny Krok</button>
                        <div className="register-login-form-register-pointers">
                            <div className="register-login-form-register-pointer"></div>
                            <div className="register-login-form-register-pointer"></div>
                            <div className="register-login-form-register-pointer"></div>
                            <div className="register-login-form-register-pointer"></div>
                        </div>
                        <p className="register-login-form-register-already-account" onClick={this.showTableLogin}>Masz już konto? Zaloguj się.</p>
                    </div>
                <div className="register-login-register-complete">
                    <div className="register-login-register-complete-block">
                        <p className="register-login-register-complete-text">Rejestacja Przebiegła Pomyślnie!<img className="register-login-register-complete-img" src={completeLogo} alt="complete-logo"/></p>
                    </div>
                </div>
                <div className="register-login-login-users-table">
                    <img className="register-login-image" src={logoUser} alt="logo-user"/>
                    <div className="register-login-exit-validation">
                        <span className="glyphicon glyphicon-remove login-register-glyphicon-remove"></span>
                        <p className="login-register-exit-menu" onClick={this.hideTableLogin}>WYJŚCIE</p>
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
                        <input type="checkbox"/>
                        <span > Zapamiętaj moje hasło.</span>
                    </div>
                    <p className="register-login-remember-password">Przypomnij mi hasło.</p>
                    <button className="register-login-button-login btn btn-primary" onClick={this.loginUsers}>Zaloguj</button>
                    <p onClick={this.goCreateAccountfromLoginTable} className="register-login-form-login-already-account">Nie masz jeszcze konta? Zarejestruj się.</p>
                </div>
            </div>
        )
    }
}

var dateRegister = [];