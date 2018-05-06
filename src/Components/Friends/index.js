import './index.css';
import React, { Component } from 'react';
import {data, allUsers, addInviteFriends} from '../../Firebase/index.js';
export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayFriends: 'none',
            opacityFriendsBackground: 0,
            opacityFriendsTable: 0,
            styleYourFriends: {},
            styleSearchFriends: {},
            friendsSearch: false,
            filterSearch: 10,
            nextTop: 400,
            styleFriendsUsersListFilter: 'blur(0px)',
            styleFriendsLoaderDisplay: 'none',
        }
        this.hideFriendsSection = this.hideFriendsSection.bind(this);
        this.showFriendsSection = this.showFriendsSection.bind(this);
        this.showYourFriends = this.showYourFriends.bind(this);
        this.showSearchFriends = this.showSearchFriends.bind(this);
        this.showMoreUsers = this.showMoreUsers.bind(this);
    }

    componentDidMount() {
        this.showYourFriends();     
    }

    componentWillReceiveProps() {
        setTimeout(()=> {
            if(this.props.vissibleFriends) {
                this.showFriendsSection();
                this.setState({
                    filterSearch: 10,
                    nextTop: 400,
                })
            }
        },1);
    }

    showMoreUsers(e) {
        if(e.target.scrollTop > this.state.nextTop) {
            this.setState({
                styleFriendsUsersListFilter: 'blur(1px)',
                styleFriendsLoaderDisplay: 'block',
            })
            setTimeout(()=>{
                this.setState({styleFriendsUsersListFilter: 'blur(0px)'})
                this.setState({
                    filterSearch: this.filterSearch + 10,
                    nextTop: this.state.nextTop + 400,
                });
                this.setState({styleFriendsLoaderDisplay: 'none'});
            },1000)
        }
    }
    
    showFriendsSection() {
        this.setState({displayFriends: 'block'})
        setTimeout(()=> {
            this.setState({opacityFriendsBackground: 0.9})
            setTimeout(() =>{
                this.setState({opacityFriendsTable: 1 })
            },500)
        },1000);
    }

    hideFriendsSection() {
        this.props.hideFriendsSection();
        this.setState({opacityFriendsTable: 0})
        setTimeout(() => {
            this.setState({opacityFriendsBackground: 0})
            setTimeout(() => {
                this.setState({displayFriends: 'none'})
            },500);
        },500);
        checkStatusSearchFriends = false;
    }

    showYourFriends() {
        this.setState({
            friendsSearch: false,
            styleYourFriends: {
                borderTopLeftRadius: '15px',
                borderTop: '2px solid #e6e6e6',
                borderLeft: '2px solid #e6e6e6',
                borderTopRightRadius:'15px',
                fontWeight: 600,
                borderBottom: 'unset',
                borderBottomRightRadius: 'unset',

            },
            styleSearchFriends: {
                borderBottom: '2px solid #e6e6e6',
                borderBottomLeftRadius: '15px',
                fontWeight: 100,
                borderTop: 'unset',
                borderTopLeftRadius: 'unset',
                borderBottomRightRadius: 'unset',
                borderRight: 'unset',
            }
        })
        checkStatusSearchFriends = false;
    }
    showSearchFriends() {
        this.setState({
            friendsSearch: true,
            styleYourFriends: {
                borderTopLeftRadius: 'unset',
                borderTop: 'unset',
                borderLeft: 'unset',
                borderTopRightRadius:'unset',
                fontWeight: 100,
                borderBottom: '2px solid #e6e6e6',
                borderBottomRightRadius: '15px',
            },
            styleSearchFriends: {
                borderBottom: 'unset',
                borderBottomLeftRadius: 'unset',
                fontWeight: 600,
                borderTop:'2px solid #e6e6e6',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                borderRight: '2px solid #e6e6e6',
            }
        })
        checkStatusSearchFriends = true;
    }

    render() {
        const styleFriends = {display: this.state.displayFriends};
        const styleFriendsBackground = {opacity: this.state.opacityFriendsBackground};
        const styleFriendsTable = {opacity: this.state.opacityFriendsTable};
        const styleFriendsUsersList = {filter: this.state.styleFriendsUsersListFilter};
        const styleFriendsLoader = {display: this.state.styleFriendsLoaderDisplay};
        return(
            <div className="friends" style={styleFriends}>
               <div className="friends-background" style={styleFriendsBackground} onClick={this.hideFriendsSection}></div>
               <div className="friends-table" style={styleFriendsTable}>
                    <div className="friends-title">ZNAJOMI</div>
                    <div className="friends-users-profile-table">
                        <div className="friends-image-users-section">
                            <img className="friends-image-users img-responsive img-circle" 
                                 src={data ? 
                                 data.pictureUrl
                                 : null} 
                                 alt="users"/>
                        </div>
                        <div className="friends-name-users">
                            <p className="friends-name-users-text">
                                {data ? 
                                    data.name + ' '+ data.surname 
                                    : null}
                            </p>
                        </div>
                        <div className="friends-list-users">
                            <p className="friends-list-users-text">Znajomi: 
                                <span className="badge friends-number">
                                {data && data.friends ? 
                                    data.friends.length - 1 
                                    : null}
                                </span>
                            </p>
                        </div>
                        <div className="friends-ranking-users">
                            <p className="friends-ranking-users-text">Ranking: 
                                <span className="badge friends-ranking">
                                {data ? 
                                    data.ranking 
                                    : null}
                                </span>
                            </p>
                        </div>
                    </div> 
                    <div className="friends-users">
                          <div className="friends-users-your-friends" 
                               style={this.state.styleYourFriends} 
                               onClick={this.showYourFriends}>
                               Twoi znajomi</div>
                          <div className="friends-users-search-friends" 
                               style={this.state.styleSearchFriends}
                               onClick={this.showSearchFriends}>
                               Szukaj znajomych</div>
                          <div className="friends-users-table">
                            <input placeholder="Imię" className="friends-search-username"/>
                            <button className="friends-search-advanced">Wyszukiwanie zaawansowane</button>
                            <div className="friends-window-users" onScroll={this.showMoreUsers}>
                                <div className="friends-loader" style={styleFriendsLoader}></div>
                                {this.state.friendsSearch ? 
                                    this.props.vissibleFriends ? 
                                        allUsers.map((user, index) => {
                                            let textButton;
                                            if(index >= this.state.filterSearch) {
                                                return null;
                                            }
                                            textButton = checkFriends(user);
                                            return user.nameUser !== data.nameUser ? 
                                                <div key={index} className="friends-users-list" style={styleFriendsUsersList}>
                                                    <img className="friends-users-list-image img-circle" src={user.pictureUrl} alt={"image-users-" + index}/>
                                                    <div className="friends-users-list-informations">
                                                        <p className="friends-users-list-information-1">{user.name + ' ' + user.surname}</p>
                                                        <p className="friends-users-list-information-2">Ranking: {user.ranking}</p>
                                                        <button onClick={()=>{sendInviteToFriends(index)}} className="friends-button-add-friends btn btn-default">
                                                           {textButton}</button>
                                                    </div>
                                                </div>
                                            : null}) 
                                        :null
                                :null}
                            </div>
                          </div>          
                    </div>
                    <div className="friends-exit-section" onClick={this.hideFriendsSection}>
                        <span className="friends-exit">WYJŚCIE</span>
                        <span className="friends-exit-icon glyphicon glyphicon-remove"></span>
                    </div>
               </div>
            </div>
        )
    }
}

