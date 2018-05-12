import React, {Component} from 'react';
import './index.css';
import {checkNewNotificationsFriends, deleteNotificationFriends, actuallyUser, allUsers, acceptedInviteFriends, deleteInviteFriends} from '../../Firebase/index.js';
import arrowUpNotifications from '../../Images/arrow-up-notifications.png';
import FadeIn from 'react-fade-in';

export default class NotificationsNewFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNotifications: false,
            showNotifiactions: false,
            reverseFriendsUsers: [],

        }
        this.readNewNotificationsNewFriends = this.readNewNotificationsNewFriends.bind(this);
        this.sortReverseUser = this.sortReverseUser.bind(this);
    }

    componentDidMount() {
      referenceNotificationsNewFriends = this;
      checkNewNotificationsFriends();
    }

    readNewNotificationsNewFriends() {
        deleteNotificationFriends();
        this.setState({
            newNotifications: false,
            showNotifiactions: !this.state.showNotifiactions,
        });
    }

    renderNotifications(user, index) {
        let userData;
	    let acceptedUser = false;
        for(let i = 0; i<allUsers.length;i++) {
            if(user.id === allUsers[i].id){
                userData = allUsers[i];
            }
        } 
        if(!userData){
            return null;
        }
	    if(actuallyUser.friends){	
		    for(let i = 0; i<actuallyUser.friends.length;i++) {
			    if(actuallyUser.friends[i].id === userData.id) {
                    if(!actuallyUser.friends[i].isFriends && actuallyUser.friends[i].direction === 'send'){
                        return null;
                    }
                    acceptedUser = true;
                    
				    break;	
			    }			
		    }
	    }	
	    if(!acceptedUser){
		    return null;		
        }
        return <div key={index} className="notifications-friends-invite">
                    <img className="notifications-friends-invite-image" src={userData.pictureUrl} alt={userData.name}/>
                    <div className="notifications-friends-invite-name-surname">{userData.name + ' ' + userData.surname}</div>
                    {user.isFriends ?
                    <p className="notifications-friends-isfriends">Jesteście nowymi znajomymi!</p>
                    :<React.Fragment>
                        <p className="notifications-friends-isfriends">Zostałeś zaproszony/a!</p>
                        <button className="notifications-friends-invite-button btn btn-success" onClick={()=>{acceptedInviteFriends(userData)}}>Zaakceptuj</button>
                        <button className="notifications-friends-invite-button btn btn-warning" onClick={()=>{deleteInviteFriends(userData)}}>Usuń</button>
                    </React.Fragment>}
                    <div className="notifications-friends-invite-underline"></div>
               </div>
    }

    sortReverseUser() {
        let sortUsers = [];
        if(actuallyUser.friends){
            for(let i = actuallyUser.friends.length - 1; i >= 0; i--) {
                sortUsers.push(actuallyUser.friends[i]);
            }
           this.setState({ reverseFriendsUsers: sortUsers});
        }
    }

    render() {
        return (
            <div className="notifications-friends">
                <span className="notifications-friends-icon glyphicon glyphicon-user" onClick={this.readNewNotificationsNewFriends}></span>
                {this.state.newNotifications ? 
                    <p className="notifications-friends-new-notifications" onClick={this.readNewNotificationsNewFriends}>!</p>
                    : null}
                {this.state.showNotifiactions ?
                <FadeIn>
                    <img className="notifications-friends-arrow" src={arrowUpNotifications} alt="arrow-notifications"/>        
                    <div className="notifications-friends-title">POWIADOMIENIA <span className="glyphicon glyphicon-remove" onClick={this.readNewNotificationsNewFriends}/></div>
                    <div className="notifications-friends-table"> 
                        {this.state.reverseFriendsUsers.map((user, index)=>{
                            return this.renderNotifications(user,index)
                        })}  
                    </div>
                </FadeIn>  
                :null}
                  
            </div>
        )
    }
}

export var referenceNotificationsNewFriends;
