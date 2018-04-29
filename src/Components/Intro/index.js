import React, { Component } from 'react';
import './index.css';
import introImage from '../../Images/intro-image.png';
import introText from '../../Images/intro-text.png';

export default class Intro extends Component {
    render() {
        return (
            <div>
                <img className="intro img-responsive" src={introText}/>
                <img className="intro img-responsive" src={introImage} alt="intro"/>
            </div>
        )
    }
}