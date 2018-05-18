import React, { Component } from 'react';

import './style.css';

import FadeIn from 'react-fade-in';

export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSearch: 'local',
            renderNumberUser: 5,
            nextFilter: false,
            nameForFilter: '',
            surnameForFilter: '',
            countryForFilter: '',
            rankingForFilter: '',
        }

        this.actuallyNumberRenderUser = -1;

        this.exitSearch = this.exitSearch.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
        this.checkScrollUsers = this.checkScrollUsers.bind(this);
    }

    changeSelectSearch = (value) => {this.setState({selectSearch: value});}

    exitSearch() {
        this.props.setVisibleFriends();
    }

    checkScrollUsers(e) {
        if((e.target.scrollTop) >= (e.target.scrollHeight - e.target.clientHeight)) {
            if(this.state.renderNumberUser < this.props.usersData.length){
                this.setState({renderNumberUser: this.state.renderNumberUser + 5});
                this.setState({nextFilter: true});
                setTimeout(()=>{
                    this.setState({nextFilter: false});
                },500);
            } 
        }
    }

    showSuggestionSearchForName = (e) => {
        let nameForFilter = e.target.value;
        this.setState({
            nameForFilter: nameForFilter,
            renderNumberUser: 5,
        })
    }

    showSuggestionSearchForSurname = (e) => {
        let surnameForFilter = e.target.value;
        this.setState({
            surnameForFilter: surnameForFilter,
            renderNumberUser: 5,
        })
    }

    showSuggestionSearchForCountry = (e) => {
        let countryForFilter = e.target.value;
        this.setState({
            countryForFilter: countryForFilter,
            renderNumberUser: 5,
        })
    }

    showSuggestionSearchForRanking = (e) => {
        let rankingForFilter = e.target.value;
        this.setState({
            rankingForFilter: rankingForFilter,
            renderNumberUser: 5,
        })
    }

    checkFilterName = (user) => {
        if(this.state.nameForFilter !== '') {
            if(user.name.toLowerCase().includes(this.state.nameForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterSurname = (user) => {
        if(this.state.surnameForFilter !== '') {
            if(user.surname.toLowerCase().includes(this.state.surnameForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterCountry = (user) => {
        if(this.state.countryForFilter !== '') {
            if(user.country.toLowerCase().includes(this.state.countryForFilter.toLowerCase())) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    checkFilterRanking = (user) => {
        if(this.state.rankingForFilter !== '') {
            // eslint-disable-next-line
            if(user.ranking === parseInt(this.state.rankingForFilter)) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }

    renderUsers(user, index) {
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

    render() {
        this.actuallyNumberRenderUser = -1;
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
                                            onInput={this.showSuggestionSearchForName}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="NAZWISKO"
                                               onInput={this.showSuggestionSearchForSurname}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="KRAJ"
                                               onInput={this.showSuggestionSearchForCountry}
                                        />
                                    </div>
                                    <div className="friends-advanced-search-block-input">
                                        <input className="friends-advanced-search-input"
                                               placeholder="RANKING"
                                               onInput={this.showSuggestionSearchForRanking}
                                        />
                                    </div>
                                </div>
                                <div className="friends-users">
                                    <div className="friends-users-your-friends"
                                        onClick={() => {this.changeSelectSearch('local')}}
                                        style={this.state.selectSearch === 'local'?
                                                    {height: '24px',
                                                     filter: 'brightness(100%)',
                                                    }
                                                    :null
                                              }     
                                    >
                                        Twoi znajomi
                                    </div>
                                    <div className="friends-users-search-friends"
                                        onClick={() => {this.changeSelectSearch('global')}}
                                        style={this.state.selectSearch === 'global'?
                                                    {height: '24px',
                                                     filter: 'brightness(100%)',
                                                    }
                                                    :null
                                              }
                                    >
                                        Szukaj znajomych
                                    </div>
                                    <div className="friends-users-table">
                                        <div className="friends-window-users"
                                             onScroll={this.checkScrollUsers}
                                        >
                                              {this.state.selectSearch === 'global'?
                                                this.props.usersData.filter((user)=>
                                                    {if(user.nameUser !== this.props.actuallyUser.nameUser) {this.actuallyNumberRenderUser++};
                                                     return user.nameUser !== this.props.actuallyUser.nameUser && 
                                                            this.actuallyNumberRenderUser < this.state.renderNumberUser &&
                                                            this.checkFilterName(user) &&
                                                            this.checkFilterSurname(user) &&
                                                            this.checkFilterCountry(user) &&
                                                            this.checkFilterRanking(user)}).map((user, index)=> {
                                                                    return this.renderUsers(user, index);
                                                                }) 
                                              :null}
                                        </div>
                                        <div className="friends-loader"
                                             style={this.state.nextFilter ?
                                                    {display: 'block'}
                                                   :{display: 'none'}
                                                   }
                                        >
                                        </div>
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