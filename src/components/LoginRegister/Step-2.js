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
        this.props.getValueTheStepRegister(2, this.state);
    }

    render(){
        return(
            <React.Fragment>
                <p className="register-login-text">Dane Personalne</p>
                <div className="register-login-form-register">
                    <input type="text" 
                           placeholder="Imie"  
                           className="register-login-form-register-input"
                           onInput={this.setValueFisrt}
                    />
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" 
                           placeholder="Nazwisko"  
                           className="register-login-form-register-input"
                           onInput={this.setValueSecond}
                    />
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" 
                           placeholder="Kraj"  
                           className="register-login-form-register-input"
                           onInput={this.setValueThird}
                    />
                    <div className="register-login-form-register-underline"></div>
                    <input type="text" 
                           placeholder="Data Urodzenia"  
                           className="register-login-form-register-input"
                           onInput={this.setValueFourth}
                    />
                    <div className="register-login-form-register-underline"></div>
                </div>
                <button className={"register-login-button-register-login-next-step btn btn-success"} 
                        onClick={() =>{
                                        this.sendValue();
                                        this.props.nextStep();
                                      }
                                }
                >
                    Następny Krok
                </button>              
            </React.Fragment>
        )
    }
}