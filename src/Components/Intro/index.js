import React, { Component } from 'react';
import './index.css';
import introImage from '../../Images/Chess-picture.jpg'

export default class Intro extends Component {
    render() {
        return (
            <div>
                <img className="intro img-responsive" src={introImage} alt="intro"/>
            </div>
        )
    }
}