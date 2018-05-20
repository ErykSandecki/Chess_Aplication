import './style.css';

import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

import arrowUpNotifications from '../../Images/arrow-up-notifications.png';

export default class NotificationsNewFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNotifications: false,
            showNotifiactions: false,
            renderNewNotifications: false,
            notifications: null,
        } 

        this.timeNotification = null;

        this.readNewNotificationsNewFriends = this.readNewNotificationsNewFriends.bind(this);
        this.setVisibleNotifications = this.setVisibleNotifications.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.actuallyUser !== this.props.actuallyUser){
           this.readNewNotificationsNewFriends();
        }
        if((this.state.notifications && prevState.notifications !== this.state.notifications) || 
            prevProps.actuallyUser !== this.props.actuallyUser) {
            if(this.timeNotification){
                clearTimeout(this.timeNotification);
            }
            if(!this.props.actuallyUser.friends){
                this.setState({notifications: null});
                return;
            }
            this.timeNotification = setTimeout(()=>{
                this.setState({notifications: null});
                this.clearNotifications();
            },5000)
        }
    }

    componentDidMount() {
        this.readNewNotificationsNewFriends();
    }

    renderNotifications(user, index, friend) {
        if(user) {
            if(friend.direction !== 'send' || friend.isFriends){
                return <div key={index} className="notifications-friends-invite">
                            <img className="notifications-friends-invite-image" src={user.pictureUrl} alt={user.name}/>
                            <div className="notifications-friends-invite-name-surname">{user.name + ' ' + user.surname}</div>
                            {friend.isFriends ?
                                <p className="notifications-friends-isfriends">Jesteście nowymi znajomymi!</p>
                                :<React.Fragment>
                                    <p className="notifications-friends-isfriends">Zostałeś zaproszony/a!</p>
                                    <button className="notifications-friends-invite-button btn btn-success" onClick={()=>{this.acceptedInviteFriends(user)}}>Zaakceptuj</button>
                                    <button className="notifications-friends-invite-button btn btn-warning" onClick={()=>{this.deleteInviteFriends(user)}}>Usuń</button>
                                </React.Fragment>
                            }
                            <div className="notifications-friends-invite-underline"></div>
                        </div>
            }
        }
        return null;     
    }

    acceptedInviteFriends(user) {
        let actuallyUser = this.props.actuallyUser;
        let actuallyUserIndex = actuallyUser.friends.findIndex((friends)=>{
         return friends.id === user.id   
        })
        let userIndex = user.friends.findIndex((friend)=>{
            return friend.id === actuallyUser.id
        });
        actuallyUser.friends[actuallyUserIndex].isFriends = true;
        user.friends[userIndex].isFriends = true;
        this.changeDataBase(actuallyUser, user);
    }

    deleteInviteFriends(user) {
        let actuallyUser = this.props.actuallyUser;
        let actuallyUserIndex = actuallyUser.friends.findIndex((friend)=>{
            return friend.id === user.id
        });
        let userIndex = user.friends.findIndex((friend)=>{
            return friend.id === actuallyUser.id
        });
        actuallyUser.friends.splice(actuallyUserIndex, actuallyUserIndex + 1);
        user.friends.splice(userIndex, userIndex + 1);
        this.changeDataBase(actuallyUser, user);
    }

    changeDataBase(actuallyUser, user) {
        let refYourUser = this.props.databaseUsers.child(actuallyUser.id).child('friends');
        let refFriend = this.props.databaseUsers.child(user.id).child('friends');
        refYourUser.set(actuallyUser.friends);
        refFriend.set(user.friends);
    }

    setVisibleNotifications() {
        this.setState({showNotifiactions: !this.state.showNotifiactions});
        if(this.props.actuallyUser.friends) {
            this.props.actuallyUser.friends.forEach((friend)=>{
                if(!friend.read) {
                    friend.read = true;
                }
            })
            this.props.databaseUsers.child(this.props.actuallyUser.id).child('friends').set(this.props.actuallyUser.friends);
        }
        this.readNewNotificationsNewFriends();
    };

    readNewNotificationsNewFriends() {
       if(this.props.actuallyUser.friends) {
           let friends = this.props.actuallyUser.friends;
           let anyFriend;
           if(friends.find((friend)=>{
                return (friend.direction === 'get' && !friend.read && !friend.isFriends) ||
                       (friend.direction === 'send' && !friend.read && friend.isFriends)
           })) {              
             this.setState({newNotifications: true});
             friends.find((friend)=>{
                 anyFriend = friend;
                 return !friend.showNotifications
             })
             if(!anyFriend.showNotifications) {
                    let notifications;
                    notifications = friends.filter((friend)=>{
                        return friend.direction === 'get' && !friend.read && !friend.isFriends && !friend.showNotifications
                               
                    }).map((friend)=>{
                        return friend;
                    });
                   this.setState({notifications});
             }
           }
           else {
            this.setState({newNotifications: false});
           }
       }
    }

    renderNewInviteNotifications(friend, index) {
        let user = this.props.usersData.find((user)=>{
            return user.id === friend.id
        })
        return <FadeIn key={index}>
                    <div className="notifications-show-new">
                        <img className="notifications-show-new-image" 
                        src={user.pictureUrl}
                        alt={'notifications'+index}
                        />
                        <p className="notifications-show-new-user">{user.name + ' ' + user.surname}</p>
                        <p className="notifications-show-new-text">Zaprasza cię do znajomych!</p>
                    </div>
               </FadeIn>
    }

    clearNotifications() {
        let actuallyFriends = this.props.actuallyUser.friends;
        actuallyFriends.forEach((friend)=>{
                if(!friend.showNotifications){
                    friend.showNotifications = true;
            } 
        });
       this.props.databaseUsers.child(this.props.actuallyUser.id).child('friends').set(actuallyFriends);
       this.oldLengthNotifications = 0;
    }

    render() {
        return (
            this.props.actuallyUser.nameUser !== 'admin' &&
            this.props.statusLogin ?
            <React.Fragment>
            {this.state.notifications ?
                <div className="notifications-show-table">
                {this.state.notifications.map((friend, index)=>{
                    return this.renderNewInviteNotifications(friend, index);
                })}
                </div>
                :null}
            <div className="notifications-friends">
                <span className="notifications-friends-icon glyphicon glyphicon-user"
                      onClick={this.setVisibleNotifications}        
                >
                </span>
                {this.state.newNotifications ?
                    this.props.actuallyUser.friends ?
                        <p className="notifications-friends-new-notifications"
                           onClick={this.setVisibleNotifications} 
                        >
                            !
                        </p>    
                        :null
                    : null}
                {this.state.showNotifiactions ?
                <FadeIn>
                    <img className="notifications-friends-arrow" 
                         src={arrowUpNotifications} 
                         alt="arrow-notifications"
                    />        
                    <div className="notifications-friends-title">
                         POWIADOMIENIA
                         <span className="glyphicon glyphicon-remove" 
                               onClick={this.setVisibleNotifications}
                         /></div>
                    <div className="notifications-friends-table">
                    {this.props.actuallyUser.friends ?
                        this.props.actuallyUser.friends.slice(0).reverse().map((friend, index)=>{
                            return this.renderNotifications(this.props.usersData.find((user)=>{
                                return user.id === friend.id;
                            }),index, friend);
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

export var referenceNotificationsNewFriends;
