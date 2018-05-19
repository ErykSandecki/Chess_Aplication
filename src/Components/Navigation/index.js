import React, {Component} from 'react';

import NotificationsNewFriends from '../NotificationsNewFriend';

import emptyLogoUser from '../../Images/empty-logo-user.png';

import './style.css';

export default class Navigation extends Component {
    render() {
        return (
            <div className="nav">
                <div className="nav-drop-menu" onClick={this.props.hideApp}>
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
                            <img className="nav-users img-circle" 
                                 src={this.props.actuallyUser.pictureUrl} 
                                 alt="nav-img"
                            />
                            <p className="nav-register-text">{this.props.actuallyUser.nameUser}</p>
                            <p className="nav-register-logout" 
                               onClick={this.props.setStatusLoginUser}
                            >
                                Wyloguj
                            </p>
                            <NotificationsNewFriends
                                actuallyUser={this.props.actuallyUser}
                                usersData={this.props.usersData}
                                databaseUsers={this.props.databaseUsers}/>
                        </React.Fragment>
                        :<React.Fragment>
                            <img className="nav-users img-circle" 
                                 src={emptyLogoUser} 
                                alt="nav-empty-img"/>
                            <p onClick={()=>{
                                    this.props.setSectionRegisterLogin(true, true, false);
                                }} 
                                className="nav-register-login"
                            >
                                ZAREJESTRUJ/ ZALOGUJ
                            </p>
                            <p className="nav-member">JESTEŚ JUŻ CZŁONKIEM?</p>
                        </React.Fragment>        
                    }   
                </div> 
            </div>
        )
    }
}