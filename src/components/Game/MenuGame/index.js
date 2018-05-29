import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

import knightRight from '../../../Images/chess-knight-right.png';
import knightLeft from '../../../Images/chess-knight-left.png';

import './style.css';

export default class MenuGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleStatusGame: false,
            visibleSendInviteFriends: false,
            visibleInvites: false,
            visibleActuallyGame: false,
            visibleSettings: false,
        }

        this.setColorBackground = null;
        this.refNewInvite = null;
    }

    componentDidUpdate() {
        if(this.props.actuallyGame.gameInvite) {
            let gameUsers = this.props.gameData.filter((userGame) => {
                return this.props.actuallyGame.gameInvite.find((friendGame) => {
                    return userGame.idGame === friendGame.idGame;
                })
            }) 
            gameUsers.forEach((usersGame) => {
                if(usersGame.statusGame === 'offline') {
                    this.deleInviteToUserGame(usersGame);
                }
            })
        }

        if(this.props.actuallyGame.gameInvite && this.props.actuallyGame.inviteToGame) {
            if(!this.setColorBackground){
                this.setColorBackground = setInterval(()=>{
                    if(this.refNewInvite.style.backgroundColor === "black"){
                        this.refNewInvite.style.backgroundColor ="rgba(89,92,92)";
                    }
                    else {
                        this.refNewInvite.style.backgroundColor = "black";
                    } 
                },500);
            }  
        }
        else if(!this.props.actuallyGame.gameInvite) {
            clearInterval(this.setColorBackground);
            if(this.setColorBackground){
                this.setColorBackground = null;
                this.props.databaseGame.child(this.props.actuallyGame.idGame).child('inviteToGame').set(false);
                if(this.state.visibleInvites) {
                    this.refNewInvite.style.backgroundColor = "darkgray"
                }
                else {
                    this.refNewInvite.style.backgroundColor = "rgba(89,92,92)";
                }
            }
        }
    }

    setVisibleStatusGame = (e) => {
        if(this.state.visibleStatusGame) {
            if(e.target.className === "menu-game-option") {
                e.target.childNodes[1].style.transform = "rotate(180deg)";
                setTimeout(() => {
                    this.setState({visibleStatusGame: !this.state.visibleStatusGame})
                },500);
            }
        }
        else {
            this.setState({visibleStatusGame: !this.state.visibleStatusGame})
        }
    };

    setVisibleSendInviteFriends = (e) => {
        if(this.state.visibleSendInviteFriends) {
                if(e.target.className === "menu-game-option") {
                    e.target.childNodes[1].style.transform = "rotate(180deg)";
                    setTimeout(() => {
                        this.setState({visibleSendInviteFriends: !this.state.visibleSendInviteFriends})
                    },500);
                }
        }
        else {
                this.setState({visibleSendInviteFriends: !this.state.visibleSendInviteFriends})
        }
    };

    setVisibleInvites = (e) => {
        if(this.state.visibleInvites) {
            if(e.target.className === "menu-game-option") {
                e.target.childNodes[1].style.transform = "rotate(180deg)";
                setTimeout(() => {
                    this.setState({visibleInvites: !this.state.visibleInvites})
                },500);
            }
        }
        else {
            this.setState({visibleInvites: !this.state.visibleInvites})
        }
    };

    setVisibleActuallyGame = (e) => {
        if(this.state.visibleActuallyGame) {
            if(e.target.className === "menu-game-option") {
                e.target.childNodes[1].style.transform = "rotate(180deg)";
                setTimeout(() => {
                    this.setState({visibleActuallyGame: !this.state.visibleActuallyGame})
                },500);
                }
        }
        else {
            this.setState({visibleActuallyGame: !this.state.visibleActuallyGame})
        }
    };

    setVisibleSettings = (e) => {
        if(this.state.visibleSettings) {
            if(e.target.className === "menu-game-option") {
                e.target.childNodes[1].style.transform = "rotate(180deg)";
                setTimeout(() => {
                    this.setState({visibleSettings: !this.state.visibleSettings})
                },500);
            }   
        }
        else {
                this.setState({visibleSettings: !this.state.visibleSettings})
            }
    };

    listFriends(user, index, arr) {
        let userData = this.props.usersData.find((userSearch)=>{
            return userSearch.id === user.id;
        })
        let actuallyUserGame = this.props.gameData.find((userSearch)=>{
            return userSearch.id === this.props.actuallyUser.id;
        })
       
            if(actuallyUserGame.gameInvite) {
                if(actuallyUserGame.gameInvite.find((actuallyUser)=>{
                    return actuallyUser.idGame === user.idGame && actuallyUser.direction === 'get'})) {
                        return null;
                    }
                else {
                    return this.renderListFriend(user, index, arr, userData, actuallyUserGame);
                }    
            }
            else {
                return this.renderListFriend(user, index, arr, userData, actuallyUserGame);
            } 
       
    }

    renderListFriend(user, index, arr, userData, actuallyUserGame) {
        return <div className="menu-game-friend"
                    key={index} 
                >
                    <p className="menu-game-friend-border"
                       style={(index + 1) === arr.length ?
                                {height: '26px'}
                                :{height: '50px'}
                             }   
                    >
                    </p>  
                    <p className="menu-game-friend-dotted">- -</p>  
                    <img className="menu-game-friend-image" 
                         src={userData.pictureUrl}
                        alt={"friendGame" + index}
                    />
                    <p className="menu-game-friend-name">{user.name + ' ' + user.surname}</p>
                    {actuallyUserGame.gameInvite ?
                        actuallyUserGame.gameInvite.find((actuallyUser)=>{
                            return actuallyUser.idGame === user.idGame
                        }) ?
                            <div className="menu-game-friend-delete-invite"
                                 onClick={()=>{this.deleInviteToUserGame(user)}}
                            >
                                -
                            </div>
                            :<div className="menu-game-friend-send-invite"
                                  onClick={()=>{this.sendInviteToUserGame(user)}}
                            >
                                +
                            </div>
                        :<div className="menu-game-friend-send-invite"
                              onClick={()=>{this.sendInviteToUserGame(user)}}
                        >
                            +
                        </div> 
                    }
                </div>
    }

    renderListInvite(userGameid, index, arr) {   
        let userGame = this.props.gameData.find((userSearch)=>{
            return userSearch.idGame === userGameid.idGame;
        })
        let user = this.props.usersData.find((userSearch) => {
            return userSearch.id === userGame.id;
        })
        return <div className="menu-game-friend"
                    key={index} 
                >
                    <p className="menu-game-friend-border"
                       style={(index + 1) === arr.length ?
                                {height: '26px'}
                                :{height: '50px'}
                             }   
                    >
                    </p>  
                    <p className="menu-game-friend-dotted">- -</p>  
                    <img className="menu-game-friend-image" 
                         src={user.pictureUrl}
                        alt={"friendGame" + index}
                    />
                    <p className="menu-game-friend-name">{user.name + ' ' + user.surname}</p>
                    <div className="menu-game-friend-accepted-invite"
                         onClick={()=>{this.sendInviteToUserGame(userGame)}}
                    >
                        +
                    </div> 
                    <div className="menu-game-friend-delete-get-invite"
                         onClick={()=>{this.deleInviteToUserGame(userGame)}}
                    >
                        -
                    </div>
                </div>
    }

    sendInviteToUserGame(user) {
        let actuallyUser = this.props.actuallyUser;
        actuallyUser = this.props.gameData.find((userSearch)=>{
                                                        return userSearch.id === actuallyUser.id;
                                                    });                                        
        if(!user.gameInvite) {
            user.gameInvite = [];
        }
        if(!actuallyUser.gameInvite) {
            actuallyUser.gameInvite = [];
        }
        user.gameInvite.push(this.createFriendGame(actuallyUser, 'get'));
        actuallyUser.gameInvite.push(this.createFriendGame(user, 'send'));
        this.changeGameBase(actuallyUser, user);
    }

    deleInviteToUserGame(user) {
        let actuallyUser = this.props.actuallyUser;
        actuallyUser = this.props.gameData.find((userSearch)=>{
                                                        return userSearch.id === actuallyUser.id;
                                                    });
        let indexFriendActuallyUser = actuallyUser.gameInvite.findIndex((userSearch) => {
            return userSearch.idGame === user.idGame;
        }) 
       let indexFriendUser = user.gameInvite.findIndex((userSearch) => {
            return userSearch.idGame === actuallyUser.idGame;
       })
       actuallyUser.gameInvite.splice(indexFriendActuallyUser, 1);
       user.gameInvite.splice(indexFriendUser, 1);
      this.changeGameBase(actuallyUser, user);
    }

    createFriendGame(user, direction) {
        let newDataForFriends = {
            idGame:  user.idGame,
            direction: direction,
            statusGame: false,
        }
        return newDataForFriends;
    }

    changeGameBase(actuallyUser, user) {
        let refYourUser = this.props.databaseGame.child(actuallyUser.idGame).child('gameInvite');
        let refFriend = this.props.databaseGame.child(user.idGame).child('gameInvite');
        refYourUser.set(actuallyUser.gameInvite);
        refFriend.set(user.gameInvite);
       setTimeout(()=>{
        user.inviteToGame = true;
        this.props.databaseGame.child(user.idGame).set(user);
       },1000);
    }

    render() {
        return <div className="menu-game"
                 style={this.props.showComponent && this.props.visibleGame ?
                            {width: '250px'}
                            :{width: '0px'}  
                          }
               >
                    <div className="menu-game-title">
                            Chess Area Game
                    </div>
                    <div className="menu-game-images">
                        <img className="menu-game-image-right"
                             src={knightRight}
                             alt="knight-right"
                        />
                        Chess Website
                         <img className="menu-game-image-left"
                             src={knightLeft}
                             alt="knight-left"
                        />
                    </div>
                    <div className="menu-game-option"
                         style={this.state.visibleStatusGame ?
                                    {
                                        backgroundColor: 'darkgray',
                                        borderColor: 'white'
                                    }
                                    :null
                               }
                         onClick={this.setVisibleStatusGame}      
                    >
                        Status Rozgrywki
                        {this.state.visibleStatusGame ?
                            <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                            :null
                        }
                    </div>
                    <div className="menu-game-option"
                        style={this.state.visibleSendInviteFriends ?
                                    {
                                        backgroundColor: 'darkgray',
                                        borderColor: 'white'
                                    }
                                    :null
                               }
                         onClick={this.setVisibleSendInviteFriends}      
                    >
                        Zaproś Znajomego Do Gry
                        {this.state.visibleSendInviteFriends ?
                            <React.Fragment>
                                <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                                <FadeIn>
                                    <div className="menu-game-friends">
                                        {this.props.actuallyUser.friends ?
                                            this.props.gameData.filter((user)=>{
                                            return user.id !== this.props.actuallyUser.id &&
                                                   this.props.actuallyUser.friends.find((friend)=>{
                                                       return friend.id === user.id && friend.isFriends
                                                   }) &&
                                                   user.statusGame !== 'offline'
                                            }).map((user, index, arr) => {
                                                return this.listFriends(user, index, arr);
                                            })
                                            :null
                                            }
                                    </div>
                                </FadeIn>
                            </React.Fragment>
                            :null
                        }
                    </div>
                    <div className="menu-game-option"
                         style={this.state.visibleInvites ?
                                    {
                                        backgroundColor: 'darkgray',
                                        borderColor: 'white'
                                    }
                                    :null
                               }
                         onClick={this.setVisibleInvites}
                         ref={(e)=>{this.refNewInvite = e}}      
                    >
                        Zaproszenia Do Gry
                        {this.state.visibleInvites ?
                            <React.Fragment>
                                <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                                <FadeIn>
                                    <div className="menu-game-friends">
                                        {this.props.actuallyGame.gameInvite ?
                                            this.props.actuallyGame.gameInvite.filter((friendGame)=>{
                                                return friendGame.direction === 'get';
                                            }).map((user, index, arr) => {
                                                return this.renderListInvite(user, index, arr);
                                            })
                                            :null
                                            }
                                    </div>
                                </FadeIn>
                            </React.Fragment>
                            :null
                        }
                    </div>
                    <div className="menu-game-option"
                         style={this.state.visibleActuallyGame ?
                                    {
                                        backgroundColor: 'darkgray',
                                        borderColor: 'white'
                                    }
                                    :null
                               }
                         onClick={this.setVisibleActuallyGame}      
                    >
                        Obecne Rozgrywki
                        {this.state.visibleActuallyGame ?
                            <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                            :null
                        }
                    </div>
                    <div className="menu-game-option"
                         style={this.state.visibleSettings ?
                                    {
                                        backgroundColor: 'darkgray',
                                        borderColor: 'white'
                                    }
                                    :null
                               }
                         onClick={this.setVisibleSettings}      
                    >
                        Ustawienia
                        {this.state.visibleSettings ?
                            <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                            :null
                        }
                    </div>
                    <div className="menu-game-option"
                         onClick={()=>{this.props.showTableExitGame(true)}}
                    >
                        Wyjdź Z Gry
                    </div>
               </div>
    }
}