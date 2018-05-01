import React from 'react';
import firebase from 'firebase';

var id = 0;
var allScore = [];

var config = {
    apiKey: "AIzaSyDSK_jiqW71rTExUfsHBHFMHP9-eIlJkoM",
    authDomain: "chess-base-aa6a9.firebaseapp.com",
    databaseURL: "https://chess-base-aa6a9.firebaseio.com",
    projectId: "chess-base-aa6a9",
    storageBucket: "chess-base-aa6a9.appspot.com",
    messagingSenderId: "633252114971"
};

firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref('users');
var storageRef = firebase.storage().ref();

export function downloadBase() {
    ref.on("value", gotData, errData);
}

function gotData(data){
    var scores = data.val();
    var keys = Object.keys(scores);
    allScore = [];
    for(let i = 0; i < keys.length; i++) {
        allScore.push(scores[keys[i]]);
    }
    id = allScore[allScore.length - 1].id;
}

function errData(err) {
    console.log("Error!")
    console.log(err);
}

export function addUser(value) {
    var data = {
        id: id + 1,
        nameUser: value[0],
        email: value[1],
        password: value[2],
        facebook: value[3],
        twitter: value[4],
        linkedIn: value[5],
        instagram: value[6],
        name: value[7],
        surname: value[8],
        country: value[9],
        dateSince: value[10],
        city: value[11],
        region: value[12],
        phone: value[13],
        friends: [id]
    }
    ref.push(data);
}