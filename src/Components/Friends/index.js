import './index.css';
import React, { Component } from 'react';
import {actuallyUser, allUsers, addInviteFriends, deleteInviteFriends, acceptedInviteFriends} from '../../Firebase/index.js';

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
            nameSearch: false,
            usersFilter: -1,
            advancedSearch: false,
            advancedSearchShow: false,
            name: '',
            surname: '',
            country: '',
            region: '',
            ranking: 0,
        }
        
        this.hideFriendsSection = this.hideFriendsSection.bind(this);
        this.showFriendsSection = this.showFriendsSection.bind(this);
        this.showYourFriends = this.showYourFriends.bind(this);
        this.showSearchFriends = this.showSearchFriends.bind(this);
        this.showMoreUsers = this.showMoreUsers.bind(this);
        this.showSuggestionSearch = this.showSuggestionSearch.bind(this);
        this.searchAdvancedUsers = this.searchAdvancedUsers.bind(this);
        this.getAdvancedSearch = this.getAdvancedSearch.bind(this);
    }

    componentDidMount() {
        this.showYourFriends();
        sendReferenceClass(this);     
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
        this.setState({
            opacityFriendsTable: 0,
            advancedSearch: false,
        })
        setTimeout(() => {
            this.setState({opacityFriendsBackground: 0})
            setTimeout(() => {
                this.setState({displayFriends: 'none'})
                this.showYourFriends();
            },500);
        },500);
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
            },
            actuallyStateWindow: 'yourFriend',
        })
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
            },
            actuallyStateWindow: 'allUsers',
        })
    }

    showSuggestionSearch(e){
        const text = e.currentTarget.value;
        if(text !== ''){
            this.setState({
                nameSearch: true, 
                filterSearch: 10,
                nextTop: 400, 
                usersFilter: this.getFilteredSuggestions(text)                   
            })
        }
        else {
            this.setState({
                nameSearch: false,
                filterSearch: 10,
                nextTop: 400,
                usersFilter: null,
            });
            
            return;
        }
        classFriends.render();
        
    }

    getFilteredSuggestions(text) {
        return allUsers.filter(suggestion => 
            suggestion.name.toLowerCase().includes(text.toLowerCase()))
      }
    
    searchAdvancedUsers() {
        this.setState({advancedSearch: !this.state.advancedSearch});
        if(this.state.advancedSearchShow) {
            this.setState({advancedSearchShow: false});
        }
        this.setState({
            name: '',
            surname: '',
            country: '',
            region: '',
            ranking: 0,
        })
    }

    getAdvancedSearch() {
        this.setState({advancedSearchShow: true});
    }
      
    setNumberOfFriends() {
        let numberFriends = 0;  
        for(let i = 0; i<actuallyUser.friends.length;i++){
            if(actuallyUser.friends[i].isFriends){
                numberFriends++;
            }
          }
          return numberFriends;
    }

    setDisplay(user){
        if(actuallyUser.friends){
            for(let i = 0; i<actuallyUser.friends.length;i++){
                if(actuallyUser.friends[i].id === user.id){
                    if(actuallyUser.friends[i].direction === "get" && !actuallyUser.friends[i].isFriends){
                        return "block"
                    }
                }
            }
                return "none";
        }
            return "none"; 
    }

    setColor(user){
        if(actuallyUser.friends){
            for(let i =0;i<actuallyUser.friends.length;i++) {
                if(user.id === actuallyUser.friends[i].id){
                    
                    if(actuallyUser.friends[i].isFriends){
                        return "red";
                    }
                    else if(actuallyUser.friends[i].direction === "send") {
                        return "orange";
                    }
                    else {
                        return "green";
                    }  
                }
            }
        }
        return "#3498db";
    }

    checkFriends(user, i) {
        if(actuallyUser.friends){
            for(let i =0;i<actuallyUser.friends.length;i++) {
                if(user.id === actuallyUser.friends[i].id){
                    if(actuallyUser.friends[i].isFriends){
                        return "Usuń ze znajomych";
                    }
                    else if(actuallyUser.friends[i].direction === "send") {
                        return "Usuń zaproszenie"
                    }
        
                    else { 
                        return "Akceptuj zaproszenie";
                    }
                }
            }
        }
        return "Wyślij zaproszenie";
    }

    sendInviteToFriends(user) {
        if(user && user.id !== actuallyUser.id){
            if(actuallyUser.friends){
                for(let i = 0; i < actuallyUser.friends.length; i++) {
                    if(actuallyUser.friends[i].id === user.id){
                     
                     if(actuallyUser.friends[i].direction === "get" && actuallyUser.friends[i].isFriends === false) {
                         acceptedInviteFriends(user);
                     }
                     else {
                        deleteInviteFriends(user);
                     }
                     return;
                    }
                } 
             }
             addInviteFriends(user);
        }
    }

    deleteInviteAfterGetInvite(user){
        deleteInviteFriends(user);
    }

    filteredListUsers(user, index, ){
        if(this.state.advancedSearchShow) {
           if(this.state.name !== '') {
               if(this.state.name.toLowerCase() !== user.name.toLowerCase()){
                   return null;
               }
           }
           if(this.state.surname !== ''){
                if(this.state.surname.toLowerCase() !== user.surname.toLowerCase()){
                    return null;
                }
           }
           if(this.state.country !== ''){
                if(this.state.country.toLowerCase() !== user.country.toLowerCase()){
                    return null;
                }
            }
            if(this.state.region !== ''){
                if(this.state.region.toLowerCase() !== user.region.toLowerCase()){
                    return null;
                }
           }
           if(this.state.ranking !== 0){
                // eslint-disable-next-line    
                if(parseInt(this.state.ranking) !== user.ranking){
                    return null;
                }
            }
        }

        if(!this.state.friendsSearch) {
            let isFriend = false;
            if(actuallyUser.friends) {
                for(let i = 0; i < actuallyUser.friends.length;i++) {
                    if(actuallyUser.friends[i].id === user.id) {
                        isFriend = true;
                        break;
                    }
                }
                
            }
            if(!isFriend) {
                return null;
            }
        }

        else {
            if(actuallyUser.friends) {
                for(let i = 0; i < actuallyUser.friends.length;i++) {
                    if(actuallyUser.friends[i].id === user.id) {
                        return null;
                    }
                }
            }
        }

        const styleFriendsUsersList = {filter: this.state.styleFriendsUsersListFilter};
        if(index >= this.state.filterSearch) {
            return null;
        }
        let textButton = this.checkFriends(user);
        let style ={backgroundColor: this.setColor(user)};
        let styleDelete = {display : this.setDisplay(user)}
        return user.nameUser !== actuallyUser.nameUser ? 
            <div key={index} className="friends-users-list" style={styleFriendsUsersList}>
                <img className="friends-users-list-image img-circle" src={user.pictureUrl} alt={"image-users-" + index}/>
                <div className="friends-users-list-informations">
                    <p className="friends-users-list-information-1">{user.name + ' ' + user.surname}</p>
                    <p className="friends-users-list-information-2">Ranking: {user.ranking}</p>
                    <button style={style} onClick={()=>{this.sendInviteToFriends(user)}} className="friends-button-add-friends">
                       {textButton}</button>
                    <button style={styleDelete} className="friends-button-delete-invite" onClick={()=>{this.deleteInviteAfterGetInvite(user)}}>Odrzuć Zaproszenie</button>
                </div>
            </div>
    : null
    }

    render() {
        const styleFriends = {display: this.state.displayFriends};
        const styleFriendsBackground = {opacity: this.state.opacityFriendsBackground};
        const styleFriendsTable = {opacity: this.state.opacityFriendsTable};
        const styleFriendsLoader = {display: this.state.styleFriendsLoaderDisplay};
        return(
            <div className="friends" style={styleFriends}>
               <div className="friends-background" style={styleFriendsBackground} onClick={this.hideFriendsSection}></div>
               <div className="friends-table" style={styleFriendsTable}>
                    <div className="friends-title">ZNAJOMI</div>
                    <div className="friends-users-profile-table">
                        <div className="friends-image-users-section">
                            <img className="friends-image-users img-responsive img-circle" 
                                 src={actuallyUser ? 
                                    actuallyUser.pictureUrl
                                 : null} 
                                 alt="users"/>
                        </div>
                        <div className="friends-name-users">
                            <p className="friends-name-users-text">
                                {actuallyUser ? 
                                    actuallyUser.name + ' '+ actuallyUser.surname 
                                    : null}
                            </p>
                        </div>
                        <div className="friends-list-users">
                            <p className="friends-list-users-text">Znajomi: 
                                <span className="badge friends-number">
                                {actuallyUser && actuallyUser.friends ? 
                                    this.setNumberOfFriends() 
                                    : 0}
                                </span>
                            </p>
                        </div>
                        <div className="friends-ranking-users">
                            <p className="friends-ranking-users-text">Ranking: 
                                <span className="badge friends-ranking">
                                {actuallyUser ? 
                                    actuallyUser.ranking 
                                    : 0}
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
                            {this.state.advancedSearch ? 
                                null
                                :<input placeholder="Imię" className="friends-search-username" onInput={this.showSuggestionSearch}/>}
                            {this.state.advancedSearch?
                                <button className="friends-search-advanced-exit" onClick={this.searchAdvancedUsers}>Zakończ <span className="glyphicon glyphicon-remove"/></button>
                                :<button className="friends-search-advanced" onClick={this.searchAdvancedUsers}>Wyszukiwanie zaawansowane</button>}
                           
                            <div className="friends-window-users" onScroll={this.showMoreUsers}>
                                {this.state.advancedSearch ? 
                                        this.state.advancedSearchShow ?
                                            allUsers.map((user, index)=> {
                                                return this.filteredListUsers(user,index);
                                            })
                                            :<div className="friends-advanced-search-validation">
                                                <div className="friends-advanced-search-title">WYSZUKIWANIE ZAAWANSOWANE</div>
                                                <div className="friends-advanced-search-name">Imię: <input placeholder="Imię"
                                                    value={this.state.name} 
                                                    onInput={(e)=>{this.setState({name: e.target.value})}}/></div>
                                                <div className="friends-advanced-search-surname">Nazwisko: <input placeholder="Nazwisko"
                                                    value={this.state.surname} 
                                                    onInput={(e)=>{this.setState({surname: e.target.value})}}/></div>
                                                <div className="friends-advanced-search-country">Kraj: <input placeholder="Kraj"
                                                    value={this.state.country} 
                                                    onInput={(e)=>{this.setState({country: e.target.value})}}/></div>
                                                <div className="friends-advanced-search-region">Region: <input placeholder="Region"
                                                    value={this.state.region} 
                                                    onInput={(e)=>{this.setState({region: e.target.value})}}/></div>
                                                <div className="friends-advanced-search-ranking">Ranking: <input placeholder="Ranking"
                                                    value={this.state.ranking} 
                                                    onInput={(e)=>{this.setState({ranking: e.target.value})}}
                                                    type="number"/></div>
                                                <button className="friends-advanced-button btn btn-success" onClick={this.getAdvancedSearch}>Szukaj</button>
                                            </div> 
                                :this.props.vissibleFriends ? 
                                    this.state.friendsSearch ?
                                        this.state.nameSearch ?
                                           this.state.usersFilter.map((user, index)=>{
                                                return this.filteredListUsers(user,index);
                                        })
                                        :allUsers.map((user, index) => {
                                            return this.filteredListUsers(user,index);
                                          }) 
                                    :this.state.nameSearch ?
                                           this.state.usersFilter.map((user, index)=>{
                                                return this.filteredListUsers(user,index);
                                        })
                                        :allUsers.map((user, index) => {
                                            return this.filteredListUsers(user,index);
                                    })
                                :null} 
                                <div className="friends-loader" style={styleFriendsLoader}></div>
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

export var classFriends;

function sendReferenceClass(friendClass){
    classFriends = friendClass;
}