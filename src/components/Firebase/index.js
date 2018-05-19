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

        this.downloadDatabase = this.downloadDatabase.bind(this);
    }

    componentDidMount() {
        let databaseUsers= firebase.database().ref('users')
        let storageRef = firebase.storage();
        this.props.getReferenceDataBase(databaseUsers);
        this.props.getReferenceStorage(storageRef);
        databaseUsers.on("value",this.downloadDatabase, this.errData);
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
        if(this.checkExistingUser(allScore, actuallyUser)) {
            this.props.setActullayUser(actuallyUser);
            this.props.updateUsers(allScore);
            if(this.props.statusRegisterNewUser) {
                this.setIdUser(allScore, keys);
                this.props.setStatusRegisterNewUser(false);
            }   
        }
             
    };

    setIdUser(allScore, keys) {
        allScore[allScore.length - 1].id = keys[keys.length - 1];
        firebase.database().ref('users').child(keys[keys.length - 1]).set(allScore[allScore.length - 1]);
        this.props.setActullayUser(allScore[allScore.length - 1]);
        this.props.updateUsers(allScore);
    }

    checkExistingUser(allScore) {
        let checkFriends;
        for(let i = 0; i < allScore.length;i++) {
            if(allScore[i].friends) {   
                checkFriends = allScore[i].friends.filter((friend)=>{
                    return allScore.find((user)=>{
                        return user.id === friend.id
                    })
                }).map((friend)=>{
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

    errData(err) {
        console.log(err);
    }

    render() {
        return null;
    };
}