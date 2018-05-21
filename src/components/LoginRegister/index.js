import React, { Component } from 'react';

import logoUser from '../../Images/users-login.png';
import completeLogo from '../../Images/register-accepted.png';
import arrowUp from '../../Images/arrow-up.png';
import FadeIn from 'react-fade-in';

import Step1 from './Step-1.js';
import Step2 from './Step-2.js';
import Step3 from './Step-3.js';
import Step4 from './Step-4.js';

import './style.css';

export default class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            stepRegister: 0,
            valueStep1: null,
            valueStep2: null,
            valueStep3: null,
            valueStep4: null,
            userName: '',
            password: '',
            badLoginOrPassword: false,
            statusAdmin: 'offline',
            widthBar: '0%',
        }
        this.resetSectionRegisterLogin = this.resetSectionRegisterLogin.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.getValueTheStepRegister = this.getValueTheStepRegister.bind(this);
        this.tryLoginUser = this.tryLoginUser.bind(this);
        this.registerNewUser = this.registerNewUser.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.newUser = null;
    };

    resetSectionRegisterLogin() {
        this.setState({
                stepRegister: 0,
                badLoginOrPassword: false,
                statusAdmin: false,
            });
    };

    clearInputLoginPassword = () => {
        this.setState({
            nameUser: '',
            password: '',
            badLoginOrPassword: false,
            statusAdmin: false,
        })
    }

    nextStep() {
        this.setState({stepRegister: this.state.stepRegister + 1});
        if(this.state.stepRegister > 2) {
           setTimeout(() => {
                this.registerNewUser();
           },100);
        }
    };

    getValueTheStepRegister(step, value) {
        if(step === 1) {
            this.setState({valueStep1: value});
        }
        else if(step === 2) {
            this.setState({valueStep2: value});
        }
        else if(step === 3) {
            this.setState({valueStep3: value});
        }
        else {
            this.setState({valueStep4: value});
        }
    };

    getUserNameInput = (e) => {this.setState({nameUser: e.target.value})};
    
    getPasswordInput = (e) => {this.setState({password: e.target.value})};

    tryLoginUser() {
        let actuallyUser;
        if(this.props.usersData.find(user => {
                    actuallyUser = user; 
                    return user.nameUser === this.state.nameUser && 
                           user.password === this.state.password})) {
                            if(this.props.adminBase.status === 'online') {
                                if(actuallyUser.status === 'offline') {
                                    actuallyUser.status = 'online';
                                    this.props.databaseUsers.child(actuallyUser.id).set(actuallyUser);   
                                }
                                this.setAfterLogin(actuallyUser); 
                            }               
                            else {
                                this.setState({
                                    badLoginOrPassword: true,
                                    statusAdmin: true,
                                })
                            }
        }
        else if(this.props.adminBase.nameUser === this.state.nameUser &&
                this.props.adminBase.password === this.state.password) {
                   this.setAfterLogin(this.props.adminBase);
                   setTimeout(() => {
                    this.props.adminData.child('status').set('online');
                    this.props.refreshStatus(true);
                   },1000);
                }
        else {
            this.setState({
                badLoginOrPassword: true,
                statusAdmin: false,
            })
        }    
    }

    setAfterLogin(user) {
        this.props.setActullayUser(user);
        this.props.setStatusLoginUser(true);
        this.resetSectionRegisterLogin();
        this.props.setSectionRegisterLogin(false, false, false);
    }

    registerNewUser() {
        this.props.setStatusRegisterNewUser(true);
        this.newUser = this.setData();
        if(this.state.valueStep4.pictureFile) {
            let storageRef = this.props.storage.ref(this.newUser.nameUser);
            var task = storageRef.put(this.state.valueStep4.pictureFile);
            task.on('state_changed',(snapshot) => {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({widthBar: percentage + '%'});
                if(percentage === 100) {
                    setTimeout(() => { 
                        this.props.setSectionRegisterLogin(true, false, false);
                        this.setState({stepRegister: 5});
                        this.uploadImage();      
                    },1000);
                }
             }, function error(err) {
             })
        }
        else {
            this.newUser.pictureUrl ="https://firebasestorage.googleapis.com/v0/b/chess-base-aa6a9.appspot.com/o/empty-logo-user.png?alt=media&token=acfc9373-e111-420e-a02f-25763452d581";
            this.props.databaseUsers.push(this.newUser);
            this.props.setSectionRegisterLogin(true, false, false);
            this.setState({stepRegister: 5});
            setTimeout(() => {
                this.afterRegister();
            },2000); 
        }
    }

    uploadImage(status) {
        let pathReference = this.props.storage.ref();
        let starsRef = pathReference.child(this.newUser.nameUser);
        starsRef.getDownloadURL().then((url) => {
            this.newUser.pictureUrl = url;
            this.props.databaseUsers.push(this.newUser);
            setTimeout(() => {
                this.afterRegister();
            },2000) 
        }).catch(function(error) {
            switch (error.code) {
                case 'storage/object_not_found':
                        break;
    
                case 'storage/unauthorized':
                        break;
    
                case 'storage/canceled':
                        break;
    
                case 'storage/unknown':
                        break;
                default :
                        break;    
            }
        });
    }

    afterRegister() {
        this.resetSectionRegisterLogin();
        this.props.setSectionRegisterLogin(false,false,false);
        this.props.setStatusLoginUser(true);
        this.setState({widthBar: '0%'});
    }

    setData = () => {
        return {
            id: '',
            nameUser: this.state.valueStep1.valueFisrt,
            email: this.state.valueStep1.valueSecond,
            password: this.state.valueStep1.valueThird,
            name: this.state.valueStep2.valueFisrt,
            surname: this.state.valueStep2.valueSecond,
            country: this.state.valueStep2.valueThird,
            dateSince: this.state.valueStep2.valueFourth,
            city: this.state.valueStep3.valueFisrt,
            region: this.state.valueStep3.valueSecond,
            phone: this.state.valueStep3.valueThird,
            ranking: 0,
            pictureUrl: '',
            status: 'online',
        }
    }

    render() {
        return(
            <div className="register-login">
                {this.props.sectionRegisterLogin.visibleBackGround ?
                    <FadeIn>
                        <div 
                            className="register-login-background"
                            onClick={() => {
                                if(this.state.stepRegister < 4) {
                                    this.resetSectionRegisterLogin();
                                    this.props.setSectionRegisterLogin(false,false,false);
                                }
                            }}
                        />
                    </FadeIn>
                    :null
                }
                {this.props.sectionRegisterLogin.visibleRegister ?
                    <FadeIn>
                        <div className="register-login-table">
                            <img className="register-login-image" 
                                 src={logoUser} 
                                 alt="logo-user"
                            />
                            <div className="register-login-exit-validation"
                                 onClick={() => {
                                    this.resetSectionRegisterLogin(); 
                                    this.props.setSectionRegisterLogin(false,false,false);
                                }}
                            >
                                <span className="glyphicon glyphicon-remove login-register-glyphicon-remove"/>
                                <p className="login-register-exit-menu">WYJŚCIE</p>
                            </div> 
                            <React.Fragment>
                                {this.state.stepRegister === 0 ? 
                                <Step1
                                    getValueTheStepRegister={this.getValueTheStepRegister}
                                    adminBase = {this.props.adminBase}
                                    nextStep={this.nextStep}/>
                                :this.state.stepRegister === 1 ?
                                    <Step2
                                        getValueTheStepRegister={this.getValueTheStepRegister}
                                        adminBase = {this.props.adminBase}
                                        nextStep={this.nextStep}/>
                                    :this.state.stepRegister === 2 ?
                                        <Step3
                                            getValueTheStepRegister={this.getValueTheStepRegister}
                                            adminBase = {this.props.adminBase}
                                            nextStep={this.nextStep}/>
                                        :this.state.stepRegister >= 3 ?
                                            <Step4
                                            showRegulations={this.props.showRegulations}
                                            getValueTheStepRegister={this.getValueTheStepRegister}
                                            adminBase = {this.props.adminBase}
                                            nextStep={this.nextStep}
                                            widthBar={this.state.widthBar}/>
                                        :null}
                            </React.Fragment>
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
                                    style={this.state.stepRegister >= 3 ? 
                                        {backgroundColor:'rgb(92,184,92)'}
                                        :{backgroundColor:'gray'}}
                                >
                                </div>
                            </div>
                            <p className="register-login-form-register-already-account" 
                                onClick={() => {
                                    this.props.setSectionRegisterLogin(true,false,true);
                                    this.clearInputLoginPassword();
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
                        <div className="register-login-login-users-table">
                            <img className="register-login-image" 
                                 src={logoUser} 
                                 alt="logo-user"
                            />
                            <div className="register-login-exit-validation">
                                <span className="glyphicon glyphicon-remove login-register-glyphicon-remove"></span>
                                <p 
                                    className="login-register-exit-menu" 
                                    onClick={() => {
                                                    this.resetSectionRegisterLogin();
                                                    this.props.setSectionRegisterLogin(false,false,false);
                                            }}
                                >
                                WYJŚCIE
                                </p>
                            </div>
                            <p className="register-login-text">Logowanie</p>
                            <div className="register-login-form-login">
                                <input type="text" 
                                       placeholder="Nazwa użytkownika"  
                                       className="register-login-form-login-input"
                                       onInput={this.getUserNameInput}
                                />
                                <div className="register-login-form-register-underline"></div>
                                <input type="password" 
                                       placeholder="Hasło"  
                                       className="register-login-form-login-input"
                                       onInput={this.getPasswordInput}
                                />
                                <div className="register-login-form-register-underline">
                                    {this.state.badLoginOrPassword ?
                                        <React.Fragment>
                                            <img className="register-login-arrow-up-wrong" 
                                                 src={arrowUp} 
                                                 alt="arrow-up"
                                            />                        
                                            <div className="register-login-table-wrong-password-login">
                                               {this.state.statusAdmin ?
                                                     <p>Strona nie aktywna !</p>
                                                    :<p>Złe hasło lub zła nazwa użytkowika!</p>
                                                }
                                            </div>
                                        </React.Fragment>
                                        :null
                                    }
                                </div>
                            </div>
                            <div className="register-login-save-password">
                                <input className="register-login-check-save-password" 
                                       type="checkbox"
                                />
                                <span > Zapamiętaj moje hasło.</span>
                            </div>
                            <p className="register-login-remember-password">* Przypomnij mi hasło.</p>
                            <button className="register-login-button-login btn btn-primary" 
                                    onClick={this.tryLoginUser.bind(this)}
                            >
                                Zaloguj
                            </button>
                            <p 
                                className="register-login-form-login-already-account"
                                onClick={() => {
                                                this.props.setSectionRegisterLogin(true,true,false);
                                             }
                                        }
                            >
                            Nie masz jeszcze konta? Zarejestruj się.
                            </p>
                        </div>
                    </FadeIn>
                    :null
                }
                {this.state.stepRegister === 5 ?
                            <FadeIn>
                                <div className="register-login-register-complete">
                                    <div className="register-login-register-complete-block">
                                        <p className="register-login-register-complete-text">
                                            Rejestacja Przebiegła Pomyślnie!
                                            <img className="register-login-register-complete-img" 
                                                 src={completeLogo} 
                                                 alt="complete-logo"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                    : null
                }
            </div>
        )
    };
}