import './style.css';

import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

import badValidation from './validation';

export default class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueFisrt: '',
            valueSecond: '',
            valueThird: '',
            valueFourth: '',
            badRegisterInputs: [
                false, false, false, false,
            ]
        }
        this.sendValue = this.sendValue.bind(this);
        this.checkValidation = this.checkValidation.bind(this);

        this.firstTextBadInput = '';
        this.secondTextBadInput  = '';
        this.thirdTextBadInput  = '';
        this.fourthTextBadInput  = '';
    }

    setValueFisrt = (e) => {this.setState({valueFisrt: e.target.value})};

    setValueSecond = (e) => {this.setState({valueSecond: e.target.value})};

    setValueThird = (e) => {this.setState({valueThird: e.target.value})};

    setValueFourth = (e) => {this.setState({valueFourth: e.target.value})};

    sendValue() {
        this.props.getValueTheStepRegister(1, this.state);
    }

    checkValidation() {
        let badRegisterInputs = this.state.badRegisterInputs;
        if(this.state.valueFisrt === '' || this.state.valueFisrt.length < 5) {
            badRegisterInputs[0] = true;
            this.setState({badRegisterInputs});
            this.firstTextBadInput = 'Musisz podać nazwę oraz minimum 5 znaków!'
        }
        else if(this.props.usersData.find((user) => {
            return user.nameUser.toLowerCase() === this.state.valueFisrt.toLowerCase();
        })) {
            badRegisterInputs[0] = true;
            this.setState({badRegisterInputs});
            this.firstTextBadInput = 'Ta nazwa użytkownika jest zajęta!'  
        }
        else {
            badRegisterInputs[0] = false;
            this.setState({badRegisterInputs});
        }
        
        if(this.state.valueSecond === '') {
            badRegisterInputs[1] = true;
            this.setState({badRegisterInputs});
            this.secondTextBadInput = 'Musisz podać email!'
        }
        else if (this.props.usersData.find((user) => {
            return user.email.toLowerCase() === this.state.valueSecond.toLowerCase();
        })) {
            badRegisterInputs[1] = true;
            this.setState({badRegisterInputs});
            this.secondTextBadInput = 'Ten email jest zajęty'
        }
        else {
            badRegisterInputs[1] = false;
            this.setState({badRegisterInputs});
        }

        if(this.state.valueThird === '' || this.state.valueThird.length < 5) {
            badRegisterInputs[2] = true;
            this.setState({badRegisterInputs});
            this.thirdTextBadInput = 'Musisz podać hasło oraz minimum 5 znaków!'
        }
        else {
            badRegisterInputs[2] = false;
            this.setState({badRegisterInputs});
        }
        if(this.state.valueFourth === '') {
            badRegisterInputs[3] = true;
            this.setState({badRegisterInputs});
            this.fourthTextBadInput = 'Musisz powtórzyć hasło!'
        }
        else if(this.state.valueThird !== this.state.valueFourth) {
            badRegisterInputs[3] = true;
            this.setState({badRegisterInputs});
            this.fourthTextBadInput = 'Hasła nie pasują do siebie!'
        }
        else {
            badRegisterInputs[3] = false;
            this.setState({badRegisterInputs});
        }
        if(!badRegisterInputs[0] &&
           !badRegisterInputs[1] &&
           !badRegisterInputs[2] &&
           !badRegisterInputs[3]) {
            this.sendValue();
            this.props.nextStep();
           }
    }

    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Tworzenie Konta</p>
                <div className="register-login-form-register">
                    <input type="text" 
                        placeholder="Nazwa Użytkownika"  
                        className="register-login-form-register-input"
                        onInput={this.setValueFisrt}
                    />
                    <div className="register-login-form-register-underline">
                        {this.state.badRegisterInputs[0] ?
                            <FadeIn>
                                {badValidation(this.firstTextBadInput)}
                            </FadeIn>    
                            :null
                        }
                    </div>
                    <input type="text" 
                           placeholder="E-mail"  
                           className="register-login-form-register-input"
                           onInput={this.setValueSecond}
                    />
                    <div className="register-login-form-register-underline">
                        {this.state.badRegisterInputs[1] ?
                            <FadeIn>
                                {badValidation(this.secondTextBadInput)}
                            </FadeIn>    
                            :null
                        }
                    </div>
                    <input type="password" 
                           placeholder="Hasło"  
                           className="register-login-form-register-input"
                           onInput={this.setValueThird}
                    />
                    <div className="register-login-form-register-underline">
                        {this.state.badRegisterInputs[2] ?
                            <FadeIn>
                                {badValidation(this.thirdTextBadInput)}
                            </FadeIn>    
                            :null
                        }
                    </div>
                    <input type="password" 
                           placeholder="Powtórz Hasło"  
                           className="register-login-form-register-input"
                           onInput={this.setValueFourth}
                    />
                    <div className="register-login-form-register-underline">
                        {this.state.badRegisterInputs[3] ?
                            <FadeIn>
                                {badValidation(this.fourthTextBadInput)}
                            </FadeIn>    
                            :null
                        }
                    </div>
                </div>
                <button className={"register-login-button-register-login-next-step btn btn-success"} 
                        onClick={this.props.adminBase ?
                                    this.props.adminBase.status === 'online' ?
                                    this.checkValidation
                                    :null
                                :null}
                >
                    Następny Krok
                </button>              
            </React.Fragment>
        )
    }
}
