import React, { Component } from 'react';
import './App.css';

import Firebase from './components/Firebase';
import Intro from './components/Intro/index.js';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import Article from './components/Article'
import MenuLeftDrop from './components/MenuLeftDrop'
import Regulations from './components/Regulations'
import LoginRegister from './components/LoginRegister';
import Friends from './components/Friends';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      adminBase: null,
      adminData: null,
      databaseUsers: null,
      storage: null,
      usersData: null,
      actuallyUser: null,
      visibleApp: true,
      statusLogin: false,
      visibleRegulation: false,
      statusRegisterNewUser: false,
      visibleFriends: false,
      sectionRegisterLogin: {
        visibleBackGround: false,
        visibleRegister: false,
        visibleLogin: false,
      }
    }
    this.refresh = null;

    this.setSectionRegisterLogin = this.setSectionRegisterLogin.bind(this);
    this.refreshStatus = this.refreshStatus.bind(this);
  }

  setAdminBase = (adminBase) => {this.setState({adminBase})}
  
  setDataAdmin = (adminData) => {this.setState({adminData})}
  
  hideApp() {
    this.setState({visibleApp: false});
  }

  showApp() {
    this.setState({visibleApp: true});
  }

  showRegulations() {
    this.setState({visibleRegulation: true});
  }

  hideRegulations() {
    this.setState({visibleRegulation: false});
  }

  getReferenceDataBase = (databaseUsers) => {this.setState({databaseUsers});};

  getReferenceStorage = (storage) => {this.setState({storage});};

  updateUsers = (usersData) => {this.setState({usersData});}

  setActullayUser = (actuallyUser) => {this.setState({actuallyUser})};

  setSectionRegisterLogin(visibleBackGround, visibleRegister, visibleLogin) {
    this.setState({
        sectionRegisterLogin: {
          visibleBackGround: visibleBackGround,
          visibleRegister: visibleRegister,
          visibleLogin: visibleLogin,
        }
      });
  };

  setStatusRegisterNewUser = (value) => {this.setState({statusRegisterNewUser: value})};

  setStatusLoginUser = (statusLogin) => {
    this.setState({statusLogin});
    if(!statusLogin) {
      if(this.state.actuallyUser.nameUser === 'admin') {
          this.state.adminData.child('status').set('offline');
      }
        this.setState({visibleFriends: false});
        this.setActullayUser(null);
    }
  };

  refreshStatus(status) {
    if(status){
      this.refresh = setInterval(()=>{
        this.state.usersData.forEach((user)=>{
          user.status = 'offline';
          this.state.databaseUsers.child(user.id).set(user);
        })
      },60000);      
    }
    else {
      clearInterval(this.refresh);
    }
  }

  setVisibleFriends = () => {this.setState({visibleFriends: !this.state.visibleFriends});};

  render() {
    return (
            <div className={this.state.visibleApp ?
                            "App"
                            :window.innerWidth < 768 ?
                              "AppRightSet-50"
                              :window.innerWidth < 1024 ?
                                "AppRightSet-40"
                                :"AppRightSet-30"}>
              <div className={this.state.visibleApp ? 
                              ""
                              :"hide-body"}
                    onClick={this.showApp.bind(this)}>
              </div>
              <Firebase
                adminBase = {this.state.adminBase}
                setAdminBase = {this.setAdminBase}
                setDataAdmin = {this.setDataAdmin}
                getReferenceDataBase = {this.getReferenceDataBase}
                databaseUsers = {this.state.databaseUsers}
                updateUsers = {this.updateUsers}
                setActullayUser = {this.setActullayUser}
                statusRegisterNewUser = {this.state.statusRegisterNewUser}
                setStatusRegisterNewUser = {this.setStatusRegisterNewUser}
                getReferenceStorage = {this.getReferenceStorage}
                setStatusLoginUser = {this.setStatusLoginUser}
                statusLogin = {this.state.statusLogin}
                actuallyUser = {this.state.actuallyUser}
                usersData = {this.state.usersData}/>
              {this.state.visibleFriends ?
                <Friends
                  setVisibleFriends={this.setVisibleFriends}
                  usersData={this.state.usersData}
                  actuallyUser={this.state.actuallyUser}
                  databaseUsers={this.state.databaseUsers}
                  statusLogin = {this.state.statusLogin}/>
                :null
               }
              <LoginRegister
                adminBase = {this.state.adminBase}
                adminData = {this.state.adminData}  
                sectionRegisterLogin = {this.state.sectionRegisterLogin}
                setSectionRegisterLogin = {this.setSectionRegisterLogin}
                showRegulations = {this.showRegulations.bind(this)}
                setStatusLoginUser = {this.setStatusLoginUser}
                usersData = {this.state.usersData}
                setActullayUser = {this.setActullayUser}
                databaseUsers = {this.state.databaseUsers}
                storage = {this.state.storage}
                setStatusRegisterNewUser = {this.setStatusRegisterNewUser}
                actuallyUser = {this.actuallyUser}
                refreshStatus = {this.refreshStatus}/>
              <MenuLeftDrop
                refreshStatus = {this.refreshStatus}
                visibleMenuDropLeft = {this.state.visibleApp}
                showApp = {this.showApp.bind(this)}
                setSectionRegisterLogin = {this.setSectionRegisterLogin}
                statusLogin = {this.state.statusLogin}
                setStatusLoginUser = {this.setStatusLoginUser}
                setVisibleFriends = {this.setVisibleFriends}/>
              <Navigation
                hideApp = {this.hideApp.bind(this)}
                setSectionRegisterLogin = {this.setSectionRegisterLogin}
                statusLogin = {this.state.statusLogin}
                setStatusLoginUser = {this.setStatusLoginUser}
                usersData = {this.state.usersData}
                actuallyUser = {this.state.actuallyUser}
                databaseUsers = {this.state.databaseUsers}
                refreshStatus = {this.refreshStatus}/>
              <Intro/>
              <div className = "picture-1">
                <div className = "parallax-1"></div>
              </div>
              <Article/>
              <div className = "picture-2">
                <div className = "parallax-2"></div>
              </div>
              <Footer
                showRegulations = {this.showRegulations.bind(this)}/>
              <Regulations
                visibleRegulation = {this.state.visibleRegulation}
                hideRegulations = {this.hideRegulations.bind(this)}/>
            </div>
            );
  }
}

export default App;
export var referenceApp;


