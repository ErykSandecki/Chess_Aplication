import React, { Component } from 'react';
import './App.css';
import Intro from './Components/Intro/index.js';
import Navigation from './Components/Navigation/index.js';
import MenuLeftDrop from './Components/Menu-Left_Drop/index.js'
import Footer from './Components/Footer/index.js'
import Article from './Components/Article/index.js'
import LoginRegister from './Components/Login-Register/index.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hiddenBody: false,
      visibleForm: false
    }
    this.showBody = this.showBody.bind(this);
    this.hideBody = this.hideBody.bind(this);
    this.setVisibleForm = this.setVisibleForm.bind(this);
  }

  showBody() {
    this.setState({
      hiddenBody: true
    })
  }

  hideBody() {
    this.setState({
      hiddenBody: false
    })
  }

  setVisibleForm() {
    this.setState({
      visibleForm: !this.state.visibleForm,
      hiddenBody: false
    })
    for(let i = 0; i<4;i++){
      document.getElementsByClassName("form-register-step-1-input")[i].value="";
    }
    document.getElementsByClassName("form-register-step-1-input")[2].type="password";
    document.getElementsByClassName("form-register-step-1-input")[3].type="password";
  }
  render() {
    return (
      <div className="App">
        <LoginRegister 
          visibleForm={this.state.visibleForm}
          setVisibleForm={this.setVisibleForm}/>
        <MenuLeftDrop 
          hideBody={this.hideBody}
          setVisibleForm={this.setVisibleForm}/>
        <div className="cursorAnimateClick"/>
        <div className={this.state.hiddenBody ?
          "hide-body"
          :""}
        onClick={this.hideBody}>
        </div>
        <Navigation
          hiddenBody={this.state.hiddenBody} 
          hideBody={this.hideBody}
          showBody={this.showBody}
          setVisibleForm={this.setVisibleForm}
        />
        <Intro/>
        <div className="picture-1">
          <div className="parallax-1"></div>
        </div>
        <Article/>
        <div className="picture-2">
          <div className="parallax-2"></div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;


