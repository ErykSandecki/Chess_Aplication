import React, { Component } from 'react';

import './style.css';

import FadeIn from 'react-fade-in';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSearch: 'local',
            renderNumberUser: 5,
            nextFilter: false,
            nameForFilter: '',
            surnameForFilter: '',
            countryForFilter: '',
            rankingForFilter: '',
        }

        this.actuallyNumberRenderUser = -1;

        this.exitSearch = this.exitSearch.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.checkScrollUsers = this.checkScrollUsers.bind(this);
        this.sendInvite = this.sendInvite.bind(this);
        this.checkThatIsFriend = this.checkThatIsFriend.bind(this);
    }

    changeSelectSearch = (value) => {this.setState({selectSearch: value});}

    exitSearch() {
        this.props.setVisibleFriends();
    }

    checkScrollUsers(e) {
        if((e.target.scrollTop) >= (e.target.scrollHeight - e.target.clientHeight)) {
            if(this.state.renderNumberUser < this.props.usersData.length) {
                this.setState({renderNumberUser: this.state.renderNumberUser + 5});
                this.setState({nextFilter: true});
                setTimeout(() => {
                    this.setState({nextFilter: false});
                },500);
            } 
        }
    }

    showSuggestionSearchForName = (e) => {
        let nameForFilter = e.target.value;
        if(nameForFilter !== '') {
            this.setState({
                nameForFilter: nameForFilter,
                renderNumberUser: this.props.usersData.length,
            })
        }
        else {
            this.setState({
                nameForFilter: '',
                renderNumberUser: 5,
            })
        }
    }

    showSuggestionSearchForSurname = (e) => {
        let surnameForFilter = e.target.value;
        if(surnameForFilter !== '') {
            this.setState({
                surnameForFilter: surnameForFilter,
                renderNumberUser: this.props.usersData.length,
            })
        }
        else {
            this.setState({
                surnameForFilter: '',
                renderNumberUser: 5,
            })
        }
    }

    showSuggestionSearchForCountry = (e) => {
        let countryForFilter = e.target.value;
        if(countryForFilter !== '') {
            this.setState({
                countryForFilter: countryForFilter,
                renderNumberUser: this.props.usersData.length,
            })
        }
        else {
            this.setState({
                countryForFilter: '',
                renderNumberUser: 5,
            })
        }
    }

    showSuggestionSearchForRanking = (e) => {
        let rankingForFilter = e.target.value;
        if(rankingForFilter !== '') {
            this.setState({
                rankingForFilter: rankingForFilter,
                renderNumberUser: this.props.usersData.length,
            })
        }
        else {
            this.setState({
                rankingForFilter: '',
                renderNumberUser: 5,
            })
        }
    }

    checkFilterName = (user) => {
        if(this.state.nameForFilter !== '') {
            if(user.name.toLowerCase().includes(this.state.nameForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterSurname = (user) => {
        if(this.state.surnameForFilter !== '') {
            if(user.surname.toLowerCase().includes(this.state.surnameForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterCountry = (user) => {
        if(this.state.countryForFilter !== '') {
            if(user.country.toLowerCase().includes(this.state.countryForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterRanking = (user) => {
        if(this.state.rankingForFilter !== '') {
            if(user.ranking === +this.state.rankingForFilter) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    renderUsers(user, index) {
        let friend;
        if(this.props.actuallyUser.friends) {
            friend = this.props.actuallyUser.friends.find((friend) =>{
                           if(!user){
                               return false;
                           } 
                           return friend.id === user.id
                        })
        }
        if(user){
            return (
                <div key={index} className="friends-users-list" >
                    <img className="friends-users-list-image" 
                         src={user.pictureUrl}
                         alt={'friends-' + index}
                    />
                    <div className="friends-users-list-informations">
                        <p className="friends-users-list-information-1">
                            {user.name + ' ' + user.surname}
                        </p>
                        <p className="friends-users-list-information-2">
                            {user.ranking}
                        </p>
                    </div>
                    {friend ?
                        friend.direction === 'send' &&
                        !friend.isFriends ?
                            this.buttonDeleteInviteFriends(user,index)
                            :!friend.isFriends ?
                                this.buttonAcceptedAndDeleteInvite(user,index)
                                :this.buttonDeleteFriends(user,index)
                       :this.buttonAddInvite(user,index)}
                </div>
                   )
        }
        else {
            return null;
        }   
        
    }

    buttonAddInvite(user, index) {
        return <button className="friends-button-add-friends"
                    onClick={() => {this.sendInvite(user,index)}}
                    >
                    Dodaj znajomego
                    <span className="glyphicon glyphicon-user"/>
        </button>
    }

    buttonDeleteInviteFriends(user,index) {
        return <button className="friends-button-delete-invite-for-friends"
                       onClick={()=>{this.deleteUserOrInvite(user,index)}}
                >
                    Usuń zaproszenie 
                    <span className="friends-remove-invite glyphicon glyphicon-remove"/>
                </button>
    }

    buttonAcceptedAndDeleteInvite(user, index) {
        return  <React.Fragment>
                    <button className="friends-button-accepted-invite"
                        onClick={() => {this.acceptedInvite(user,index)}}
                    >
                        Akceptuj zaproszenie +
                    </button>
                    <button className="friends-button-delete-invite"
                        onClick={() => {this.deleteUserOrInvite(user,index)}}
                    >
                        Usuń zaproszenie -
                    </button>
                </React.Fragment>
    }

    buttonDeleteFriends(user, index) {
        return <button className="friends-button-delete-friends"
                       onClick={() => {this.deleteUserOrInvite(user,index)}}
                >
                    Usuń ze znajomych 
                    <span className="friends-remove-invite glyphicon glyphicon-remove"/>
                </button>
    }

    sendInvite(user,index) {
        let actuallyUser = this.props.actuallyUser;
        if(!user.friends) {
            user.friends = [];
        }
        if(!actuallyUser.friends) {
            actuallyUser.friends = [];
        }
        user.friends.push(this.createFriend(actuallyUser, 'get'));
        actuallyUser.friends.push(this.createFriend(user, 'send'));
        this.changeDataBase(actuallyUser, user);
    }

    createFriend(user, direction) {
        let newDataForFriends = {
             id:  user.id,
             read: false,
             showNotifications: false,
             isFriends: false,
             direction: direction,
             message: [{
                 userPicture: user.pictureUrl,
                 userId: user.id,
                 contain: 'Jesteście znajomymi!',
             }],
             resizeArea: [0,0,0,0],
         }
         return newDataForFriends;
     }

     deleteUserOrInvite(user, index) {
        let actuallyUser = this.props.actuallyUser;
        let actuallyUserIndex = actuallyUser.friends.findIndex((friend) => {
            return friend.id === user.id
        });
        let userIndex = user.friends.findIndex((friend) => {
            return friend.id === actuallyUser.id
        });
        actuallyUser.friends.splice(actuallyUserIndex, 1);
        user.friends.splice(userIndex, 1);
        this.changeDataBase(actuallyUser, user);
    }

    acceptedInvite(user,index) {
        let actuallyUser = this.props.actuallyUser;
        let actuallyUserIndex = actuallyUser.friends.findIndex((friends) => {
         return friends.id === user.id   
        })
        let userIndex = user.friends.findIndex((friend) => {
            return friend.id === actuallyUser.id
        });
        actuallyUser.friends[actuallyUserIndex].isFriends = true;
        user.friends[userIndex].isFriends = true;
        this.changeDataBase(actuallyUser, user);
    }
    
    changeDataBase(actuallyUser, user) {
        let refYourUser = this.props.databaseUsers.child(actuallyUser.id).child('friends');
        let refFriend = this.props.databaseUsers.child(user.id).child('friends');
        refYourUser.set(actuallyUser.friends);
        refFriend.set(user.friends);
    }

    checkThatIsFriend(user, checkNumberFilter) {
        let actuallyUser = this.props.actuallyUser;
        if(actuallyUser.friends) {
            if(actuallyUser.friends.find((friend) => {
                return friend.id === user.id
            })) {
                if(checkNumberFilter) {
                    return true;
                }
                return false;
            }
            if(checkNumberFilter) {
                return false;
            }
            return true;
        }
       
        if(checkNumberFilter) {
            return false;
        }
        return true;
    }

    checkAllFilter(user) {
        if(this.checkFilterName(user) &&
           this.checkFilterSurname(user) &&
           this.checkFilterCountry(user) &&
           this.checkFilterRanking(user)) {
               return true;
           }
        return false;   
    }

    render() {
        this.actuallyNumberRenderUser = -1;
        return(
            this.props.actuallyUser.nameUser !== 'admin' &&
            this.props.statusLogin ?
            <FadeIn>
                <div className="friends">
                    <div className="friends-background"
                         onClick={this.exitSearch}
                    >     
                    </div>
                    <div className="friends-table" >
                        <div className="friends-title">
                            <p className="friends-title-text">
                                ZNAJOMI
                            </p>
                            <div className="friends-advanced-search">
                                <div className="friends-advanced-search-title">
                                    SZUKAJ
                                </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                            placeholder="IMIE"
                                            onInput={this.showSuggestionSearchForName}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="NAZWISKO"
                                               onInput={this.showSuggestionSearchForSurname}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="KRAJ"
                                               onInput={this.showSuggestionSearchForCountry}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="RANKING"
                                               onInput={this.showSuggestionSearchForRanking}
                                        />
                                    </div>
                                </div>
                                <div className="friends-users">
                                    <div className="friends-users-your-friends"
                                        onClick={() => {this.changeSelectSearch('local')}}
                                        style={this.state.selectSearch === 'local'?
                                                    {height: '24px',
                                                     filter: 'brightness(100%)',
                                                    }
                                                    :null
                                              }     
                                    >
                                        Twoi znajomi
                                    </div>
                                    <div className="friends-users-search-friends"
                                        onClick={() => {this.changeSelectSearch('global')}}
                                        style={this.state.selectSearch === 'global'?
                                                    {height: '24px',
                                                     filter: 'brightness(100%)',
                                                    }
                                                    :null
                                              }
                                    >
                                        Szukaj znajomych
                                    </div>
                                    <div className="friends-users-table">
                                        <div className="friends-window-users"
                                             onScroll={this.state.selectSearch === 'global' ?
                                                        this.checkScrollUsers
                                                        :null}
                                        >
                                              {this.state.selectSearch === 'global'?
                                                this.props.usersData.filter((user) => {
                                                    if(user.nameUser !== this.props.actuallyUser.nameUser && !this.checkThatIsFriend(user, true)) {this.actuallyNumberRenderUser++};
                                                     return user.nameUser !== this.props.actuallyUser.nameUser && 
                                                            this.actuallyNumberRenderUser < this.state.renderNumberUser &&
                                                            this.checkAllFilter(user)&&
                                                            this.checkThatIsFriend(user, false)}).map((user, index) => {
                                                                    return this.renderUsers(user, index);
                                                                }) 
                                              :this.props.actuallyUser.friends ?
                                                <React.Fragment>
                                                    {this.props.actuallyUser.friends.find((friend) => {
                                                       return friend.direction === 'send' && !friend.isFriends
                                                    })?
                                                        <React.Fragment>
                                                            <div className="friends-window-send-invite">Wysłane zaproszenia</div>
                                                            {this.props.actuallyUser.friends.filter((friend) => {
                                                                return friend.direction === 'send' && 
                                                                       !friend.isFriends &&
                                                                        this.checkAllFilter(this.props.usersData.find((user) =>{
                                                                            return user.id === friend.id
                                                                        }))
                                                            }).map((friend, index)=>{
                                                                   return this.renderUsers(this.props.usersData.find((user) =>{
                                                                       return user.id === friend.id
                                                                   }), index);
                                                                })}
                                                            </React.Fragment>
                                                            :null}
                                                        {this.props.actuallyUser.friends.find((friend) => {
                                                            return friend.direction === 'get' && !friend.isFriends
                                                        })?
                                                            <React.Fragment>
                                                                <div className="friends-window-get-invite">
                                                                    Odebrane Zaproszenia
                                                                </div>
                                                                {this.props.actuallyUser.friends.filter((friend) => {
                                                                    return friend.direction === 'get' && 
                                                                           !friend.isFriends  &&
                                                                           this.checkAllFilter(this.props.usersData.find((user) => {
                                                                                return user.id === friend.id
                                                                            }))
                                                                    }).map((friend, index) => {
                                                                        return this.renderUsers(this.props.usersData.find((user) => {
                                                                            return user.id === friend.id
                                                                        }), index);
                                                                })}
                                                            </React.Fragment>
                                                            :null}
                                                        {this.props.actuallyUser.friends.find((friend) => {
                                                            return friend.isFriends
                                                        })?
                                                            <React.Fragment>
                                                                <div className="friends-window-your-friend">
                                                                    Znajomi
                                                                </div>
                                                                {this.props.actuallyUser.friends.filter((friend) => {
                                                                    return friend.isFriends &&
                                                                           this.checkAllFilter(this.props.usersData.find((user) => {
                                                                                return user.id === friend.id
                                                                            }))
                                                                    }).map((friend, index) => {
                                                                        return this.renderUsers(this.props.usersData.find((user) => {
                                                                            return user.id === friend.id
                                                                        }), index);
                                                                })}
                                                            </React.Fragment>
                                                            :null}        
                                                </React.Fragment>
                                                :null
                                              }
                                        <div className="friends-window-users-blur"
                                             style={this.state.nextFilter ?
                                                     {display: 'block'}
                                                    :{display: 'none'}
                                                   }
                                        >
                                        </div>      
                                        </div>
                                        <div className="friends-loader"
                                             style={this.state.nextFilter ?
                                                    {display: 'block'}
                                                   :{display: 'none'}
                                                   }
                                        >
                                        </div>
                                </div>          
                            </div>
                        </div>
                        <div className="friends-exit-section">
                            <div className="friends-exit-section-table"
                                 onClick={this.exitSearch}
                            >
                                <span className="friends-exit">WYJŚCIE</span>
                                <span className="friends-exit-icon glyphicon glyphicon-remove"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
            :null
        )
    }
}