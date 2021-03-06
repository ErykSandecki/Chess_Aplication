import React, { Component } from 'react';

import './style.css';

export default class Footer extends Component {
    render() {
        return(
            <footer>
                <div className="col-xs-10 col-xs-offset-1">
                    <p className="footer-menu-text col-xs-12 col-sm-offset-1 col-sm-2">
                        Kontakt
                    </p>
                    <p className="footer-menu-text col-xs-12 col-sm-2">
                        FAQs
                    </p>
                    <p className="footer-menu-text col-xs-12 col-sm-2"
                       onClick={this.props.showRegulations}
                    >
                       Regulamin
                    </p>
                    <p className="footer-menu-text col-xs-12 col-sm-2">
                        Polityka
                    </p>
                    <p className="footer-menu-text col-xs-12 col-sm-2">
                        Członkowie
                    </p>
                </div>
                <div className="social-icon col-xs-12">
                    <div className="icon col-sm-2 col-sm-offset-3">
                        <span className="fa fa-facebook"></span>
                    </div>
                    <div className="icon col-sm-2">
                        <span className="fa fa-twitter"></span>
                    </div>
                    <div className="icon col-sm-2">
                        <span className="fa fa-linkedin"></span>
                    </div>
                </div>
                <div className="col-xs-12 footer-down">
                    <p className="footer-down-text">
                        Copyright 2018. ChessWebsite
                    </p>
                    <p className="footer-down-text">
                        Webiste by Eryk Sandecki
                    </p>
                </div>
            </footer>
        )
    }
}