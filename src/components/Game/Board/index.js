import React, { Component } from 'react';

import './style.css';

export default class Board extends Component {
    render() {
        return <div className="board"
                    style={this.props.showComponent && this.props.visibleGame ?
                            {height: '600px'}
                            :{height: '0px'}  
                          }
                ></div>
    }
}