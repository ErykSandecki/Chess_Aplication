import React, { Component } from 'react';
import './App.css';

import Intro from './components/Intro/index.js';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import Article from './components/Article'
import MenuLeftDrop from './components/MenuLeftDrop'
import Regulations from './components/Regulations'
import LoginRegister from './components/LoginRegister';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      visibleApp: true,
      statusLogin: false,
      visibleRegulation: false,
      sectionRegisterLogin: {
        visibleBackGround: false,
        visibleRegister: false,
        visibleLogin: false,
      }
    }
    this.setSectionRegisterLogin = this.setSectionRegisterLogin.bind(this);
  }

  componentDidMount() {

  }

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

  setSectionRegisterLogin(visibleBackGround, visibleRegister, visibleLogin) {
    this.setState({
        sectionRegisterLogin: {
          visibleBackGround: visibleBackGround,
          visibleRegister: visibleRegister,
          visibleLogin: visibleLogin,
        }
      })
  }

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
            <LoginRegister
              sectionRegisterLogin={this.state.sectionRegisterLogin}
              setSectionRegisterLogin={this.setSectionRegisterLogin}
              showRegulations={this.showRegulations.bind(this)}/>
            <MenuLeftDrop
              visibleMenuDropLeft={this.state.visibleApp}
              showApp={this.showApp.bind(this)}/>
            <Navigation
              hideApp={this.hideApp.bind(this)}
              statusLogin={this.state.statusLogin}
              setSectionRegisterLogin={this.setSectionRegisterLogin}/>
            <Intro/>
            <div className="picture-1">
              <div className="parallax-1"></div>
            </div>
            <Article/>
            <div className="picture-2">
              <div className="parallax-2"></div>
            </div>
            <Footer
              showRegulations={this.showRegulations.bind(this)}/>
            <Regulations
              visibleRegulation={this.state.visibleRegulation}
              hideRegulations={this.hideRegulations.bind(this)}/>
          </div>
            );
  }
}

export default App;
export var referenceApp;


