import './index.css';
import React, { Component } from 'react';
import logoUser from '../../Images/users-login.png';
import completeLogo from '../../Images/register-accepted.png';
export default class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            textRegister : 0
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
        this.props.setVisibleForm();
        document.getElementsByClassName("register-login")[0].style.opacity = 0;
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
        setTimeout(function() {  
            document.getElementsByClassName("login-register")[0].style.display= "none";
        },500)
        setTimeout(()=>{
        for(let i = 1; i<4;i++) {
            document.getElementsByClassName("form-register-pointer")[i].style.backgroundColor = "gray";    
        }
        this.setState({
            textRegister : 0
        })},1000);
    }

    nextStepRegistration() {
        if(this.state.textRegister === 3) {
            this.viewCompleteRegistration();
            return;
        }
        this.setState({
            textRegister : this.state.textRegister + 1
        })
        setTimeout(()=>{
            document.getElementsByClassName("form-register-pointer")[this.state.textRegister].style.backgroundColor = "rgb(92,184,92)";
        },100);
    }

    viewCompleteRegistration() {
        document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
        document.getElementsByClassName("register-complete")[0].style.display= "block";
        setTimeout(function(){
            document.getElementsByClassName("register-complete-block")[0].style.opacity = 1;
        },500);
        setTimeout(function(){
            document.getElementsByClassName("register-complete-block")[0].style.opacity = 0;
        },2500);
        setTimeout(()=>{
            document.getElementsByClassName("register-complete")[0].style.display= "none";
            this.hideRegisterLogin();
        },3000);      
    }

    render() {
        const registerText = [
            ['Tworzenie Konta','Nazwa Użytkownika', 'E-mail', 'Hasło', 'Powtórz Hasło'],
            ['Linki do twojej osoby','Facebook','Twitter', 'Linked In','Instagram'],
            ['Dane Personalne', 'Imie', 'Nazwisko', 'Kraj','Data Urodzenia'],
            ['Dane Opcjonalne', 'Miasto', 'Ulica', 'Telefon', 'Osoba Polecająca']
        ];

        return(
            <div className="login-register">
                <div className="register-login" onClick={this.hideRegisterLogin}/>
                <div className="register-login-table">
                    <img className="register-login-image" src={logoUser}/>
                    <div className="exit-validation-register-login" onClick={this.hideRegisterLogin}>
                        <span className="glyphicon glyphicon-remove"></span>
                        <p className="exit-drop-menu">WYJŚCIE</p>
                    </div>
                    <p className="register-login-text-1">{registerText[this.state.textRegister][0]}</p>
                    <div className="form-register-step-1">
                        <input type="text" placeholder={registerText[this.state.textRegister][1]}  className="form-register-step-1-input"/>
                        <div className="form-register-step-1-underline"></div>
                        <input type="text" placeholder={registerText[this.state.textRegister][2]}  className="form-register-step-1-input"/>
                        <div className="form-register-step-1-underline"></div>
                        <input type="password" placeholder={registerText[this.state.textRegister][3]}  className="form-register-step-1-input"/>
                        <div className="form-register-step-1-underline"></div>
                        <input type="text" placeholder={registerText[this.state.textRegister][4]}  className="form-register-step-1-input"/>
                        <div className="form-register-step-1-underline"></div>
                    </div>
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
                        <p className="register-complete-text">Rejestacja Przebiegła Pomyślnie!<img className="register-complete-img" src={completeLogo}/></p>
                    </div>
                </div>
            </div>
        )
    }
}