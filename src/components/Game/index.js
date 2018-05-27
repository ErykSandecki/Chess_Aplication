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
        }
    }

    componentDidUpdate() {
        if(this.props.visibleGame) {
            setTimeout(() =>{
                this.setState({visibleGameComponents: true})
            },1000)
        }
        setTimeout(() =>{
        if(!this.state.showComponent && this.state.visibleGameComponents) {
            this.setState({showComponent: true});
        }
      },2000);

      if(!this.props.visibleGame && this.state.visibleGameComponents) {
         this.setState({
            visibleGameComponents: false,
            showComponent: false,
        })
      }
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
                                visibleGame = {this.props.visibleGame}/>
                            <MenuGame
                                showComponent = {this.state.showComponent}
                                visibleGame = {this.props.visibleGame}/>
                        </React.Fragment>
                        :null
                    } 
               </div>
    }
}