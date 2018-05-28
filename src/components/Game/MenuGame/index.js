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
    }

    setVisibleStatusGame = (e) => {
        if(this.state.visibleStatusGame) {
            if(e.target.childNodes[1].className === "menu-game-arrow glyphicon glyphicon-chevron-up") {
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
                if(e.target.childNodes[1].className === "menu-game-arrow glyphicon glyphicon-chevron-up") {
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
            if(e.target.childNodes[1].className === "menu-game-arrow glyphicon glyphicon-chevron-up") {
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
            if(e.target.childNodes[1].className === "menu-game-arrow glyphicon glyphicon-chevron-up") {
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
            if(e.target.childNodes[1].className === "menu-game-arrow glyphicon glyphicon-chevron-up") {
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
               </div>
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
                                                       return friend.id === user.id
                                                   }) 
                                            }).map((user, index, arr) => {
                                                return this.listFriends(user, index, arr)
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
                    >
                        Zaproszenia Do Gry
                        {this.state.visibleInvites ?
                            <span className="menu-game-arrow glyphicon glyphicon-chevron-up"/>
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