import React from 'react';
import firebase from 'firebase';

var newId = 0;
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
var referenceUser;

// Update data information user actually login//

function updateData() {
    data = allScore[referenceUser];
}

// Donwload base all users //

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
    
    if(setLogin) {
        whenDownloadBase();
        setLogin = false;
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
    if(status === "login") {
        hideTableLoginReference();
        setStatusUserReference();
    }
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
        friends: [newId]
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
    document.getElementsByClassName("register-complete")[0].style.display= "block";
    setTimeout(function(){
        document.getElementsByClassName("register-complete-block")[0].style.opacity = 1;
    },500);
    setTimeout(function(){
        document.getElementsByClassName("register-complete-block")[0].style.opacity = 0;
    },2500);
    setTimeout(()=>{
        document.getElementsByClassName("register-complete")[0].style.display= "none";
        hideRegisterLogin();
    },3000);     
}

//Section Login user //
var user;
var passwrd;
var hideTableLoginReference;
var setStatusUserReference;
var setLogin = false;

export function tryLoginUser(userName, password, hideTableLogin, setStatusUsers) {
    hideTableLoginReference = hideTableLogin;
    setStatusUserReference = setStatusUsers;
    user = userName;
    passwrd = password;
    setLogin = true;
    downloadBase();
}

function whenDownloadBase() {
    for(let i = 0; i <allScore.length; i++){
        if(user === allScore[i].nameUser && passwrd === allScore[i].password) {
            document.getElementsByClassName("arrow-up-wrong")[0].style.opacity = 0;
            document.getElementsByClassName("table-wrong-password-login")[0].style.opacity = 0;
            document.getElementsByClassName("form-login-input")[0].value = "";
            document.getElementsByClassName("form-login-input")[1].value = "";
            referenceUser = i;
            updateData();
            getImage('login');
            return;
        }
        else {
            document.getElementsByClassName("arrow-up-wrong")[0].style.opacity = 1;
            document.getElementsByClassName("table-wrong-password-login")[0].style.opacity = 1;
        }
    }
}