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
        for(let i = 0; i < keys.length; i++) {
            allScore.push(scores[keys[i]]);
            if(this.props.statusLogin) {
               if(allScore[i].nameUser === this.props.actuallyUser.nameUser) {
                    this.props.setActullayUser(allScore[i]);
               } 
            }
        }
        this.props.updateUsers(allScore);
        
        if(this.props.statusRegisterNewUser) {
            this.setIdUser(allScore, keys);
            this.props.setStatusRegisterNewUser(false);
        }
    };

    setIdUser(allScore, keys) {
        allScore[allScore.length - 1].id = keys[keys.length - 1];
        firebase.database().ref('users').child(keys[keys.length - 1]).set(allScore[allScore.length - 1]);
    }

    errData(err) {
        console.log(err);
    }

    render() {
        return null;
    };
}