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
        this.props.getReferenceDataBase(databaseUsers);
        databaseUsers.on("value",this.downloadDatabase, this.errData);
    };

    downloadDatabase(data) {
        let scores = data.val();
        let keys = Object.keys(scores);
        let allScore = [];
        for(let i = 0; i < keys.length; i++) {
            allScore.push(scores[keys[i]]);
        }
        this.props.updateUsers(allScore);
    };

    errData(err) {
        console.log(err);
    }

    render() {
        return null;
    };
}