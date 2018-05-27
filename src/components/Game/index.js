import React, { Component } from 'react';

import Board from './Board';
import MenuGame from './MenuGame';

import './style.css';

export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleGameComponents: false,
        }
    }

    componentDidUpdate() {
        if(this.props.visibleGame && !this.state.visibleGameComponents) {
            setTimeout(() => {
            this.setState({
                visibleGameComponents: true,
            });
        },1000);
        }
        else if(!this.props.visibleGame && this.state.visibleGameComponents) {
            this.setState({
                visibleGameComponents: false,
            });
        }
    }

    render() {
        return <div className="game"
                    style={this.props.visibleGame ? 
                            {height: '800px'}
                            :{height: '0px'}
                          }
                >
                    {this.props.visibleGame ?
                        <React.Fragment>
                            <Board
                                visibleGameComponents = {this.state.visibleGameComponents}/>
                            <MenuGame/>
                        </React.Fragment>
                        :null
                    } 
               </div>
    }
}