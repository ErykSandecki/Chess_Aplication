import './style.css';
import React, { Component } from 'react';
import {regulations} from '../../Resources/regulations.js';
import Animate from 'react-smooth';

export default class Regulations extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.resizeTextRegular();
    }

    resizeTextRegular(){
        let selector = document.getElementsByClassName("text-regulations");
        for(let i = 0; i < selector.length; i++) {
            if(selector[i].innerHTML.charAt(0) === "§") {
                selector[i].style.fontSize="18px";
                selector[i].style.fontWeight="bold";
                selector[i].style.textAlign="center";
                selector[i].style.marginTop="10px";
            }
            // eslint-disable-next-line
            else if(parseInt(selector[i].innerHTML.charAt(0)) > 0) {
                selector[i].style.marginLeft="15px";
            }
            else {
                selector[i].style.marginLeft="25px";
            }
        }
    }

    render() {
        return(  
                <div className={this.props.vissibleRegulation ? 
                                "regulations"
                                :"regulations-hide"} onClick={this.hideRegular}>
                    <div className="regulations-background"/>
                        <div className="regulations-table">
                            <div className="regulations-title">REGULAMIN</div>
                    <div className="regulations-regular-text">
                    {regulations.map(function(reg, index){
                        return <p key={index} className="text-regulations">{reg}</p>
                    })}
                </div>
                <div className="regulations-exit" onClick={this.props.hideRegulations}>
                    <span>WYJŚCIE</span>   
                    <span className="glyphicon glyphicon-remove regulations-remove"/>                
                </div> 
              </div>
            </div>
        )
    }
}