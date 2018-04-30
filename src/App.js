import React, { Component } from 'react';
import './App.css';
import Intro from './Components/Intro/index.js';
import Navigation from './Components/Navigation/index.js';
import MenuLeftDrop from './Components/Menu-Left_Drop/index.js'
import Footer from './Components/Footer/index.js'
import Article from './Components/Article/index.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hiddenBody: false,
    }
    this.showBody = this.showBody.bind(this);
    this.hideBody = this.hideBody.bind(this);
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

  render() {
    return (
      <div className="App">
        <MenuLeftDrop hideBody={this.hideBody}/>
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
        />
        <Intro/>
        <Article/>
        <Footer/>
      </div>
    );
  }
}


export default App;
