import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

import './style.css';

export default class Message extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
            vissibleWindowChat: false,
            actuallyUserChat: null,
        }
        this.lengthWordTextArea = null;

        this.showChat = this.showChat.bind(this);
        this.refreshChat = this.refreshChat.bind(this);
        this.addUserToChat = this.addUserToChat.bind(this);
    }

    showChat() {
        this.setState({showChat: !this.state.showChat});
    }

  

    refreshChat() {
        if(this.state.showChat){
            this.setState({showChat: true});
        }
    }

    renderMessage(contain, index) {
        if(contain.contain === "Jesteście znajomymi!") {
            return <div key={index} className="message-window-chat-message-first">
                        <img className="message-window-chat-img-first" 
                             src={contain.userPicture}
                             alt={index}/>
                        <div className="message-window-chat-message-contain-first">
                            {contain.contain}
                        </div>
                    </div> 
        }
    }

    addUserToChat(user, index) {
        let actuallyUserChat;
        if(!this.state.actuallyUserChat) {
            actuallyUserChat = [user];
            this.setState({
                actuallyUserChat : actuallyUserChat,
                vissibleWindowChat : true,
            });
        }
        else {
            if(!this.state.actuallyUserChat.find((searchUser) => {
                return searchUser.id === user.id;
            })){
                actuallyUserChat = this.state.actuallyUserChat;
                actuallyUserChat.push(user);
                this.setState(actuallyUserChat);
            }
        }
    }

    renderWindowChat(user, index) {
        let friendResizeArea = this.props.actuallyUser.friends.find((friend) => {
            return friend.id === user.id;
        })
        return <div key={index} className="message-window-chat">
                    <div className="message-window-chat-title">
                        <span className="message-window-chat-user">
                            {user.name + ' ' + user.surname}
                        </span>
                        <span className="message-window-chat-close glyphicon glyphicon-remove " 
                        >
                        </span>
                        <div className="message-window-chat-contain">
                           
                        </div>
                        <div className="message-window-chat-text">
                            <textarea className="message-to-send" 
                                      name="message-to-send"  
                                      placeholder="Napisz nową wiadomość" 
                                      rows="1"
                                      onInput={(e) => {this.setHeightChat(e, friendResizeArea)}}
                                      onKeyDown={(e) => {this.sendMessage(e, friendResizeArea)}}
                                      >
                            </textarea>
                            <button className="message-window-send-message">
                                Wyślij
                            </button>          
                        </div>
                    </div>
                </div>
    }

    sendMessage(e, friendResizeArea) {
        if(e.keyCode === 13 && !e.shiftKey){
            e.preventDefault();
            
            e.target.rows = 1;
            console.log(e.target.value);
            e.target.value = '';
            e.target.parentNode.previousSibling.style.height = '250px';
        }
        
    }

    setHeightChat(e, friendResizeArea) {
        if(e.target.value.length < friendResizeArea.resizeArea[e.target.rows - 1]){
            e.target.rows -= 1;
            e.target.parentNode.previousSibling.style.height = (250 - 23 * (e.target.rows-1)) + 'px';
        }
        if((e.target.scrollHeight === 42 && e.target.rows === 1) ||
            (e.target.scrollHeight === 61 && e.target.rows === 2) ||
            (e.target.scrollHeight === 80 && e.target.rows === 3)) {
            friendResizeArea.resizeArea[e.target.rows] = e.target.value.length;
            e.target.parentNode.previousSibling.style.height = (250 - 23 * e.target.rows) + 'px';
            e.target.rows += 1;    
        }
    }

    renderListFriendsChat(friend, index) {        
        let user = this.props.usersData.find((user) => {
                        return friend.id === user.id;
                    })
                                        
        return  <div className="message-contact-filter-friends" 
                     key={index}
                     onClick={() => {
                         this.addUserToChat(user, index);
                     }}
                >
                    <img className="message-contact-filter-friends-image" 
                         src={user.pictureUrl} 
                         alt={index}
                    />
                    <p className="message-contact-filter-friends-user">
                        {user.name + ' ' + user.surname}
                    </p>
                    {user.status === 'online' ?
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
                            <span className="message-title-text" 
                                  onClick={this.showChat}
                            >
                                Wiadomości
                            </span>
                            <span className="message-title-settings glyphicon glyphicon-cog"></span>
                            <span className="message-title-new-message glyphicon glyphicon-plus"></span>
                            {this.props.actuallyUser.friends && this.state.showChat ?     
                                <FadeIn>
                                    <div className="message-contacts-filter">
                                        {this.props.actuallyUser.friends.filter((friend) => {
                                           return friend.isFriends && this.props.usersData.find((user)=>{
                                                return user.id === friend.id && user.status === 'online';    
                                           })}).map((friend, index) => {
                                                                            return this.renderListFriendsChat(friend, index)
                                                                            }
                                                                        )
                                        }
                                        {
                                            this.props.actuallyUser.friends.filter((friend) => {
                                            return friend.isFriends && this.props.usersData.find((user)=>{
                                                return user.id === friend.id && user.status === 'offline';    
                                           })}).map((friend , index) => {
                                                                            return this.renderListFriendsChat(friend, index);
                                                                        })
                                        }
                                    </div>
                                </FadeIn>
                            :null}
                            {this.state.vissibleWindowChat ?
                                this.state.actuallyUserChat.map((user , index) => {
                                    return this.renderWindowChat(user ,index);
                                })
                                :null
                            }
                        </div>
                    </div>
                </React.Fragment>
               )
    }
}

