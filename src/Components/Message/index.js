import './index.css';
import React, { Component } from 'react';
import {actuallyUser, allUsers, setChat, checkStatusOnlineUsers, changeStatus} from '../../Firebase/index.js';
import FadeIn from 'react-fade-in';

export default class Message extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
            firstCheckStatus: true,
            vissibleWindowChat: false
        }
        this.showChat = this.showChat.bind(this);
        this.refreshChat = this.refreshChat.bind(this);
        this.showWindowChat = this.showWindowChat.bind(this);
    }

    componentDidMount() {
        referenceMessage = this;
        if(this.state.firstCheckStatus) {
            this.setState({firstCheckStatus: false});
            checkStatusOnlineUsers();
        } 
        setChat();
        checkOnlineUsers = setInterval(()=>{
            checkStatusOnlineUsers();
            setTimeout(()=>{
                changeStatus();
                this.refreshChat();
            },1000);
        },30000)
    }

    showChat() {
        this.setState({showChat: !this.state.showChat});
    }

    refreshChat() {
        if(this.state.showChat){
            this.setState({showChat: true});
        }
    }

    showWindowChat(user, index) {
        if(!visibleWindow) {
            return;
        }
        let userData;
        for(let i = 0; i<allUsers.length;i++) {
            if(user.id === allUsers[i].id && user.isFriends){
                userData = allUsers[i];
            }
        } 
        if(!userData){
            return null;
        }
        if(friendsWindowChat){
            for(let i = 0; i<friendsWindowChat.length;i++) {
                if(friendsWindowChat[i].id === userData.id) {
                    return;
                }
            }
        }
        friendsWindowChat.push(userData);
        this.setState({vissibleWindowChat: true});
    }

    renderWindowChat(user, index) {
        let message;
        for(let i = 0; i < actuallyUser.friends.length;i++) {
            if(actuallyUser.friends[i].id === user.id) {
                message = actuallyUser.friends[i].message;
                break;
            }
        }

        return <div key={index} className="message-window-chat">
                    <div className="message-window-chat-title">
                        <span className="message-window-chat-user">{user.name + ' ' + user.surname}</span>
                        <span className="message-window-chat-close glyphicon glyphicon-remove " onClick={()=>{this.deleteAnyWindowChat(user)}}></span>
                        <div className="message-window-chat-contain">
                            {message.map((contain, index)=>{
                                return this.renderMessage(contain,index);
                            })}
                        </div>
                        <div className="message-window-chat-text">
                            <textarea type="text" rows="1"  className="message-window-chat-text-input" />
                        </div>
                    </div>
                </div>
    }

    renderMessage(contain, index) {
        if(contain.contain === "Jesteście znajomymi!"){
            return <div key={index} className="message-window-chat-message-first">
                        <img className="message-window-chat-img-first" src={contain.userPicture}/>
                        <div className="message-window-chat-message-contain-first">{contain.contain}</div>
                    </div> 
        }
    }

    deleteAnyWindowChat(user) {
        for (let i = 0; i<friendsWindowChat.length;i++) {
            if(friendsWindowChat[i].id === user.id) {
                friendsWindowChat.splice(i,i+1);
            }
        }
        this.setState({vissibleWindowChat: true});
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

        return  <div key={index} className="message-contact-filter-friends" 
                        onClick={()=>{visibleWindow = true;
                            this.showWindowChat(user, index)}}>
                    <img src={userData.pictureUrl} alt={index} className="message-contact-filter-friends-image"/>
                    <p className="message-contact-filter-friends-user">{userData.name + ' ' + userData.surname}</p>
                    {userData.status ?
                        <div className="message-contact-filter-friends-status"></div>
                        :null}             
                    <div className="message-contact-filter-friends-underline"></div>
                </div>
    }

    render() {
        return (
                <React.Fragment>
                    <div className="message">
                        <div className="message-title">
                            <span className="message-title-text" onClick={this.showChat}>Wiadomości</span>
                            <span className="message-title-settings glyphicon glyphicon-cog"></span>
                            <span className="message-title-new-message glyphicon glyphicon-plus"></span>
                            {actuallyUser.friends ?
                                this.state.showChat ?
                                <FadeIn>
                                    <div className="message-contacts-filter">
                                        {actuallyUser.friends.map((user, index)=>{
                                            return this.renderListFriendsChat(user,index)
                                        })}
                                    </div>
                                </FadeIn>
                                    :null
                                : null}
                        </div>
                    </div>
                    {friendsWindowChat.length && this.state.vissibleWindowChat ?
                    friendsWindowChat.map((user,index)=>{
                        return this.renderWindowChat(user,index);
                    })
                    : null}
                </React.Fragment>
               )
    }
}
export var checkOnlineUsers;
export var referenceMessage;
var visibleWindow = false;
var friendsWindowChat = [];

export function resetFriendsWindowChat() {
    friendsWindowChat = [];
}
