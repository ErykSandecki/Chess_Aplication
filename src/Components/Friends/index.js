import './index.css';
import React, { Component } from 'react';
import users from '../../Images/users-login.png';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.hideFriendsSection = this.hideFriendsSection.bind(this);
    }

    componentWillReceiveProps() {
        setTimeout(()=> {
            if(this.props.vissibleFriends) {
                this.showFriendsSection();
            }
        },1);
    }

    showFriendsSection() {
        document.getElementsByClassName("friends")[0].style.display = "block";
        setTimeout(()=> {
            document.getElementsByClassName("friends-background")[0].style.opacity = 0.9;
            setTimeout(() =>{
                document.getElementsByClassName("friends-table")[0].style.opacity = 1;
            },500)
        },1000);
    }

    hideFriendsSection() {
        this.props.hideFriendsSection();
        document.getElementsByClassName("friends-table")[0].style.opacity = 0;
        setTimeout(() => {
            document.getElementsByClassName("friends-background")[0].style.opacity = 0;
            setTimeout(() => {
                document.getElementsByClassName("friends")[0].style.display = "none";
            },500);
        },500);
    }

    render() {
        return(
            <div className="friends">
               <div className="friends-background" onClick={this.hideFriendsSection}></div>
               <div className="friends-table">
                    <div className="friends-users-profile-table">
                        <div className="friends-image-users-section">
                            <img className="friends-image-users img-responsive" src={users} alt="users"/>
                        </div>
                        <div className="friends-name-users">
                            <p className="friends-name-users-text">Eryk Sandecki</p>
                        </div>
                        <div className="friends-list-users">
                            <p className="friends-list-users-text">Znajomi: <span className="badge friends-number">2</span></p>
                        </div>
                        <div className="friends-ranking-users">
                            <p className="friends-ranking-users-text">Ranking: <span className="badge friends-ranking">42</span></p>
                        </div>
                    </div> 
                    <div className="friends-users">
                
                    </div>
                    <div className="friends-search-users">
                    
                    </div>
                    <div className="friends-exit-section" onClick={this.hideFriendsSection}>
                        <span className="friends-exit">WYJŚCIE</span>
                        <span className="friends-exit-icon glyphicon glyphicon-remove"></span>
                    </div>
               </div>
               
            </div>
        )
    }
}