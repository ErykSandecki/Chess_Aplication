import firebase from 'firebase';
import {uploadStatus} from '../Components/Friends/index.js';

export var allUsers;
export var data;


var config = {
    apiKey: "AIzaSyDSK_jiqW71rTExUfsHBHFMHP9-eIlJkoM",
    authDomain: "chess-base-aa6a9.firebaseapp.com",
    databaseURL: "https://chess-base-aa6a9.firebaseio.com",
    projectId: "chess-base-aa6a9",
    storageBucket: "chess-base-aa6a9.appspot.com",
    messagingSenderId: "633252114971"
};

firebase.initializeApp(config);
var register;
var database = firebase.database();
var ref = database.ref('users');
var storage = firebase.storage();
var pathReference = storage.ref();
var referenceUser;
var scores;
var keys;
var allScore = [];
var fileName;
var storageRef;

// Update data information user actually login//

function updateData() {
    if(referenceUser >= 0){
        data = allScore[referenceUser];
        if(!data){
            referenceUser -= 1;
            data = allScore[referenceUser];
        }
        allUsers = [];
        for(let i = 0; i < allScore.length;i++) {
            if(allScore[i]){
                if(data.nameUser !== allScore[i].nameUser){
                    allUsers.push(allScore[i])
                }
            }  
        }
        allUsers.push(data);
    }
    
    
}

export function updateAndDownloadBase () {
    ref.on("value", donwloadData, errData);
}

function donwloadData(data) {
    scores = data.val();
    keys = Object.keys(scores);
    allScore = [];
    for(let i = 0; i < keys.length; i++) {
        allScore.push(scores[keys[i]]);
    }
    allUsers = allScore;
     
    if(!register) {
        updateData();
        uploadStatus();
     }   
    
     if(register){
        downloadId();
        register = false;
    }
    console.log(allScore);
    
}

function errData(err) {
    console.log(err);
}

// Add send to friends users//

export function addInviteFriends(id) {
    let newData;
    if(data.invitesFriends){
        data.invitesFriends.push(id);
        newData = data.invitesFriends;
    }
    else {
        newData = [id];
    }
    let refAddInvite = database.ref('users').child(data.id).child('invitesFriends');
    refAddInvite.set(newData);
}

// Delete Invite friends //
export function deleteInviteFriends(id) {
    let invitesFriends = [];
    for(let i = 0; i<data.invitesFriends.length; i++) {
        if(data.invitesFriends[i] !== id) {
            invitesFriends.push(data.invitesFriends[i])
        }
    }
    let refDeleteInvite = database.ref('users').child(data.id).child('invitesFriends');
    refDeleteInvite.set(invitesFriends);
}

// Download reference to image src and import image //

export function sendReferencePicture(file){
    fileName = file;
}

// Donwload reference and id users //


function downloadId() {
   for(let i = 0; i < keys.length; i++) {
        if(data.nameUser === scores[keys[i]].nameUser){
           data.id = keys[i];
           referenceUser = i;
        }
    }
    database.ref('users').child(data.id).set(data);
}


// Section Register new user //
export function addUser(value, hideRegisterLogin, setStatusUser) {
    referenceUser = -1;
    setData(value);
    if(fileName) {
        storageRef = firebase.storage().ref(data.nameUser);
        var task = storageRef.put(fileName);
        task.on('state_changed',function progress(snapshot) {
           var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           document.getElementsByClassName("progress-bar-register-upload-picture-status")[0].style.width = percentage + "%";
           if(percentage === 100) {
               setTimeout(function(){
                viewCompleteRegistration(hideRegisterLogin);
                uploadImage();
                setStatusUser();
               },1000);
           }
        }, function error(err) {
        })
    }
    else {
        viewCompleteRegistration(hideRegisterLogin);
        register = true;
        data.pictureUrl="https://firebasestorage.googleapis.com/v0/b/chess-base-aa6a9.appspot.com/o/empty-logo-user.png?alt=media&token=d1e9b113-271f-4ec1-a2eb-8cd7a0f8bae9";
        ref.push(data);
        setStatusUser(); 
    }
}

function setData(value){
    data = {
        id: '',
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
        ranking: 0,
        pictureUrl: '',
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

function uploadImage(status){
    var starsRef = pathReference.child(data.nameUser);
    
    starsRef.getDownloadURL().then(function(url) {
        data.pictureUrl = url;
        register = true;
        ref.push(data); 
        fileName = null;
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
            default :
                break;    
    }
    });
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
            document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.display = "block";
            document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.display = "block";
            setTimeout(()=>{
                document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.opacity = 1;
                document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.opacity = 1;
                setTimeout(() => {
                    document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.opacity = 0;
                    document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.opacity = 0;
                    setTimeout(() => {
                        document.getElementsByClassName("register-login-arrow-up-wrong")[0].style.display = "none";
                        document.getElementsByClassName("register-login-table-wrong-password-login")[0].style.display = "none";
                    },500);
                },2000);
            },100)
        }
    }
}


