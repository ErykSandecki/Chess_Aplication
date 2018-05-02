import React from 'react';
import firebase from 'firebase';

var id = 0;
var allScore = [];
export var data;
var fileName;
var storageRef;
export var urlImage;
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
var storage = firebase.storage();
var pathReference = storage.ref();

export function getImage(){
    var starsRef = pathReference.child(data.nameUser);

starsRef.getDownloadURL().then(function(url) {
  urlImage = url;
}).catch(function(error) {

  switch (error.code) {
    case 'storage/object_not_found':
      break;

    case 'storage/unauthorized':
      break;

    case 'storage/canceled':
      break;

    case 'storage/unknown':
      break;
  }
});
}

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

export function sendReferencePicture(file){
    fileName = file;
}

export function addUser(value, callBack, setStatusUser) {
    downloadBase();
    data = {
        id: id + 1,
        nameUser: value[0],
        email: value[1],
        password: value[2],
        name: value[3],
        surname: value[4],
        country: value[5],
        dateSince: value[6],
        city: value[7],
        region: value[8],
        phone: value[9],
        friends: [id]
    }
    ref.push(data);
    if(fileName) {
        storageRef = firebase.storage().ref(data.nameUser);
        var task = storageRef.put(fileName);
        task.on('state_changed',function progress(snapshot) {
           var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           document.getElementsByClassName("progress-bar-register-upload-picture-status")[0].style.width = percentage + "%";
           if(percentage === 100) {
               setTimeout(function(){
                viewCompleteRegistration(callBack, setStatusUser);
               },1000);
           }
        }, function error(err) {
        })
        function complete() {
        }
    }
    else {
        viewCompleteRegistration(callBack, setStatusUser);
    }
}

function viewCompleteRegistration(callBack, setStatusUser) {
    document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
    document.getElementsByClassName("register-complete")[0].style.display= "block";
    setTimeout(function(){
        document.getElementsByClassName("register-complete-block")[0].style.opacity = 1;
    },500);
    setTimeout(function(){
        document.getElementsByClassName("register-complete-block")[0].style.opacity = 0;
    },2500);
    setTimeout(()=>{
        document.getElementsByClassName("register-complete")[0].style.display= "none";
        callBack();
        setStatusUser();
    },3000);     
}