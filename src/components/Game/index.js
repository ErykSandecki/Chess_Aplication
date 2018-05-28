import React, { Component } from 'react';

import Board from './Board';
import MenuGame from './MenuGame';

import './style.css';

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleGameComponents: false,
            showComponent: false,
            dataGame: false,
            showExitButton: false,
        }

        this.exitGame = this.exitGame.bind(this);
    }

    addUserToDataBaseGame() {
        let actuallyUser = this.props.actuallyUser;
        if(!this.props.gameData.find((user)=> {
            return  actuallyUser.id === user.id;
        })) {
            let dataUser = {
                id: actuallyUser.id,
                inviteToGame: false,
                idGame: false,
                statusGame: 'online',
                name: actuallyUser.name,
                surname: actuallyUser.surname,
                busy: false,
            }
            this.props.databaseGame.push(dataUser);
            this.props.setActullayGame(dataUser);
        }
        else {
            let gameUserData = this.props.gameData.find((user)=> {
                return actuallyUser.id === user.id;
            });
            gameUserData.statusGame = 'online';
            this.props.databaseGame.child(gameUserData.idGame).set(gameUserData);
            this.props.setActullayGame(gameUserData);
        }
    }

    componentDidUpdate() {
        if(this.props.visibleGame && !this.state.dataGame) {
            this.setState({dataGame: true});
            this.addUserToDataBaseGame();
        }
        if(this.props.visibleGame && !this.state.visibleGameComponents) {
            setTimeout(() =>{
                this.setState({visibleGameComponents: true})
            },1000)
        }
        if(!this.state.showComponent && this.state.visibleGameComponents) {
            setTimeout(() =>{
                this.setState({showComponent: true});
            },2000);
        }
    }

    showTableExitGame = (showExitButton) => {if(this.state.showExitButton !== showExitButton){this.setState({showExitButton})}};

    exitGame() {
        this.props.setVisibleGame(false);
        this.setState({
            showComponent: false,
            visibleGameComponents: false,
            showExitButton: false,
            dataGame: false,
        })
        let actuallyUser = this.props.actuallyUser;
        let gameUserData = this.props.gameData.find((user)=> {
            return actuallyUser.id === user.id;
        });
        gameUserData.statusGame = 'offline';
        this.props.databaseGame.child(gameUserData.idGame).set(gameUserData);
    }

    render() {
        return <div className="game"
                    style={this.props.visibleGame ? 
                            {height: '800px'}
                            :{height: '0px'}
                          }
                >
                    {this.state.visibleGameComponents ?
                        <React.Fragment>
                            <Board
                                showComponent = {this.state.showComponent}
                                visibleGame = {this.props.visibleGame}
                                actuallyGame = {this.props.actuallyGame}/>
                            <MenuGame
                                showComponent = {this.state.showComponent}
                                visibleGame = {this.props.visibleGame}
                                showTableExitGame = {this.showTableExitGame}
                                gameData = {this.props.gameData}
                                actuallyUser = {this.props.actuallyUser}
                                usersData = {this.props.usersData}/>
                        </React.Fragment>
                        :null
                    }
                {this.state.showExitButton && this.props.visibleGame ?
                    <div className="game-exit-buttons">
                        <p className="game-exit-title">Czy chcesz napewno chcesz wyjść z gry ?</p>
                        <button className="game-exit-button-exit"
                                onClick={this.exitGame}
                        >
                            Wyjdź
                        </button>
                        <button className="game-exit-button-stay" 
                                onClick={() =>{this.showTableExitGame(false)}}
                        >
                            Zostań
                        </button>
                    </div>
                    :null
                }     
               </div>
    }
}