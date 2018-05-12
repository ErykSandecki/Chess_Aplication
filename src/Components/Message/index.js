import './index.css';
import React, { Component } from 'react';
import {actuallyUser, allUsers} from '../../Firebase/index.js';

export default class Message extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
        }
        this.setChat = this.setChat.bind(this);
        this.refreshChat = this.refreshChat.bind(this);
    }

    componentDidMount() {
        referenceMessage = this;
    }

    setChat() {
        this.setState({showChat: !this.state.showChat});
    }

    refreshChat() {
        if(this.state.showChat){
            this.setState({showChat: true});
        }
    }

    renderListFriendsChat(user, index) {        
        let userData;
        for(let i = 0; i<allUsers.length;i++) {
            if(user.id === allUsers[i].id && user.isFriends){
                userData = allUsers[i];
            }
        } 
        if(!userData){
            return null;
        }
          return  <div key={index} className="message-contact-filter-friends">
                        <img src={userData.pictureUrl} alt={index} className="message-contact-filter-friends-image"/>
                        <p className="message-contact-filter-friends-user">{userData.name + ' ' + userData.surname}</p>
                        <div className="message-contact-filter-friends-status"></div>
                        <div className="message-contact-filter-friends-underline"></div>
                    </div>
    }

    render() {
        return (
                <div className="message">
                    <div className="message-title">
                        <span className="message-title-text" onClick={this.setChat}>Wiadomości</span>
                        <span className="message-title-settings glyphicon glyphicon-cog"></span>
                        <span className="message-title-new-message glyphicon glyphicon-plus"></span>
                        {actuallyUser.friends ?
                            this.state.showChat ?
                            <div className="message-contacts-filter">
                                {actuallyUser.friends.map((user, index)=>{
                                   return this.renderListFriendsChat(user,index)
                                })}
                            </div>
                                :null
                            : null}
                    </div>
                </div>
               )
    }
}

export var referenceMessage;