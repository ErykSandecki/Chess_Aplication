import React, { Component } from 'react';
import './index.css';
import emptyLogoUser from '../../Images/empty-logo-user.png';
import {actuallyUser} from '../../Firebase/index.js';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <div className="nav-drop-menu" onClick={this.props.showMenuDropLeft}>
                <div className="nav-button">
                    <div className="nav-button-contain-1"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-2"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-3"><div className="nav-button-width"/></div>
                </div>
                <p className="nav-text-button">MENU</p>
                </div>
                <span className="nav-icon fa fa-linkedin"></span>
                <span className="nav-icon fa fa-twitter"></span>
                <span className="nav-icon fa fa-facebook"></span>
                <div className="nav-option">
                    {this.props.statusLogin ? 
                        <React.Fragment>
                            <img className="nav-users img-circle" src={actuallyUser.pictureUrl} alt="nav-img"/>
                            <p className="nav-register-text">{actuallyUser.name}</p>
                            <p className="nav-register-logout" onClick={this.props.setStatusUsers}>Wyloguj</p>
                        </React.Fragment>
                        :<React.Fragment>
                            <img className="nav-users img-circle" src={emptyLogoUser} alt="nav-empty-img"/>
                            <p onClick={this.props.showVisibleForm} className="nav-register-login">ZAREJESTRUJ/ ZALOGUJ</p>
                            <p className="nav-member">JESTEŚ JUŻ CZŁONKIEM?</p>
                        </React.Fragment>        
                    }   
                </div> 
            </div>
        )
    }
}