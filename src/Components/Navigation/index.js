import React, { Component } from 'react';
import './index.css';
import emptyLogoUser from '../../Images/empty-logo-user.png';
import {urlImage, data} from '../../Firebase/index.js';
import MenuLeftDrop from '../Menu-Left_Drop';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.showMoreOptionsNav = this.showMoreOptionsNav.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize" , () => {
            this.props.hideBody();
            document.getElementsByClassName("App")[0].style.marginLeft="unset";
        })
        App = document.getElementsByClassName("App")[0];
        menuDropLeft =  document.getElementsByClassName("menu-drop-left")[0];
    }

    componentWillReceiveProps() {
        if(this.props.hiddenBody) {
           menuDropLeft.style.opacity = 0;
            setTimeout(function() {
                App.style.marginLeft="unset";
                menuDropLeft.style.width = "0%";
            },300);
          
            setTimeout(function() {
                menuDropLeft.style.display = "none";
            },1000);
        }
    }

    showMoreOptionsNav() {
        
        menuDropLeft.style.display = "block";
        setTimeout(()=>{
            if(window.innerWidth < 768) {
                App.style.marginLeft="50%";
                menuDropLeft.style.width = "50%";
            }
            else if(window.innerWidth < 1024) {
                App.style.marginLeft="40%";
                menuDropLeft.style.width = "40%";
            }
            else {
                App.style.marginLeft="30%";
                menuDropLeft.style.width = "30%";
            }
            
            this.props.showBody();
            
            setTimeout(()=>{
                menuDropLeft.style.opacity = 1;
            },900);
        },100);
    }
    
    render() {
        return (
            <div className="nav">
                <div className="nav-drop-menu" onClick={this.showMoreOptionsNav}>
                <div className="nav-button">
                    <div className="nav-button-contain-1"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-2"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-3"><div className="nav-button-width"/></div>
                </div>
                <p className="nav-text-button">MENU</p>
                </div>
                <a className="nav-icon fa fa-linkedin"></a>
                <a className="nav-icon fa fa-twitter"></a>
                <a className="nav-icon fa fa-facebook"></a>
                <div className="nav-option">
                    {this.props.statusLogin ? 
                        <React.Fragment>
                            <img className="nav-users img-circle" src={urlImage}/>
                            <p className="nav-register-text">{data.name}</p>
                            <p className="nav-register-logout" onClick={this.props.setStatusUsers}>Wyloguj</p>
                        </React.Fragment>
                        :<React.Fragment>
                            <img className="nav-users img-circle" src={emptyLogoUser}/>
                            <p onClick={this.props.showVisibleForm} className="nav-register-login">ZAREJESTRUJ/ ZALOGUJ</p>
                            <p className="nav-member">JESTEŚ JUŻ CZŁONKIEM?</p>
                        </React.Fragment>        
                    }   
                </div> 
            </div>
        )
    }
}

export default Navigation;

var App;
var menuDropLeft;  