import React, { Component } from 'react';

import chessBoard from '../../../Images/chess-board-game.png';
import bishop from '../../../Images/bishop.png';

import './style.css';

export default class Board extends Component {

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
                            {!this.props.actuallyGame.busy ?
                                <React.Fragment>
                                    <div className="board-wait-game-1"></div>
                                    <div className="board-wait-game-2"></div>
                                    <div className="board-wait-game-3"></div>
                                    <img className={"bishop"} 
                                         src={bishop}
                                         alt={"bishop"}
                                    />
                                    <p className="board-wait-text">Zaproś Znajomego Aby Zagrać!</p>
                                </React.Fragment>
                                :null
                            }
                        </React.Fragment>
                        :null
                    }
                </div>
    }
}