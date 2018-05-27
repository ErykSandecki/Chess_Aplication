import React, { Component } from 'react';

import './style.css';

export default class MenuLeftDrop extends Component {
    render() {
        return(
            <div className={this.props.visibleMenuDropLeft ? 
                                "hide-menu-drop-left"
                                :window.innerWidth < 768 ? 
                                    "menu-drop-left-50"
                                    :window.innerWidth < 1024 ?
                                        "menu-drop-left-40"
                                        :"menu-drop-left-30"}>
                <div className="menu-drop-left-language-exit">
                    <p className="menu-drop-left-language">
                        POLSKI
                    </p>
                    <div className="menu-drop-left-drop-login-register" 
                         onClick={this.props.showApp}
                    >
                        <span className="glyphicon glyphicon-remove menu-drop-left-glyphicon-remove"></span>
                        <p className="menu-drop-left-exit-drop-menu">
                            WYJŚCIE
                        </p>
                    </div>
                </div>
                <div className="menu-drop-left-login-register-drop"
                    onClick={this.props.statusLogin ? 
                                () => {
                                        this.props.setStatusLoginUser(false);
                                        this.props.showApp();
                                    }
                                :() => {
                                        this.props.showApp();
                                        setTimeout(() => {
                                            this.props.setSectionRegisterLogin(true, true, false);
                                        },500);
                                     }
                            }
                >
                    <p className="menu-drop-left-login-register-drop-text"> 
                        {this.props.statusLogin ?
                         "WYLOGUJ"   
                        :"ZAREJESTRUJ/ZALOGUJ"}
                    </p>
                </div>
                <div className="menu-drop-left-friends-drop"
                     onClick={this.props.statusLogin ? 
                                () => {
                                        this.props.showApp();
                                        setTimeout(() => {
                                            this.props.setVisibleFriends();
                                        },500);
                                    }
                               :() => {
                                      this.props.showApp();
                                      setTimeout(() => {
                                            this.props.setSectionRegisterLogin(true, true, false);
                                        },500);
                                    }}
                >
                    <p className="menu-drop-left-friends-drop-text">
                        ZNAJOMI
                    </p>
                </div>
                <div className="menu-drop-left-game-drop"
                     onClick={() =>{
                                        this.props.showApp();
                                        setTimeout(() =>{
                                            this.props.setVisibleGame();
                                        },500);
                                    }
                             }
                >
                    <p className="menu-drop-left-game-drop-text">
                        GRAJ ZE ZNAJOMYMI
                    </p>
                </div>    
            </div>
                )
    }
}