import './style.css';
import React, { Component } from 'react';

export default class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueFisrt: '',
            valueSecond: '',
            valueThird: '',
            valueFourth: '',
        }
        this.sendValue = this.sendValue.bind(this);
    }

    setValueFisrt = (e) => {this.setState({valueFisrt: e.target.value})};

    setValueSecond = (e) => {this.setState({valueSecond: e.target.value})};

    setValueThird = (e) => {this.setState({valueThird: e.target.value})};

    setValueFourth = (e) => {this.setState({valueFourth: e.target.value})};

    sendValue() {
        this.props.getValueTheStepRegister(1, this.state);
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
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" 
                           placeholder="E-mail"  
                           className="register-login-form-register-input"
                           onInput={this.setValueSecond}
                    />
                    <div className="register-login-form-register-underline"></div>
                    <input type="password" 
                           placeholder="Hasło"  
                           className="register-login-form-register-input"
                           onInput={this.setValueThird}
                    />
                    <div className="register-login-form-register-underline"></div>
                    <input type="password" 
                           placeholder="Powtórz Hasło"  
                           className="register-login-form-register-input"
                           onInput={this.setValueFourth}
                    />
                    <div className="register-login-form-register-underline"></div>
                </div>
                <button className={"register-login-button-register-login-next-step btn btn-success"} 
                        onClick={this.props.adminBase ?
                                    this.props.adminBase.status === 'online' ?
                                    () =>{
                                        this.sendValue();
                                        this.props.nextStep();
                                      }
                                    :null
                                :null}
                >
                    Następny Krok
                </button>              
            </React.Fragment>
        )
    }
}