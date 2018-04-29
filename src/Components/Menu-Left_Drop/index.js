import React, { Component } from 'react';
import './index.css';

export default class MenuLeftDrop extends Component {
    render(props) {
        return(
            <div className="menu-drop-left">
                <div className="language-exit">
                    <p>POLSKI</p>
                    <div onClick={this.props.hideBody}>
                        <span className="glyphicon glyphicon-remove"></span>
                        <p>WYJŚCIE</p>
                    </div>
                </div>
                <div className="login-register">
                    <p>ZAREJESTRUJ/ZALOGUJ</p>
                </div>
            </div>
        )
    }
}