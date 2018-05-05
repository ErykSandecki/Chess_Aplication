import React, { Component } from 'react';
import './index.css';

export default class MenuLeftDrop extends Component {
    render(props) {
        return(
            <div className="menu-drop-left">
                <div className="menu-drop-left-language-exit">
                    <p className="menu-drop-left-language">POLSKI</p>
                    <div className="menu-drop-left-drop-login-register" onClick={this.props.hideBody}>
                        <span className="glyphicon glyphicon-remove menu-drop-left-glyphicon-remove"></span>
                        <p className="menu-drop-left-exit-drop-menu">WYJŚCIE</p>
                    </div>
                </div>
                <div className="menu-drop-left-login-register-drop">
                    <p className="menu-drop-left-login-register-drop-text" 
                        onClick={this.props.statusLogin ?
                                ()=>{this.props.hideBody();
                                     this.props.setStatusUsers();}
                                :this.props.showVisibleForm}>
                        {this.props.statusLogin ?
                         "WYLOGUJ"   
                        :"ZAREJESTRUJ/ZALOGUJ"}
                    </p>
                </div>
                <div className="menu-drop-left-friends-drop" 
                    onClick={this.props.statusLogin ?
                                () =>{this.props.showFriendsSection();
                                      this.props.hideBody();}
                                :this.props.showVisibleForm}>
                    <p className="menu-drop-left-friends-drop-text" >ZNAJOMI</p>
                </div>
            </div>
        )
    }
}