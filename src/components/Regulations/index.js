import React, { Component } from 'react';
import { regulations } from './regulations.js';

import './style.css';

export default class Regulations extends Component {
    render() {
        return (
            <div
                className={[
                    'regulations',
                    this.props.visibleRegulation ? '' : '-hide',
                ].join('')}
                onClick={this.hideRegular}
            >
                <div 
                    className="regulations-background" 
                    onClick={this.props.hideRegulations}
                />
                <div className="regulations-table">
                    <h2 className="regulations-title">REGULAMIN</h2>
                    <div className="regulations-contain">
                        {regulations.map(function (content, index) {
                            if (content.charAt(0) === '§') {
                                return <h3  style={{textAlign: 'center'}}  
                                            key={index}
                                        >
                                            {content}
                                        </h3>;
                            } else if (parseInt(content.charAt(0), 10) > 0) {
                                return <p 
                                            key={index}
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        >
                                            {content}
                                        </p>
                            } else {
                                return (
                                    <p
                                        key={index}
                                        style={{
                                            marginLeft: '15px',
                                        }}
                                    >
                                        {content}
                                    </p>
                                );
                            }
                        })}
                    </div>
                    <div className="regulations-exit" onClick={this.props.hideRegulations}>
                        <span>WYJŚCIE</span>
                        <span className="glyphicon glyphicon-remove regulations-remove" />
                    </div>
                </div>
            </div>
        )
    }
}