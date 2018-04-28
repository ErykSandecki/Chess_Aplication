import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/index.js'

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      hiddenBody: false
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
        <div className={this.state.hiddenBody ?
                           "hide-body"
                         : ""
                       }
        onClick={this.hideBody}
        />
        <Navigation
          showBody={this.showBody}
          hideBody={this.hideBody} 
        />
      </div>
    );
  }
}

export default App;
