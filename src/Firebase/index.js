import React from 'react';
import firebase from 'firebase';

var newId = 0;
var allScore = [];
export var allUsers;
export var data;
export var urlImage;
export var allUrl;
var fileName;
var storageRef;

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
var referenceUser;

// Update data information user actually login//

function updateData() {
    data = allScore[referenceUser];
    allUsers = allScore;
}

export function updateAndDownloadBase () {
    ref.on("value", donwloadData, errData);
}

function donwloadData(data) {
    let scores = data.val();
    let keys = Object.keys(scores);
    allScore = [];
    for(let i = 0; i < keys.length; i++) {
        allScore.push(scores[keys[i]]);
    }
    allUsers = allScore;
    console.log(allScore);
}

// Donwload base all users when use Login or Register //

export function downloadBase() {
    ref.on("value", gotData, errData);
}

function gotData(data){
    let scores = data.val();
    let keys = Object.keys(scores);
    allScore = [];
    for(let i = 0; i < keys.length; i++) {
        allScore.push(scores[keys[i]]);
    }
}

function errData(err) {
    console.log(err);
}

// Download reference to image src and import image //

export function sendReferencePicture(file){
    fileName = file;
}

function getImage(status){
    var starsRef = pathReference.child(data.nameUser);
    starsRef.getDownloadURL().then(function(url) {
    urlImage = url;
    data.pictureUrl = url;
    ref.push(data);
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

// Section Register new user //


function donwloadNewId(data){
    let scores = data.val();
    let keys = Object.keys(scores);
    newId = keys.length - 1;
}

export function addUser(value, hideRegisterLogin, setStatusUser) {
    ref.on("value", donwloadNewId, errData);
    data = {
        id: newId + 1,
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
        friends: [newId],
        ranking: 0,
        pictureUrl: '',
    }
    if(fileName) {
        storageRef = firebase.storage().ref(data.nameUser);
        var task = storageRef.put(fileName);
        task.on('state_changed',function progress(snapshot) {
           var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           document.getElementsByClassName("progress-bar-register-upload-picture-status")[0].style.width = percentage + "%";
           if(percentage === 100) {
               setTimeout(function(){
                viewCompleteRegistration(hideRegisterLogin);
                getImage();
                setStatusUser();
               },1000);
           }
        }, function error(err) {
        })
        function complete() {
        }
    }
    else {
        viewCompleteRegistration(hideRegisterLogin);
    }
}

function viewCompleteRegistration(hideRegisterLogin) {
    document.getElementsByClassName("register-login-table")[0].style.opacity = 0;
    document.getElementsByClassName("register-login-register-complete")[0].style.display= "block";
    setTimeout(function(){
        document.getElementsByClassName("register-login-register-complete-block")[0].style.opacity = 1;
    },500);
    setTimeout(function(){
        document.getElementsByClassName("register-login-register-complete-block")[0].style.opacity = 0;
    },2500);
    setTimeout(()=>{
        document.getElementsByClassName("register-login-register-complete")[0].style.display= "none";
        hideRegisterLogin();
    },3000);     
}

//Section Login user //

export function tryLoginUser(userName, password, hideTableLogin, setStatusUsers) {   
    for(let i = 0; i <allScore.length; i++){
        if(userName === allScore[i].nameUser && password === allScore[i].password) {
            document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.opacity = 0;
            document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.opacity = 0;
            referenceUser = i;
            updateData();
            hideTableLogin();
            setTimeout(()=>{
                setStatusUsers();
                document.getElementsByClassName("register-login-form-login-input")[0].value = "";
                document.getElementsByClassName("register-login-form-login-input")[1].value = "";
            },500);
            return;
        }
        else {
            document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.opacity = 1;
            document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.opacity = 1;
        }
    }
}
