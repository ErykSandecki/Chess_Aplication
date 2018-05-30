import React, { Component } from 'react';

import chessBoard from '../../../Images/chess-board-game.png';

import './style.css';

export default class Board extends Component {

    WhenNotPlayerInGame(text, nameClass) {
        return <p className={nameClass}>{text}</p>
    }

    WhenCheckDecisionPlayers() {
        return <React.Fragment>
                    {this.spinerAnimation()}
                    {this.WhenNotPlayerInGame('Oczekuje na Akceptacje', 'board-wait-decision-text')}
                </React.Fragment>
    }

    spinerAnimation() {
       return <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
    }

    render() {
        return <div className="board"
                    style={this.props.showComponent && this.props.visibleGame ?
                            {height: '600px'}
                            :{height: '0px'}  
                          }      
                >
                    {this.props.showComponent && this.props.visibleGame ?
                        <React.Fragment>
                            <img className={"board-picture"} 
                                src={chessBoard}
                                alt={"board"}
                            />
                            {!this.props.actuallyGame.gameInvite ?
                                this.WhenNotPlayerInGame('Zaproś Znajomego Aby Zagrać!', 'board-wait-text')
                                :this.props.actuallyGame.gameInvite.find((userGame) =>{
                                    return userGame.statusGame
                                })?
                                    <div></div>
                                    :this.WhenCheckDecisionPlayers()
                            }
                        </React.Fragment>
                        :null
                    }
                </div>
    }
}

