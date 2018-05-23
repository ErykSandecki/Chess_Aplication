// eslint-disable-next-line
import React, { Component } from 'react';

import firebase from 'firebase';

export default class Firebase extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp({
            apiKey: "AIzaSyDSK_jiqW71rTExUfsHBHFMHP9-eIlJkoM",
            authDomain: "chess-base-aa6a9.firebaseapp.com",
            databaseURL: "https://chess-base-aa6a9.firebaseio.com",
            projectId: "chess-base-aa6a9",
            storageBucket: "chess-base-aa6a9.appspot.com",
            messagingSenderId: "633252114971",
        });
        this.checkFriend = null;

        this.downloadDatabase = this.downloadDatabase.bind(this);
        this.downloadAdminBase = this.downloadAdminBase.bind(this);
    }

    componentDidMount() {
        let adminData = firebase.database().ref('admin');
        let databaseUsers = firebase.database().ref('users')
        let storageRef = firebase.storage();
        this.props.setDataAdmin(adminData);
        this.props.getReferenceDataBase(databaseUsers);
        this.props.getReferenceStorage(storageRef);
        adminData.on("value", this.downloadAdminBase, this.errData);
        databaseUsers.on("value", this.downloadDatabase, this.errData);
    };

    downloadDatabase(data) {
        let scores = data.val();
        let keys = Object.keys(scores);
        let allScore = [];
        let actuallyUser;
        for(let i = 0; i < keys.length; i++) {
            allScore.push(scores[keys[i]]);
            if(this.props.statusLogin) {
               if(allScore[i].nameUser === this.props.actuallyUser.nameUser) {
                    actuallyUser = allScore[i];
               } 
            }
        }

        this.actuallyUserForRefresh = allScore;
    
        if(this.props.statusLogin) {
            if(this.props.actuallyUser.nameUser !== 'admin') {
                if(actuallyUser.status === 'offline' || !actuallyUser.checkStatus) {
                    actuallyUser.status = 'online';
                    actuallyUser.checkStatus = true;
                    firebase.database().ref('users').child(actuallyUser.id).set(actuallyUser);   
                }
                this.props.setActullayUser(actuallyUser);
                this.props.updateUsers(allScore);
            }
            else {
                    if(this.checkExistingUser(allScore)) {
                        this.props.updateUsers(allScore);
                    }
                    clearTimeout(this.checkFriend);
                    this.checkFriend = setTimeout(() => {
                        this.checkFriendIsFriend(allScore);
                    },1000);
            }
        }
        
        else {
            this.props.updateUsers(allScore);
        }
        
        if(this.props.statusRegisterNewUser) {
            this.setIdUser(allScore, keys);
            this.props.setStatusRegisterNewUser(false);
        }   
             
    };

    downloadAdminBase(data) {
        let scores = data.val();
        this.props.setAdminBase(scores);
        if(this.props.statusLogin) {
            if(this.props.adminBase.status === 'offline') {
                this.props.setStatusLoginUser(false);
            }
        }  
    }

    setIdUser(allScore, keys) {
        allScore[allScore.length - 1].id = keys[keys.length - 1];
        firebase.database().ref('users').child(keys[keys.length - 1]).set(allScore[allScore.length - 1]);
        this.props.setActullayUser(allScore[allScore.length - 1]);
        this.props.updateUsers(allScore);
    }

    checkExistingUser(allScore) {
        let checkFriends;
        for(let i = 0; i < allScore.length; i++) {
            if(allScore[i].friends) {   
                checkFriends = allScore[i].friends.filter((friend) => {
                    return allScore.find((user) => {
                        return user.id === friend.id
                    })
                }).map((friend) => {
                    return friend;
                })
                if(checkFriends.length !== allScore[i].friends.length) {
                    firebase.database().ref('users').child(allScore[i].id).child('friends').set(checkFriends);
                    return false;
                }
            } 
        }
        return true;
    }

    checkFriendIsFriend(allScore) {
        allScore.forEach((user) => {
            if(user.friends) {
                let friendIsFriend = user.friends.filter((friend) => {
                        let friendSearch = allScore.findIndex((score) => {
                            return score.id === friend.id
                    })  
                    if(allScore[friendSearch].friends) {
                       return allScore[friendSearch].friends.find((yourId) => {
                            return user.id === yourId.id; 
                        })
                    }
                    else{
                        return false;
                    } 
                        
                }).map((friend) => {
                    return friend;
                })   
                if(user.friends.length !== friendIsFriend.length) {
                    firebase.database().ref('users').child(user.id).child('friends').set(friendIsFriend);
                }          
            }
          
        })
        
    }

    errData(err) {
        console.log(err);
    }

    render() {
        return null;
    };
}