import React, {Component} from 'react';
import './style.css';
import arrowUpNotifications from '../../Images/arrow-up-notifications.png';
import FadeIn from 'react-fade-in';

export default class NotificationsNewFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            newNotifications: false,
            showNotifiactions: false,
        } 

        this.readNewNotificationsNewFriends = this.readNewNotificationsNewFriends.bind(this);
    }

    componentDidMount() {
        this.readNewNotificationsNewFriends();
    }

    renderNotifications(user, index, friend) {
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

    setVisibleNotifications = () => {this.setState({showNotifiactions: !this.state.showNotifiactions})};

    readNewNotificationsNewFriends() {
       if (this.props.actuallyUser.friends) {
           let friends = this.props.actuallyUser.friends;
           if(friends.find((friend)=>{
                return (friend.direction === 'get' && !friend.read && !friend.isFriends)||
                       (friend.direction === 'send' && !friend.read && friend.isFriends)
           })) {
             this.setState({newNotifications: true});
           }
       }
    }

    render() {
        return (
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
        )
    }
}

export var referenceNotificationsNewFriends;
