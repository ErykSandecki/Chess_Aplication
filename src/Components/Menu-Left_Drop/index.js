import React, { Component } from 'react';
import './index.css';

export default class MenuLeftDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleMenuDropLeftDisplay: 'none',
            styleMenuDropLeftWidth: '0%',
            styleMenuDropLeftOpacity: 0,
            setVissible: true,
        }
        this.showMenuDropLeft = this.showMenuDropLeft.bind(this);
        this.hideMenuDropLeft = this.hideMenuDropLeft.bind(this);
    }

   componentWillReceiveProps() {
       setTimeout(()=> {
           if(this.props.vissibleMenuDropLeft && this.state.setVissible) {
               this.showMenuDropLeft();
               this.setState({setVissible: false})
           }
           if(!this.props.vissibleMenuDropLeft && !this.state.setVissible){
               this.hideMenuDropLeft();
               this.setState({setVissible: true})
           }
       },1);
   }

    showMenuDropLeft() {
        this.props.showBody();
        this.setState({styleMenuDropLeftDisplay: 'block'});
        setTimeout(() =>{
            let width; 
            if(window.innerWidth < 768) {
                width = '50%';
            }
            else if(window.innerWidth < 1024) {
                width = '40%';
            }
            else {
                width = '30%';
            }
            this.props.setStyleMarginAppLeft(width);
            this.setState({styleMenuDropLeftWidth: width});
            setTimeout(() => {
                this.setState({styleMenuDropLeftOpacity: 1});
            },500);
        },100)
    }

    hideMenuDropLeft() {
        this.setState({styleMenuDropLeftOpacity: 0});
        setTimeout(()=> {
            this.setState({styleMenuDropLeftWidth: 0});
            this.props.setStyleMarginAppLeft('0%');
            setTimeout(()=>{
                this.setState({styleMenuDropLeftDisplay: 'none'});
            },1000)
        },500)
    }   
    
    render(props) {
        const styleMenuDropLeft = {
            display: this.state.styleMenuDropLeftDisplay,
            width: this.state.styleMenuDropLeftWidth,
            opacity: this.state.styleMenuDropLeftOpacity,
        }
        return(
            <div className="menu-drop-left" style={styleMenuDropLeft}>
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
                                :()=>{this.props.hideBody()
                                      this.props.showVisibleForm();}}>
                        {this.props.statusLogin ?
                         "WYLOGUJ"   
                        :"ZAREJESTRUJ/ZALOGUJ"}
                    </p>
                </div>
                <div className="menu-drop-left-friends-drop" 
                    onClick={this.props.statusLogin ?
                                () =>{this.props.showFriendsSection();
                                      this.props.hideBody();}
                                :() =>{this.props.hideBody();
                                       this.props.showVisibleForm();}}>
                    <p className="menu-drop-left-friends-drop-text" >ZNAJOMI</p>
                </div>
            </div>
        )
    }
}