function checkFriends(user) {
    if(data.friends){
        for(let i =0;i<data.friends.length;i++) {
            if(user.id === data.friends[i]){
                return 'Usuń ze znajomych';
            }
        }
    }
    if(data.invitesFriends){
        for(let i =0;i<data.invitesFriends.length;i++) {
            if(user.id === data.invitesFriends[i]){
                return 'Usuń zaproszenie';
            }
        }
    }
    return 'Wyślij zaproszenie';
}

var checkStatusSearchFriends = false;

export function uploadStatus() {
    if(checkStatusSearchFriends) {
        let selectorName= document.getElementsByClassName('friends-users-list-information-1');
        let selectorRanking= document.getElementsByClassName('friends-users-list-information-2');
        let selectorStatusFriends= document.getElementsByClassName('friends-button-add-friends');
        for(let i = 0;i < allUsers.length;i++) {
            if(i === allUsers.length - 1) {
                break;
            }
            checkYourFriends(selectorStatusFriends, i);
            checkNameAndSurname(selectorName, i);
            checkRanking(selectorRanking,i);
        }
    }
}

function checkYourFriends(selector, i) {
    let change = true;
    if(data.friends) {
        for(let j = 0; j < data.friends.length;j++){
            if(data.friends[j] === allUsers[i].id){
                if(selector[i].innerText !== 'Usuń ze znajomych') {
                    selector[i].innerText = 'Usuń ze znajomych';
                    return;
                }
                change = false;
            }
        }
    }
    if(data.invitesFriends) {
        for(let j = 0; j < data.invitesFriends.length;j++){
            if(data.invitesFriends[j] === allUsers[i].id){
                if(selector[i].innerText !== 'Usuń zaproszenie') {
                    selector[i].innerText = 'Usuń zaproszenie';
                    return;
                }
                change = false;
            }
        }
    }
    if(change){
        if(selector[i].innerText !== 'Wyślij zaproszenie') {
            selector[i].innerText = 'Wyślij zaproszenie';
        } 
    } 
}

function checkNameAndSurname(selectorName, i) {
    if(selectorName[i].innerText !== (allUsers[i].name + ' ' + allUsers[i].surname)) {
        selectorName[i].innerText = allUsers[i].name + ' ' + allUsers[i].surname;
    }
}

function checkRanking(selectorRanking, i){
    if(selectorRanking[i].innerText !== ('Ranking: ' + allUsers[i].ranking)){
        selectorRanking[i].innerText = 'Ranking: ' + allUsers[i].ranking
    }
}

function sendInviteToFriends(index) {
    if(data.invitesFriends){
       for(let i = 0; i < data.invitesFriends.length; i++) {
           if(data.invitesFriends[i] === allUsers[index].id){
               return;
           }
       } 
    }
    addInviteFriends(allUsers[index].id);
}