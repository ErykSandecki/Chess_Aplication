import React, { Component } from 'react';
import './index.css';
import introImage from '../../Images/intro.jpg';
import introText from '../../Images/intro-text.png';

export default class Intro extends Component {
    render() {
        return (
            <div>
                <img className="intro-text img-responsive" src={introText} alt="intro"/>
                <img className="intro img-responsive" src={introImage} alt="intro"/>
            </div>
        )
    }
}