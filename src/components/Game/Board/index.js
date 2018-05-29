import React, { Component } from 'react';

import chessBoard from '../../../Images/chess-board-game.png';

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