import './index.css';
import React, { Component } from 'react';
import {regulations} from '../../Resources/regulations.js';

export default class Regulations extends Component {
    componentDidMount() {
        let selector = document.getElementsByClassName("text-regulations");
        for(let i = 0; i < selector.length; i++) {
            if(selector[i].innerHTML.charAt(0) === "§") {
                selector[i].style.fontSize = "18px";
                selector[i].style.fontWeight = "bold";
                selector[i].style.marginLeft = "5px";
                selector[i].style.marginTop = "10px";
            }
            // eslint-disable-next-line
            else if(parseInt(selector[i].innerHTML.charAt(0)) > 0) {
                selector[i].style.marginLeft = "15px";
            }
            else {
                selector[i].style.marginLeft = "25px";
            }
        }
    }
    render() {
        return(
            <React.Fragment>
              {regulations.map(function(reg, index){
                    return <p key={index} className="text-regulations">{reg}</p>
                })}
            </React.Fragment>
        )
    }
}