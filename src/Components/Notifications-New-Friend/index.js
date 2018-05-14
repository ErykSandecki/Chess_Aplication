import React, {Component} from 'react';
import './index.css';
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
