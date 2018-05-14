import React, { Component } from 'react';
import './App.css';

import Intro from './components/Intro/index.js';
import Navigation from './components/Navigation';
import Footer from './components/Footer'
import Article from './components/Article'
import MenuLeftDrop from './components/MenuLeftDrop'
import Regulations from './components/Regulations'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      vissibleApp: true,
      statusLogin: false,
      vissibleRegulation: false,
    }
  }

  componentDidMount() {
   
  }

  hideApp() {
    this.setState({vissibleApp: false});
  }

  showApp() {
    this.setState({vissibleApp: true});
  }

  showRegulations() {
    this.setState({vissibleRegulation: true});
  }

  hideRegulations() {
    this.setState({vissibleRegulation: false});
  }

  render() {
    return (
            <div className={this.state.vissibleApp ?
                            "App"
                            :window.innerWidth < 768 ?
                              "AppRightSet-50"
                              :window.innerWidth < 1024 ?
                                "AppRightSet-40"
                                :"AppRightSet-30"}>
              <div className={this.state.vissibleApp ? 
                              ""
                              :"hide-body"}
                    onClick={this.showApp.bind(this)}>
             </div>
            <MenuLeftDrop
              vissibleMenuDropLeft={this.state.vissibleApp}
              showApp={this.showApp.bind(this)}/>
            <Navigation
              hideApp={this.hideApp.bind(this)}
              statusLogin={this.state.statusLogin}/>
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
              vissibleRegulation={this.state.vissibleRegulation}
              hideRegulations={this.hideRegulations.bind(this)}/>
          </div>
            );
  }
}

export default App;
export var referenceApp;


