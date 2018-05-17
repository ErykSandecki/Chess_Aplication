import './style.css';
import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSearch: 'local',
        }

        this.exitSearch = this.exitSearch.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    changeSelectSearch = (value) => {this.setState({selectSearch: value});}

    exitSearch() {
        this.setState({selectSearch: 'local'});
        this.props.setVisibleFriends();
    }

    filterUsers(user, index) {
        if(user.nameUser === this.props.actuallyUser.nameUser) {
            return null;
        }
        else {
            return (
                <div key={index} className="friends-users-list" >
                    <img className="friends-users-list-image" 
                         src={user.pictureUrl}
                         alt={'friends-' + index}
                    />
                    <div className="friends-users-list-informations">
                        <p className="friends-users-list-information-1">
                            {user.name + ' ' + user.surname}
                        </p>
                        <p className="friends-users-list-information-2">
                            {user.ranking}
                        </p>
                    </div>
                    <button className="friends-button-add-friends">
                            Dodaj znajomego
                            <span className="glyphicon glyphicon-user"/>
                    </button>
                </div>
                   )
        }
    }

    render() {
        return(
            <FadeIn>
                <div className="friends">
                    <div className="friends-background"
                         onClick={this.exitSearch}
                    >     
                    </div>
                    <div className="friends-table" >
                        <div className="friends-title">
                            <p className="friends-title-text">ZNAJOMI</p>
                            <div className="friends-advanced-search">
                                <div className="friends-advanced-search-title">SZUKAJ</div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                            placeholder="IMIE"
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="NAZWISKO"
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="KRAJ"
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="RANKING"
                                        />
                                    </div>
                                </div>
                                <div className="friends-users">
                                    <div className="friends-users-your-friends"
                                        onClick={() => {this.changeSelectSearch('local')}}
                                        style={this.state.selectSearch === 'local'?
                                                    {height: '24px'}
                                                    :{filter: 'brightness(60%)'}
                                              }     
                                    >
                                        Twoi znajomi
                                    </div>
                                    <div className="friends-users-search-friends"
                                        onClick={() => {this.changeSelectSearch('global')}}
                                        style={this.state.selectSearch === 'global'?
                                                    {height: '24px'}
                                                    :{filter: 'brightness(60%)'}
                                              }
                                    >
                                        Szukaj znajomych
                                    </div>
                                    <div className="friends-users-table">
                                        <div className="friends-window-users">
                                              {this.state.selectSearch === 'global'?
                                                this.props.usersData.map((user, index)=>{
                                                    return this.filterUsers(user, index);
                                                }) 
                                              :null}
                                        </div>
                                    <div className="friends-loader"></div>
                                </div>          
                            </div>
                        </div>
                        <div className="friends-exit-section">
                            <div className="friends-exit-section-table"
                                 onClick={this.exitSearch}
                            >
                                <span className="friends-exit">WYJŚCIE</span>
                                <span className="friends-exit-icon glyphicon glyphicon-remove"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        )
    }
}