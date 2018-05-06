import React, { Component } from 'react';
import './App.css';
import Intro from './Components/Intro/index.js';
import Navigation from './Components/Navigation/index.js';
import MenuLeftDrop from './Components/Menu-Left_Drop/index.js'
import Footer from './Components/Footer/index.js'
import Article from './Components/Article/index.js'
import LoginRegister from './Components/Login-Register/index.js';
import Friends from './Components/Friends/index.js';
import Regulations from './Components/Regulations/index.js';
import {updateAndDownloadBase} from './Firebase/index.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hiddenBody: false,
      visibleForm: false,
      statusLogin: false,
      vissibleFriends: false,
      vissibleRegular: false,
    }
    this.showBody = this.showBody.bind(this);
    this.hideBody = this.hideBody.bind(this);
    this.showVisibleForm = this.showVisibleForm.bind(this);
    this.hideVisibleForm = this.hideVisibleForm.bind(this);
    this.setStatusUsers = this.setStatusUsers.bind(this);
    this.showFriendsSection = this.showFriendsSection.bind(this);
    this.hideFriendsSection = this.hideFriendsSection.bind(this);
    this.showRegularSection = this.showRegularSection.bind(this);
    this.hideRegulatSection = this.hideRegulatSection.bind(this);
  }

  componentDidMount() {
    updateAndDownloadBase();
  }

  showBody() {
    this.setState({hiddenBody: true});
  }

  hideBody() {
    this.setState({hiddenBody: false});
  }

  showVisibleForm() {
    this.setState({
      visibleForm: true,
      hiddenBody: false
    });
  }

  hideVisibleForm() {
    this.setState({visibleForm: false});
  }

  setStatusUsers() {
   this.setState({
     statusLogin: !this.state.statusLogin,
     visibleForm: false
   });
  }

  showFriendsSection() {
    this.setState({vissibleFriends: true});
  }

  hideFriendsSection() {
    this.setState({vissibleFriends: false});
  }

  showRegularSection() {
    this.setState({vissibleRegular: true});
  }

  hideRegulatSection() {
    this.setState({vissibleRegular: false});
  }

  render() {
    const styleApp = {marginLeft: this.state.marginLeftApp}
    return (
      <div className="App" style={styleApp}>
        <LoginRegister 
          visibleForm={this.state.visibleForm}
          showVisibleForm={this.showVisibleForm}
          statusLogin={this.state.statusLogin}
          setStatusUsers={this.setStatusUsers}
          hideVisibleForm={this.hideVisibleForm}
          hiddenBody={this.state.hiddenBody}
          showRegularSection={this.showRegularSection}/>
        <Friends 
          vissibleFriends={this.state.vissibleFriends}
          hideFriendsSection={this.hideFriendsSection}/>  
        <MenuLeftDrop 
          hideBody={this.hideBody}
          showVisibleForm={this.showVisibleForm}
          statusLogin={this.state.statusLogin}
          setStatusUsers={this.setStatusUsers}
          showFriendsSection={this.showFriendsSection}/>
        <Regulations
          vissibleRegular={this.state.vissibleRegular}
          hideRegulatSection={this.hideRegulatSection}/>  
          <div className={this.state.hiddenBody ?
            "hide-body"
            :""}
            onClick={this.hideBody}/>
        <Navigation
          hiddenBody={this.state.hiddenBody} 
          hideBody={this.hideBody}
          showBody={this.showBody}
          showVisibleForm={this.showVisibleForm}
          statusLogin={this.state.statusLogin}
          setStatusUsers={this.setStatusUsers}
          setStyleMarginLeftApp={this.setStyleMarginLeftApp}
          setStyleMenuDropLeft={this.setStyleMenuDropLeft}/>
        <Intro/>
        <div className="picture-1">
          <div className="parallax-1"></div>
        </div>
        <Article/>
        <div className="picture-2">
          <div className="parallax-2"></div>
        </div>
        <Footer
         showRegularSection={this.showRegularSection}/>
      </div>
    );
  }
}

export default App;


