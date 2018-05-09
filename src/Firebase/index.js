/*import firebase from 'firebase';
import {classFriends} from '../Components/Friends/index.js';

export var allUsers;
export var actuallyUser;


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
        actuallyUser = allScore[referenceUser];
        if(!actuallyUser){
            referenceUser -= 1;
            actuallyUser = allScore[referenceUser];
        }
        allUsers = [];
        for(let i = 0; i < allScore.length;i++) {
            if(allScore[i]){
                if(actuallyUser.nameUser !== allScore[i].nameUser){
                    allUsers.push(allScore[i])
                }
            }  
        }
        allUsers.push(actuallyUser);
    }
    if(classFriends.props.vissibleFriends){
        classFriends.setState({
            filterSearch: 10,
            nextTop: 400,
        })
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
     }   
    
     if(register){
        downloadId();
        register = false;
    }

    
    
}

function errData(err) {
    console.log(err);
}

// Add send to friends users//

export function addInviteFriends(user) {
    let newData;
    let newDataForFriends;
    // Check that user have friends table//
    if(actuallyUser.friends){
        newData = {
            id: user.id,
            read:false,
            isFriends:false,
            direction:'send',
        }
        actuallyUser.friends.push(newData);
        newData = actuallyUser.friends;
    }
    
    else{
        newData = [{
            id: user.id,
            read:false,
            isFriends:false,
            direction:'send',
        }];
    }
    // Check that new friends have friends table//
    if(user.friends){
        newDataForFriends = {
            id:  actuallyUser.id,
            read: false,
            isFriends: false,
            direction: 'get',
        }
        user.friends.push(newDataForFriends);
        newDataForFriends = user.friends;
    }

    else {
        newDataForFriends = [{
            id: actuallyUser.id,
            read: false,
            isFriends: false,
            direction: 'get',
        }]
    }
    let refAddSendFriend = database.ref('users').child(actuallyUser.id).child('friends');
    let refAddGetFriend = database.ref('users').child(user.id).child('friends');
    refAddSendFriend.set(newData);
    refAddGetFriend.set(newDataForFriends);
}

// Delete Invite friends //
export function deleteInviteFriends(user) {
    let newData = [];
    let newDataForFriends = [];
    for(let i = 0; i<actuallyUser.friends.length; i++) {
        if(actuallyUser.friends[i].id !== user.id) {
            newData.push(actuallyUser.friends[i])
        }
    }
    for (let i = 0; i< user.friends.length; i++) {
        if(user.friends[i].id !== actuallyUser.id) {
            newDataForFriends.push(user.friends[i])
        }
    }
    let refDeleteSendFriend = database.ref('users').child(actuallyUser.id).child('friends');
    let refDeleteGetFriend = database.ref('users').child(user.id).child('friends');
    refDeleteSendFriend.set(newData);
    refDeleteGetFriend.set(newDataForFriends);
}

// Accepted invite to friends //

export function acceptedInviteFriends(user){
    let indexUser;
    let indexFriend;
    for (let i = 0; i< actuallyUser.friends.length;i++){
        if(actuallyUser.friends[i].id === user.id){
            indexUser = i;
            break;
        }
    }
    for(let i = 0; i< user.friends.length; i++){
        if(user.friends[i].id === actuallyUser.id){
            indexFriend = i;
            break;
        }
    }
    let refAcceptedUserInvite = database.ref('users').child(actuallyUser.id).child('friends').child(indexUser).child('isFriends');
    let refAcceptedFriendInvite = database.ref('users').child(user.id).child('friends').child(indexFriend).child('isFriends');
    refAcceptedUserInvite.set(true);
    refAcceptedFriendInvite.set(true);

}

// Download reference to image src and import image //

export function sendReferencePicture(file){
    fileName = file;
}

// Donwload reference and id users //


function downloadId() {
   for(let i = 0; i < keys.length; i++) {
        if(actuallyUser.nameUser === scores[keys[i]].nameUser){
            actuallyUser.id = keys[i];
           referenceUser = i;
        }
    }
    database.ref('users').child(actuallyUser.id).set(actuallyUser);
}


// Section Register new user //
export function addUser(value, hideRegisterLogin, setStatusUser) {
    referenceUser = -1;
    setData(value);
    if(fileName) {
        storageRef = firebase.storage().ref(actuallyUser.nameUser);
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
        actuallyUser.pictureUrl="https://firebasestorage.googleapis.com/v0/b/chess-base-aa6a9.appspot.com/o/empty-logo-user.png?alt=media&token=d1e9b113-271f-4ec1-a2eb-8cd7a0f8bae9";
        ref.push(actuallyUser);
        setStatusUser(); 
    }
}

function setData(value){
    actuallyUser = {
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
    var starsRef = pathReference.child(actuallyUser.nameUser);
    
    starsRef.getDownloadURL().then(function(url) {
        actuallyUser.pictureUrl = url;
        register = true;
        ref.push(actuallyUser); 
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


*/