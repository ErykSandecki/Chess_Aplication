import React, { Component } from 'react';
import './index.css';
import chessLogo from '../../Images/chess-logo.jpg'
import emptyUserLogo from '../../Images/empty-logo-user.png'

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            navButtonClass: false
        }
        this.showMoreOptionsNav = this.showMoreOptionsNav.bind(this);
    }

    componentWillReceiveProps() {
        if(!this.props.stateBody && this.state.navButtonClass) {
            this.setState({
                navButtonClass: false
            })
        }
    }

    showMoreOptionsNav() {
        this.setState({
            navButtonClass : !this.state.navButtonClass
        })
        this.props.showBody();
        if(this.state.navButtonClass){
            this.props.hideBody();
        }
    }
    
    render() {
        return (
            <div className="nav">
                <img className="nav-picture-logo" src={chessLogo}/>
                <div className={this.state.navButtonClass ? 
                                  "nav-button change"
                                :  "nav-button"
                               } 
                     onClick={this.showMoreOptionsNav}
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={this.state.navButtonClass ? 
                                  "nav-user"
                                : "nav-user-hide"
                                }
                    >
                    <img className="img-circle" src={emptyUserLogo}/>
                    <p>Zaloguj</p>
                    <p>Zarejestruj</p>
                </div>
            </div>
        )
    }
}

export default Navigation;