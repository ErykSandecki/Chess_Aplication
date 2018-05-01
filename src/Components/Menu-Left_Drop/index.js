import React, { Component } from 'react';
import './index.css';

export default class MenuLeftDrop extends Component {
    render(props) {
        return(
            <div className="menu-drop-left">
                <div className="language-exit">
                    <p className="language">POLSKI</p>
                    <div className="drop-login-register" onClick={this.props.hideBody}>
                        <span className="glyphicon glyphicon-remove"></span>
                        <p className="exit-drop-menu">WYJŚCIE</p>
                    </div>
                </div>
                <div className="login-register-drop">
                    <p className="login-register-drop-text" onClick={this.props.setVisibleForm}>ZAREJESTRUJ/ZALOGUJ</p>
                </div>
            </div>
        )
    }
}