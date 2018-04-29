import React, { Component } from 'react';
import './index.css';

export default class Footer extends Component {
    render() {
        return(
            <footer>
                <div className="col-xs-10 col-xs-offset-1">
                    <p className="footer-menu-text col-xs-12 col-sm-2">Kontakt</p>
                    <p className="footer-menu-text col-xs-12 col-sm-2">FAQs</p>
                    <p className="footer-menu-text col-xs-12 col-sm-3">Regulamin korzystania</p>
                    <p className="footer-menu-text col-xs-12 col-sm-3">Prywatna Polityka</p>
                    <p className="footer-menu-text col-xs-12 col-sm-2">Członkowie</p>
                </div>
            </footer>
        )
    }
}