import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

import arrowUpNotifications from '../../Images/arrow-up-notifications.png';

import './style.css';

export default class NotificationsNewMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showNotifiactions: false,
            userWrite: null,
        } 
        
        this.checkNewMessageNotRead = this.checkNewMessageNotRead.bind(this);
        this.addUserToChatWindow = this.addUserToChatWindow.bind(this);
        this.checkAlreadyUser = this.checkAlreadyUser.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        this.checkNewMessageNotRead();
        this.checkAlreadyUser();
    }

    componentDidMount() {
        this.checkNewMessageNotRead();
    }

    checkNewMessageNotRead() {
        if(this.props.actuallyUser.friends) {
            let userWrite = [];
            this.props.actuallyUser.friends.filter((friend) => {
                if(this.props.chatUsersWindow) {
                    return friend.newMessage && !this.props.chatUsersWindow.find((chatUser) => {
                        if(chatUser.id === friend.id) {
                           this.setReadMessage(friend);
                        }
                        return chatUser.id === friend.id;
                    }) 
                }   
                else {
                    return friend.newMessage;
                }
                
            }).forEach((friend) => {
                userWrite.push(this.props.usersData.find((user) => {
                    return user.id === friend.id
                }))
            })
            
            if(!this.state.userWrite) {
                    if(userWrite.length !== 0) {
                        this.setState({userWrite});
                    }
                    
            }    
            else if(this.state.userWrite.length !== userWrite.length) {
                if(userWrite.length === 0) {
                    this.setState({userWrite: null});   
                }
                else {
                    this.setState({userWrite});
                }    
            }
        }
    }

    setReadMessage(friend) {
        friend.newMessage = false;
        let indexFriends = this.props.actuallyUser.friends.findIndex((userFriend) => {
            return userFriend.id === friend.id;
        })
        this.props.databaseUsers.child(this.props.actuallyUser.id).child('friends').child(indexFriends).set(friend);
    }

    checkAlreadyUser() {
        let chatUser = [];
        if(this.props.chatUsersWindow && this.state.userWrite) {
            chatUser = this.state.userWrite.filter((user) => {
                return !this.props.chatUsersWindow.find((chatUser) =>{
                    return chatUser.id === user.id;
                })
            })
            if(chatUser.length === 0) {
                this.setState({userWrite: null});
            }
            else if(chatUser.length !== this.state.userWrite.length) {
                this.setState({userWrite: chatUser});
            }
        }
    }

    setVisibleNotifications = () => {this.setState({showNotifiactions: !this.state.showNotifiactions });}

    renderNotifications(user, index) {
        if(user) {
            return <div className="notifications-message-invite"
                        key={index}
                    >
                            <img className="notifications-message-new-message-image" 
                                 src={user.pictureUrl} 
                                 alt={user.name}
                                 onClick={() => {this.addUserToChatWindow(index)}}
                            />
                            <div className="notifications-message-new-message-name-surname">
                                {user.name + ' ' + user.surname}
                            </div>
                            <p className="notifications-message-new-message-text">Napisał/a do ciebie!</p>
                            <div className="notifications-message-new-message-underline"></div>
                    </div>
        }
        return null;     
    }

    addUserToChatWindow(index) {
        let chatUser = [];
        if(!this.props.chatUsersWindow) {
            chatUser.push(this.state.userWrite[index]);
            this.props.sendNewUserToWindowChat(chatUser);
        }
        else {
            chatUser = this.props.chatUsersWindow;
            chatUser.push(this.state.userWrite[index]);
            this.props.sendNewUserToWindowChat(chatUser);
        }   
    }

    render() {
        return (
            this.props.actuallyUser.nameUser !== 'admin' &&
            this.props.statusLogin ?
            <React.Fragment>
            <div className="notifications-message">
                <span className="notifications-message-icon glyphicon glyphicon-envelope"
                      onClick={this.setVisibleNotifications}        
                >
                </span>
                {this.state.userWrite ?
                    this.props.actuallyUser.friends ?
                        <p className="notifications-message-new-notifications"
                           onClick={this.setVisibleNotifications} 
                        >
                            !
                        </p>    
                        :null
                    : null}
                {this.state.showNotifiactions ?
                <FadeIn>
                    <img className="notifications-message-arrow" 
                         src={arrowUpNotifications} 
                         alt="arrow-notifications"
                    />        
                    <div className="notifications-message-title">
                         NOWE WIADOMOŚCI!
                         <span className="glyphicon glyphicon-remove" 
                               onClick={this.setVisibleNotifications}
                         /></div>
                    <div className="notifications-message-table">
                    {this.state.userWrite ?
                        this.state.userWrite.map((friend, index) => {
                            return this.renderNotifications(friend, index);
                        })    
                        :null
                    } 
                    </div>
                </FadeIn>  
                :null}
            </div>
            </React.Fragment>
            :null
        )
    }
}
