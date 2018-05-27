import React, { Component } from 'react';

import knightRight from '../../../Images/chess-knight-right.png';
import knightLeft from '../../../Images/chess-knight-left.png';

import './style.css';


export default class MenuGame extends Component {
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
                    <div className="menu-game-option">Status Rozgrywki</div>
                    <div className="menu-game-option">Zaproś Znajomego Do Gry</div>
                    <div className="menu-game-option">Zaproszenia Do Gry</div>
                    <div className="menu-game-option">Obecne Rozgrywki</div>
                    <div className="menu-game-option">Ustawienia</div>
                    <div className="menu-game-option">Wyjdź Z Gry</div>
               </div>
    }
}