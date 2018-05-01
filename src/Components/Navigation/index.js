import React, { Component } from 'react';
import './index.css';
import emptyLogoUser from '../../Images/empty-logo-user.png';

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
    }

    componentWillReceiveProps() {
        if(this.props.hiddenBody) {
            document.getElementsByClassName("menu-drop-left")[0].style.opacity = 0;
            setTimeout(function() {
                document.getElementsByClassName("App")[0].style.marginLeft="unset";
                document.getElementsByClassName("menu-drop-left")[0].style.width = "0%";
            },300);
          
            setTimeout(function() {
                document.getElementsByClassName("menu-drop-left")[0].style.display = "none";
            },1000);
        }
    }

    showMoreOptionsNav() {
        document.getElementsByClassName("menu-drop-left")[0].style.display = "block";
        setTimeout(()=>{
            if(window.innerWidth < 768) {
                document.getElementsByClassName("App")[0].style.marginLeft="50%";
                document.getElementsByClassName("menu-drop-left")[0].style.width = "50%";
            }
    
            else if(window.innerWidth < 1024) {
                document.getElementsByClassName("App")[0].style.marginLeft="40%";
                document.getElementsByClassName("menu-drop-left")[0].style.width = "40%";
            }
    
            else{
                document.getElementsByClassName("App")[0].style.marginLeft="30%";
                document.getElementsByClassName("menu-drop-left")[0].style.width = "30%";
            }
            this.props.showBody();
        },100);

        setTimeout(()=>{
            document.getElementsByClassName("menu-drop-left")[0].style.opacity = 1;
        },1000);
    }
    
    render() {
        return (
            <div className="nav">
                <div className="drop-menu" onClick={this.showMoreOptionsNav}>
                <div className="nav-button">
                    <div className="nav-button-contain-1"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-2"><div className="nav-button-width"/></div>
                    <div className="nav-button-contain-3"><div className="nav-button-width"/></div>
                </div>
                <p className="nav-text-button">MENU</p>
                </div>
                <a className="icon-nav fa fa-linkedin"></a>
                <a className="icon-nav fa fa-twitter"></a>
                <a className="icon-nav fa fa-facebook"></a>
                <div className="nav-option">
                    <img className="users img-circle" src={emptyLogoUser}/>
                    <p onClick={this.props.setVisibleForm} className="nav-register-login">ZAREJESTRUJ/ ZALOGUJ</p>
                    <p className="nav-member">JESTEŚ JUŻ CZŁONKIEM?</p>
                </div> 
            </div>
        )
    }
}

export default Navigation;