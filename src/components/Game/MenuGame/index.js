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
        if(this.props.clearAnimationSetBackgroundColor) {
            if(this.setColorBackground) {
                clearInterval(this.setColorBackground);
            }
        }
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
            
            if(this.props.actuallyGame.gameInvite.find((gameUser) => {
                return gameUser.direction === 'get' && !gameUser.statusGame;
            })) {
                if(!this.setColorBackground){
                    this.setColorBackground = setInterval(() => {
                        if(this.refNewInvite.style.backgroundColor === "black"){
                            this.refNewInvite.style.backgroundColor ="rgba(89,92,92)";
                        }
                        else {
                            this.refNewInvite.style.backgroundColor = "black";
                        } 
                    },500);
                }  
            }
            else{
                this.clearNewInviteNotifications();
            }

            if(this.props.actuallyGame.gameInvite.find((gameUser) => {
                return gameUser.statusGame;
            })) {
                
                if(!this.props.actuallyGame.gameInvite.find((gameUser) => {
                    return gameUser.thisGame;
                })) {
                    this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(0).child('thisGame').set(true);
                }
            }
        }

        else if(!this.props.actuallyGame.gameInvite) {
           this.clearNewInviteNotifications();
        }
    }

    clearNewInviteNotifications() {
        clearInterval(this.setColorBackground);
        if(this.setColorBackground){
            this.setColorBackground = null;
            if(this.state.visibleInvites) {
                this.refNewInvite.style.backgroundColor = "darkgray"
            }
            else {
                this.refNewInvite.style.backgroundColor = "rgba(89,92,92)";
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
        return this.renderListFriend(user, index, arr, userData, actuallyUserGame);
       
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
                         onClick={()=>{this.acceptedInviteToGame(userGame)}}
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

    renderListActuallyGameUsers(userGameid, index) {
        let userGame = this.props.gameData.find((userSearch)=>{
            return userSearch.idGame === userGameid.idGame;
        })
        let user = this.props.usersData.find((userSearch) => {
            return userSearch.id === userGame.id;
        })

        return  <div className="menu-game-friend-status"
                     key={index} 
                >  
                    <img className="menu-game-friend-status-image" 
                         src={user.pictureUrl}
                         alt={"friendGame" + index}
                    />
                    <p className="menu-game-friend-status-name">{user.name + ' ' + user.surname}</p>
                    {!userGameid.thisGame ?
                        <button className="menu-game-friend-set-game"
                                onClick={()=>{this.setUserActuallyGame(userGame)}}
                        >
                            PRZEŁĄCZ GRACZA
                        </button> 
                        :null
                    }
                    <button className="menu-game-friend-delete-player"
                         onClick={()=>{this.deleInviteToUserGame(userGame)}}
                    >
                        USUŃ GRACZA
                    </button>
                </div>
    }

    renderStatusGame(userGameid, index) {
        let userGame = this.props.gameData.find((userSearch)=>{
            return userSearch.idGame === userGameid.idGame;
        })
        let user = this.props.usersData.find((userSearch) => {
            return userSearch.id === userGame.id;
        })

        return  <div className="menu-game-friend-actually"
                     key={index} 
                >  
                    <img className="menu-game-friend-actually-image" 
                         src={user.pictureUrl}
                         alt={"friendGame" + index}
                    />
                    <p className="menu-game-friend-actually-name">{user.name + ' ' + user.surname}</p>
                    <button className="menu-game-friend-delete-player"
                            onClick={()=>{this.deleInviteToUserGame(userGame)}}
                    >
                        ZAKOŃCZ GRĘ
                    </button>
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

    acceptedInviteToGame(user) {
        let userSet = user.gameInvite.find((actuallyGame)=>{
            return actuallyGame.idGame === this.props.actuallyGame.idGame;
        });
        let actuallyUserSet = this.props.actuallyGame.gameInvite.find((actuallyGame)=>{
            return actuallyGame.idGame === user.idGame;
        });
        userSet.statusGame = true;
        actuallyUserSet.statusGame = true;
        let indexUserSet = user.gameInvite.findIndex((actuallyGame)=>{
            return actuallyGame.idGame === this.props.actuallyGame.idGame;
        });
        let indexActuallyUserSet = this.props.actuallyGame.gameInvite.findIndex((actuallyGame)=>{
            return actuallyGame.idGame === user.idGame;
        });
        if(!user.gameInvite.find((userGame) => {
            return userGame.thisGame;
        })) {
            userSet.thisGame = true;
        }
        if(!this.props.actuallyGame.gameInvite.find((userGame) => {
            return userGame.thisGame;
        })) {
            actuallyUserSet.thisGame = true;
        }
        if(Math.round(Math.random()) === 1) {
            userSet.colorFigure = 'white';
            actuallyUserSet.colorFigure = 'black';
        }
        else {
            userSet.colorFigure = 'black';
            actuallyUserSet.colorFigure = 'white';
        }

        if(actuallyUserSet.colorFigure === 'white') {
            actuallyUserSet.figures = this.createFigureAndSetPosition('white', 0, -1);
            actuallyUserSet.figuresEnemy = this.createFigureAndSetPosition('black', 525, 1);
            actuallyUserSet.yourMove = true;
            userSet.figures = this.createFigureAndSetPosition('black', 0 , -1);
            userSet.figuresEnemy = this.createFigureAndSetPosition('white', 525, 1);
            userSet.yourMove = false;
        }

        else {
            actuallyUserSet.figures = this.createFigureAndSetPosition('black', 0, -1);
            actuallyUserSet.figuresEnemy = this.createFigureAndSetPosition('white', 525, 1);
            actuallyUserSet.yourMove = false;
            userSet.figures = this.createFigureAndSetPosition('white', 0, -1);
            userSet.figuresEnemy = this.createFigureAndSetPosition('black', 525, 1);
            userSet.yourMove = true;
        }

        this.props.databaseGame.child(user.idGame).child('gameInvite').child(indexUserSet).set(userSet);
        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexActuallyUserSet).set(actuallyUserSet);
    }

    createFigureAndSetPosition(color, value, setValue) {
        let kingValue = color === 'white' ? 225 : 300;
        let hetmanValue = color === 'white' ? 300 : 225;
        let figures = [
            {
                nameFigure: 'pawn_1',
                srcImage: 'chess-pawn-'+ color,
                x: value  - 0,
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_2',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 75) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_3',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 150) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_4',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 225) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_5',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 300) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_6',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 375) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_7',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 450) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'pawn_8',
                srcImage: 'chess-pawn-'+ color,
                x: (value  - 525) * (setValue),
                y: (value  - 75) * (setValue),
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'tower_1',
                srcImage: 'chess-tower-'+ color,
                x: value  - 0,
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'tower_2',
                srcImage: 'chess-tower-'+ color,
                x: (value  - 525) * (setValue),
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'horse_1',
                srcImage: 'chess-horse-'+ color,
                x: (value  - 75) * (setValue),
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'horse_2',
                srcImage: 'chess-horse-'+ color,
                x: (value  - 450) * (setValue),
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'bishop_1',
                srcImage: 'chess-bishop-'+ color,
                x: (value  - 150) * (setValue),
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'bishop_2',
                srcImage: 'chess-bishop-'+ color,
                x: (value  - 375) * (setValue),
                y: value  - 0,
                status: true,
                firstMove: false,
            },
            {
                nameFigure: 'king',
                srcImage: 'chess-king-'+ color,
                x: (value  - kingValue) * (setValue),
                y: value  - 0,
                firstMove: false,
                status: true,
            },
            {
                nameFigure: 'hetman',
                srcImage: 'chess-hetman-'+ color,
                x: (value  - hetmanValue) * (setValue),
                y: value - 0,
                status: true,
                firstMove: false,
            },
        ]
        return figures;
    }

    setUserActuallyGame(user) {
        let actuallyGame = this.props.actuallyGame;
        let indexActiveGame = actuallyGame.gameInvite.findIndex((userGame) => {
            return userGame.thisGame;
        })
        let indexUnActiveGame = actuallyGame.gameInvite.findIndex((userGame) => {
            return user.idGame === userGame.idGame;
        })
        this.props.setClickFigure(false);
        this.props.setEnemy(true);
        this.props.databaseGame.child(actuallyGame.idGame).child('gameInvite').child(indexUnActiveGame).child('thisGame').set(true);
        this.props.databaseGame.child(actuallyGame.idGame).child('gameInvite').child(indexActiveGame).child('thisGame').set(false);
    }

    createFriendGame(user, direction) {
        let newDataForFriends = {
            idGame:  user.idGame,
            direction: direction,
            statusGame: false,
            colorFigure: 'check',
            thisGame: false,
            endGame: false,
        }
        return newDataForFriends;
    }

    changeGameBase(actuallyUser, user) {
        let refYourUser = this.props.databaseGame.child(actuallyUser.idGame).child('gameInvite');
        let refFriend = this.props.databaseGame.child(user.idGame).child('gameInvite');
        refYourUser.set(actuallyUser.gameInvite);
        refFriend.set(user.gameInvite);
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
                            <React.Fragment>
                                <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                                <FadeIn>
                                    <div className="menu-game-friends">
                                        {this.props.actuallyGame.gameInvite ?
                                            this.props.actuallyGame.gameInvite.filter((gameUser) => {
                                                return gameUser.thisGame;
                                            }).map((gameUser, index) => {
                                                return this.renderStatusGame(gameUser, index)
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
                                            if(this.props.actuallyGame.gameInvite) {
                                                if(this.props.actuallyGame.gameInvite.find((actuallyUser)=>{
                                                    return (actuallyUser.idGame === user.idGame && 
                                                    actuallyUser.direction === 'get') ||
                                                    (actuallyUser.idGame === user.idGame && 
                                                    actuallyUser.statusGame)})) {
                                                            return null;
                                                        }               
                                            }
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
                                                return friendGame.direction === 'get' && !friendGame.statusGame;
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
                            <React.Fragment>
                                <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
                                <FadeIn>
                                    <div className="menu-game-friends">
                                        {this.props.actuallyGame.gameInvite ?
                                            this.props.actuallyGame.gameInvite.filter((friendGame)=>{
                                                return friendGame.statusGame;
                                            }).map((user, index, arr) => {
                                                return this.renderListActuallyGameUsers(user, index, arr);
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