import React, { Component } from 'react';
import firebase from 'firebase';

export default class Firebase extends Component {
    constructor(props){
        super(props);
        this.state ={
            actuallyUser: null,
            scores: null,
            keys: null,
            allUsers: null,
        }
        firebase.initializeApp({
            apiKey: "AIzaSyDSK_jiqW71rTExUfsHBHFMHP9-eIlJkoM",
            authDomain: "chess-base-aa6a9.firebaseapp.com",
            databaseURL: "https://chess-base-aa6a9.firebaseio.com",
            projectId: "chess-base-aa6a9",
            storageBucket: "chess-base-aa6a9.appspot.com",
            messagingSenderId: "633252114971"
        })
        this.donwloadData = this.donwloadData.bind(this);
        this.database = firebase.database()
    }

    componentDidMount() {
        let ref = this.database.ref('users');
        ref.on("value", this.donwloadData, this.errData);
    }

    donwloadData(data) {
        this.setState({
            scores: data.val(),
            allUsers: [],
        });
        this.setState({
            keys:Object.keys(this.state.scores)
        })
        let allScore = []
        for(let i = 0; i < this.state.keys.length; i++) {
            ({allUsers: this.state.allUsers.push(this.state.scores[this.state.keys[i]])});
        }
        console.log(this.state.allUsers);
    }

    errData(err) {
        console.log(err);
    }

    render() {
        return null;
    }
}

export var firebaseReference;
