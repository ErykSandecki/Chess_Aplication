import './style.css';

import React, { Component } from 'react';
import FadeIn from 'react-fade-in';


export default class Message extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showChat: false,
            vissibleWindowChat: false,
            actuallyUserChat: null,
            showAddUserChat: false,
        }
        this.lengthWordTextArea = null;
        this.refreshRenderChat = null;

        this.showChat = this.showChat.bind(this);
        this.refreshChat = this.refreshChat.bind(this);
        this.addUserToChat = this.addUserToChat.bind(this);
        this.deleteUserChat = this.deleteUserChat.bind(this);
        this.refreshOnResize = this.refreshOnResize.bind(this);
        this.changeUser = this.changeUser.bind(this);

        window.addEventListener('resize', this.refreshOnResize)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.showAddUserChat && this.state.actuallyUserChat) {
            if(window.innerWidth < 860 && this.state.actuallyUserChat.length < 2) {
                this.setState({showAddUserChat: false});
            }
            else if (window.innerWidth >= 860 && window.innerWidth < 1150 && this.state.actuallyUserChat.length < 3) {
                this.setState({showAddUserChat: false});
            }
    
            else if(window.innerWidth >= 1150 && window.innerWidth < 1450 && this.state.actuallyUserChat.length < 4)  {
                this.setState({showAddUserChat: false});
            }
    
            else if (window.innerWidth >= 1450 && this.state.actuallyUserChat.length < 5) {
                this.setState({showAddUserChat: false});
            }
        }
    }


    refreshOnResize() {
        if(this.refreshRenderChat){
            clearTimeout(this.refreshRenderChat);
        }
        this.refreshRenderChat = setTimeout(() => {
            this.setState({actuallyUserChat: this.state.actuallyUserChat});
        },100);
    }

    showChat(e) {
        if(e.target.className === "message-title" || e.target.className === "message-title-text") {
            this.setState({showChat: !this.state.showChat});
        }
    }

    refreshChat() {
        if(this.state.showChat){
            this.setState({showChat: true});
        }
    }

    addUserToChat(user, index) {
        let actuallyUserChat;
        if(!this.state.actuallyUserChat) {
            actuallyUserChat = [user];
            this.setState({
                actuallyUserChat : actuallyUserChat,
                vissibleWindowChat : true,
            });
        }
        else {
            if(!this.state.actuallyUserChat.find((searchUser) => {
                return searchUser.id === user.id;
            })){
                actuallyUserChat = this.state.actuallyUserChat;
                actuallyUserChat.push(user);
                this.setState(actuallyUserChat);
            }
        }
    }

    renderWindowChat(user, index) {
        let friendResizeArea = this.props.actuallyUser.friends.find((friend , index) => {
            return friend.id === user.id;
        })
        let indexActuallyFriends = this.props.actuallyUser.friends.findIndex((friend , index) => {
            return friend.id === user.id;
        })
        let styleRight = {right: '280px'};
        if(index > 0) {
            styleRight = this.setPostionWindow(index);
        }
        if(styleRight !== -1) {
            return <div className="message-window-chat"
            key={index}
            style={styleRight}
        >
            <div className="message-window-chat-title"
                 onClick={(e) => {this.closeOrHideWindowChatAnyUser(e, index)}}
            >
                <span className="message-window-chat-user">
                    {user.name + ' ' + user.surname}
                </span>
                <span className="message-window-chat-close glyphicon glyphicon-remove" >
                </span>
                <div className="message-window-chat-contain">
                   {friendResizeArea.message.map((contain , index) => {
                       return this.renderMessage(contain, index)
                   })}
                </div>
                <div className="message-window-chat-text">
                    <textarea className="message-to-send" 
                              name="message-to-send"  
                              placeholder="Napisz nową wiadomość" 
                              rows="1"
                              onInput={(e) => {this.setHeightChat(e, friendResizeArea)}}
                              onKeyDown={(e) => {this.sendMessage(e, indexActuallyFriends , user)}}
                              >
                    </textarea>
                    <button className="message-window-send-message">
                        Wyślij
                    </button>          
                </div>
            </div>
        </div>
        }
        else {
            styleRight = this.setPositionIconAlreadyChatWindow();
            return <div className = "message-windows-hide-already-window-chat glyphicon glyphicon-comment"
                        key={index}
                        style={styleRight}
                        onClick={this.showAdditionalUserChat}
            >
            </div>
        }
       
    }

    renderMessage(contain, index) {
        let styleMessage;
        if(contain.userId === this.props.actuallyUser.id) {
            styleMessage = {
                border: '1px solid rgb(241, 240, 240)',
                backgroundColor: 'rgb(241, 240, 240)',
                color: 'black',
                float: 'right',
            }
        }
        else {
            styleMessage = {
                border: '1px solid rgb(55, 57, 64)',
                backgroundColor: 'rgb(55, 57, 64)',
                color: 'white',
            }
        }
        if(index === 0) {
            return <div key={index} className="message-window-chat-message-first">
                        <img className="message-window-chat-img-first" 
                             src={contain.userPicture}
                             alt={index}/>
                        <div className="message-window-chat-message-contain-first">
                            {contain.contain}
                        </div>
                    </div> 
        }
        else {
            return <div className="message-window-chat-message-next"
                        key={index}
                    >
                        {contain.userPicture !== this.props.actuallyUser.pictureUrl ?
                            <img className="message-window-chat-img-next" 
                                 src={contain.userPicture}
                                 alt={index}/>
                        :null
                        }
                        <div className="message-window-chat-message-contain-next"
                             style={styleMessage}
                        >
                            <p className="message-window-chat-message-contain-next-text">{contain.contain}</p>
                        </div>
                    </div> 
        }
        
    }

    showAdditionalUserChat = () => {this.setState({showAddUserChat: !this.state.showAddUserChat})}

    setPostionWindow(index) {
        if(window.innerWidth > 860 && index === 1) {
            return {right: '540px'};
        }

        else if(window.innerWidth > 1150 && index === 2) {
             return {right: '800px'};
         }
         else if(window.innerWidth > 1450 && index === 3) {
            return {right: '1060px'};
        } 
       else {
           return -1;
       }  
    }

    setPositionIconAlreadyChatWindow() {
        if(window.innerWidth < 860) {
            return {right: '540px'};
        }
        else if (window.innerWidth < 1150) {
            return {right: '800px'};
        }

        else if(window.innerWidth < 1450)  {
            return {right: '1060px'};
        }

        else {
            return {right: '1320px'};
        }

    }

    closeOrHideWindowChatAnyUser(e , index) {
        if(e.target.className === "message-window-chat-close glyphicon glyphicon-remove") {
            this.deleteUserChat(index);
        }
        else if(e.target.className === "message-window-chat-title"){
           this.hideUserChat(e, index);
        }
    }

    deleteUserChat(index) {
        let actuallyUserChat;
        actuallyUserChat = this.state.actuallyUserChat;
        actuallyUserChat.splice(index, 1);
        if(actuallyUserChat.length < 1) {
            this.setState({
                vissibleWindowChat: false,
                actuallyUserChat: null,
            })
        }
        else {
            this.setState({actuallyUserChat});
        }
    }

    hideUserChat(e, index) {
        if(e.target.childNodes[2].style.display === 'none') {
            e.target.childNodes[2].style.display = 'block';
            e.target.childNodes[3].style.display = 'block';
        }
        else {
            e.target.childNodes[2].style.display = 'none';
            e.target.childNodes[3].style.display = 'none';
        }
    }

    sendMessage(e, index, user) {
        if(e.keyCode === 13 && !e.shiftKey) {
            let newMessage = {
                contain: e.target.value,
                userId: this.props.actuallyUser.id,
                userPicture: this.props.actuallyUser.pictureUrl,
            }
            let setUserMessage;
            let setUserFriendsMessage;
            let indexFriend;
            setUserMessage = user.friends.find((friend)=> {
                return friend.id === this.props.actuallyUser.id;
            })
            indexFriend = user.friends.findIndex((friend)=> {
                return friend.id === this.props.actuallyUser.id;
            })
            setUserMessage.message.push(newMessage);
            setUserFriendsMessage = this.props.actuallyUser.friends.find((friend) => {
                return user.id === friend.id;
            })
            setUserFriendsMessage.message.push(newMessage);
            this.props.databaseUsers.child(user.id).child('friends').child(indexFriend).child('message').set(setUserMessage.message);
            this.props.databaseUsers.child(this.props.actuallyUser.id).child('friends').child(index).child('message').set(setUserFriendsMessage.message);
            e.preventDefault();            
            e.target.rows = 1;
            e.target.value = '';
            e.target.parentNode.previousSibling.style.height = '250px';
            this.change = true;
        }
    }

    setHeightChat(e, friendResizeArea) {
        if(e.target.value.length < friendResizeArea.resizeArea[e.target.rows - 1]){
            e.target.rows -= 1;
            e.target.parentNode.previousSibling.style.height = (250 - 23 * (e.target.rows - 1)) + 'px';
        }
        if((e.target.scrollHeight === 42 && e.target.rows === 1) ||
            (e.target.scrollHeight === 61 && e.target.rows === 2) ||
            (e.target.scrollHeight === 80 && e.target.rows === 3)) {
            friendResizeArea.resizeArea[e.target.rows] = e.target.value.length;
            e.target.parentNode.previousSibling.style.height = (250 - 23 * e.target.rows) + 'px';
            e.target.rows += 1;    
        }
    }


    renderListFriendsChat(friend, index) {        
        let user = this.props.usersData.find((user) => {
                        return friend.id === user.id;
                    })
                                        
        return  <div className="message-contact-filter-friends" 
                     key={index}
                     onClick={() => {
                         this.addUserToChat(user, index);
                     }}
                >
                    <img className="message-contact-filter-friends-image" 
                         src={user.pictureUrl} 
                         alt={index}
                    />
                    <p className="message-contact-filter-friends-user">
                        {user.name + ' ' + user.surname}
                    </p>
                    {user.status === 'online' ?
                        <div className="message-contact-filter-friends-status"></div>
                        :null}             
                    <div className="message-contact-filter-friends-underline"></div>
                </div>
    }

    renderAdditionalUser(user, index) {
        return <div className="message-additional-user"
                    key={index}
                >
                    <p className="message-additional-user-text"
                       onClick={(e) => {this.changeUser(e, index)}}>
                        {user.name + ' ' + user.surname}
                    </p>
                    <span className="message-delete-additional-user glyphicon glyphicon-remove"
                          onClick={() => {this.deleteUserChat(index)}}
                    />
                </div>
    }

    changeUser(e, index) {
        let actuallyUserChat = this.state.actuallyUserChat;
        let userCopy = actuallyUserChat[0];
        actuallyUserChat[0] = actuallyUserChat[index];
        actuallyUserChat[index] = userCopy;
        this.setState({
                actuallyUserChat : actuallyUserChat,
                showAddUserChat : false,
            });
            console.log("jesr");
        let windowChatFirst = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[4].firstChild;
        windowChatFirst.childNodes[2].style.height = "250px";
        windowChatFirst.childNodes[3].firstChild.value = '';
        windowChatFirst.childNodes[3].firstChild.rows = 1;
    }

   
    render() {
        let styleRightAdditionalUser = this.setPositionIconAlreadyChatWindow();
        return (
                <React.Fragment>
                    <div className="message">
                        <div className="message-title"
                             onClick={this.showChat}
                        >
                            <span className="message-title-text" >
                                Wiadomości
                            </span>
                            <span className="message-title-settings glyphicon glyphicon-cog"></span>
                            <span className="message-title-new-message glyphicon glyphicon-plus"></span>
                            {this.props.actuallyUser.friends && this.state.showChat ?     
                                <FadeIn>
                                    <div className="message-contacts-filter">
                                        {this.props.actuallyUser.friends.filter((friend) => {
                                           return friend.isFriends && this.props.usersData.find((user)=>{
                                                return user.id === friend.id && user.status === 'online';    
                                           })}).map((friend, index) => {
                                                                            return this.renderListFriendsChat(friend, index)
                                                                            }
                                                                        )
                                        }
                                        {
                                            this.props.actuallyUser.friends.filter((friend) => {
                                            return friend.isFriends && this.props.usersData.find((user)=>{
                                                return user.id === friend.id && user.status === 'offline';    
                                           })}).map((friend , index) => {
                                                                            return this.renderListFriendsChat(friend, index);
                                                                        })
                                        }
                                    </div>
                                </FadeIn>
                            :null}
                            {this.state.vissibleWindowChat && this.props.actuallyUser.friends ?
                                this.state.actuallyUserChat.map((user , index) => {
                                    let refreshUser = this.props.usersData.find((searchuser)=>{
                                        return user.id === searchuser.id
                                    })
                                    if(this.props.actuallyUser.friends.find((friend)=>{
                                        return friend.id === refreshUser.id;
                                    })){
                                        return this.renderWindowChat(refreshUser, index);
                                    }
                                    else {
                                        return null;
                                    } 
                                })
                                :null
                            }
                            <FadeIn>
                            {this.state.showAddUserChat && this.props.actuallyUser.friends ?
                                <div className="message-window-additional-user"
                                     style={styleRightAdditionalUser}  
                                >
                                    {window.innerWidth < 860 ?
                                        this.state.actuallyUserChat.map((user , index) => {
                                            let refreshUser = this.props.usersData.find((searchuser)=>{
                                                return user.id === searchuser.id
                                            })
                                            if(this.props.actuallyUser.friends.find((friend)=>{
                                                return friend.id === refreshUser.id;
                                            })) {
                                                if(index > 0) {
                                                    return this.renderAdditionalUser(user ,index);
                                                }
                                                else {
                                                    return null;
                                                }
                                            }
                                            else {
                                                return null;
                                            }
                                    })
                                    :window.innerWidth < 1150 ?
                                            this.state.actuallyUserChat.map((user , index) => {
                                                let refreshUser = this.props.usersData.find((searchuser)=>{
                                                    return user.id === searchuser.id
                                                })
                                                if(this.props.actuallyUser.friends.find((friend)=>{
                                                    return friend.id === refreshUser.id;
                                                })) {
                                                    if(index > 1) {
                                                        return this.renderAdditionalUser(user ,index);
                                                    }
                                                    else {
                                                        return null;
                                                    }
                                                }
                                                else {
                                                    return null;
                                                }
                                            })
                                    :window.innerWidth < 1450 ?
                                                this.state.actuallyUserChat.map((user , index) => {
                                                    let refreshUser = this.props.usersData.find((searchuser)=> {
                                                        return user.id === searchuser.id
                                                    })
                                                    if(this.props.actuallyUser.friends.find((friend)=> {
                                                        return friend.id === refreshUser.id;
                                                    })){
                                                        if(index > 2) {
                                                            return this.renderAdditionalUser(user ,index);
                                                        }
                                                        else {
                                                        return null;
                                                        }
                                                    }
                                                    else {
                                                        return null;
                                                    }
                                                })
                                                :this.state.actuallyUserChat.map((user , index) => {
                                                    let refreshUser = this.props.usersData.find((searchuser)=>{
                                                        return user.id === searchuser.id
                                                    })
                                                    if(this.props.actuallyUser.friends.find((friend)=>{
                                                        return friend.id === refreshUser.id;
                                                    })){
                                                        if(index > 3) {
                                                            return this.renderAdditionalUser(user ,index);
                                                        }
                                                        else {
                                                            return null;
                                                        }
                                                    }
                                                    else {
                                                        return null;
                                                    }
                                })
                                    }               
                                </div>
                                :null
                            }
                            </FadeIn>
                        </div>
                    </div>
                </React.Fragment>
               )
    }
}

