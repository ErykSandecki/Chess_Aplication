import './index.css';
import React, { Component } from 'react';
import {data, allUsers} from '../../Firebase/index.js';
export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayFriends: 'none',
            opacityFriendsBackground: 0,
            opacityFriendsTable: 0,
            styleYourFriends: {},
            styleSearchFriends: {},
            friendsSearch: false,
            filterSearch: 10,
            nextTop: 400,
            styleFriendsUsersListFilter: 'blur(0px)',
            styleFriendsLoaderDisplay: 'none',
        }
        this.hideFriendsSection = this.hideFriendsSection.bind(this);
        this.showFriendsSection = this.showFriendsSection.bind(this);
        this.showYourFriends = this.showYourFriends.bind(this);
        this.showSearchFriends = this.showSearchFriends.bind(this);
        this.showMoreUsers = this.showMoreUsers.bind(this);
    }

    componentDidMount() {
        this.showYourFriends();     
    }

    componentWillReceiveProps() {
        setTimeout(()=> {
            if(this.props.vissibleFriends) {
                this.showFriendsSection();
                this.setState({
                    filterSearch: 10,
                    nextTop: 400,
                })
            }
        },1);
    }

    showMoreUsers(e) {
        if(e.target.scrollTop > this.state.nextTop) {
            this.setState({
                styleFriendsUsersListFilter: 'blur(1px)',
                styleFriendsLoaderDisplay: 'block',
            })
            setTimeout(()=>{
                this.setState({styleFriendsUsersListFilter: 'blur(0px)'})
                this.setState({
                    filterSearch: this.filterSearch + 10,
                    nextTop: this.state.nextTop + 400,
                });
                this.setState({styleFriendsLoaderDisplay: 'none'});
            },1000)
        }
    }
    
    showFriendsSection() {
        this.setState({displayFriends: 'block'})
        setTimeout(()=> {
            this.setState({opacityFriendsBackground: 0.9})
            setTimeout(() =>{
                this.setState({opacityFriendsTable: 1 })
            },500)
        },1000);
    }

    hideFriendsSection() {
        this.props.hideFriendsSection();
        this.setState({opacityFriendsTable: 0})
        setTimeout(() => {
            this.setState({opacityFriendsBackground: 0})
            setTimeout(() => {
                this.setState({displayFriends: 'none'})
            },500);
        },500);
    }

    showYourFriends() {
        this.setState({
            friendsSearch: false,
            styleYourFriends: {
                borderTopLeftRadius: '15px',
                borderTop: '2px solid #e6e6e6',
                borderLeft: '2px solid #e6e6e6',
                borderTopRightRadius:'15px',
                fontWeight: 600,
                borderBottom: 'unset',
                borderBottomRightRadius: 'unset',

            },
            styleSearchFriends: {
                borderBottom: '2px solid #e6e6e6',
                borderBottomLeftRadius: '15px',
                fontWeight: 100,
                borderTop: 'unset',
                borderTopLeftRadius: 'unset',
                borderBottomRightRadius: 'unset',
                borderRight: 'unset',
            }
        })
    }
    showSearchFriends() {
        this.setState({
            friendsSearch: true,
            styleYourFriends: {
                borderTopLeftRadius: 'unset',
                borderTop: 'unset',
                borderLeft: 'unset',
                borderTopRightRadius:'unset',
                fontWeight: 100,
                borderBottom: '2px solid #e6e6e6',
                borderBottomRightRadius: '15px',
            },
            styleSearchFriends: {
                borderBottom: 'unset',
                borderBottomLeftRadius: 'unset',
                fontWeight: 600,
                borderTop:'2px solid #e6e6e6',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                borderRight: '2px solid #e6e6e6',
            }
        })
    }

    render() {
        const styleFriends = {display: this.state.displayFriends};
        const styleFriendsBackground = {opacity: this.state.opacityFriendsBackground};
        const styleFriendsTable = {opacity: this.state.opacityFriendsTable};
        const styleFriendsUsersList = {filter: this.state.styleFriendsUsersListFilter};
        const styleFriendsLoader = {display: this.state.styleFriendsLoaderDisplay};
        return(
            <div className="friends" style={styleFriends}>
               <div className="friends-background" style={styleFriendsBackground} onClick={this.hideFriendsSection}></div>
               <div className="friends-table" style={styleFriendsTable}>
                    <div className="friends-title">ZNAJOMI</div>
                    <div className="friends-users-profile-table">
                        <div className="friends-image-users-section">
                            <img className="friends-image-users img-responsive img-circle" 
                                 src={data ? 
                                 data.pictureUrl
                                 : null} 
                                 alt="users"/>
                        </div>
                        <div className="friends-name-users">
                            <p className="friends-name-users-text">
                                {data ? 
                                    data.name + ' '+ data.surname 
                                    : null}
                            </p>
                        </div>
                        <div className="friends-list-users">
                            <p className="friends-list-users-text">Znajomi: 
                                <span className="badge friends-number">
                                {data ? 
                                    data.friends.length - 1 
                                    : null}
                                </span>
                            </p>
                        </div>
                        <div className="friends-ranking-users">
                            <p className="friends-ranking-users-text">Ranking: 
                                <span className="badge friends-ranking">
                                {data ? 
                                    data.ranking 
                                    : null}
                                </span>
                            </p>
                        </div>
                    </div> 
                    <div className="friends-users">
                          <div className="friends-users-your-friends" 
                               style={this.state.styleYourFriends} 
                               onClick={this.showYourFriends}>
                               Twoi znajomi</div>
                          <div className="friends-users-search-friends" 
                               style={this.state.styleSearchFriends}
                               onClick={this.showSearchFriends}>
                               Szukaj znajomych</div>
                          <div className="friends-users-table">
                            <input placeholder="Imię" className="friends-search-username"/>
                            <button className="friends-search-advanced">Wyszukiwanie zaawansowane</button>
                            <div className="friends-window-users" onScroll={this.showMoreUsers}>
                                <div className="friends-loader" style={styleFriendsLoader}></div>
                                {this.state.friendsSearch ? 
                                    this.props.vissibleFriends ? 
                                        allUsers.map((user, index) => {
                                            if(index >= this.state.filterSearch) {
                                                return null;
                                            }
                                            return user.nameUser !== data.nameUser ? 
                                                <div key={index} className="friends-users-list" style={styleFriendsUsersList}>
                                                    <img className="friends-users-list-image img-circle" src={user.pictureUrl} alt={"image-users-" + index}/>
                                                    <div className="friends-users-list-informations">
                                                        <p className="friends-users-list-information">{user.nameUser}</p>
                                                        <p className="friends-users-list-information">Ranking: {user.ranking}</p>
                                                        <button className="friends-button-add-friends btn btn-default">Dodaj do znajomych</button>
                                                    </div>
                                                </div>
                                            : null}) 
                                        :null
                                :null}
                            </div>
                          </div>          
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

