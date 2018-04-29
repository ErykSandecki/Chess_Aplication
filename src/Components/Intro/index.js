import React, { Component } from 'react';
import './index.css';
import introImage from '../../Images/intro-image.png';

export default class Intro extends Component {
    render() {
        return (
            <div>
                <img className="intro img-responsive" src={introImage} alt="intro"/>
            </div>
        )
    }
}