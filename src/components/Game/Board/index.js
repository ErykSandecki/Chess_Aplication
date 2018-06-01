
import React, { Component } from 'react';

import chessBoard from '../../../Images/chess-board-game.png';
import hetman from '../../../Images/chess-figures/chess-hetman-white.png';
import horse from '../../../Images/chess-figures/chess-horse-white.png';
import tower from '../../../Images/chess-figures/chess-tower-white.png';
import bishop from '../../../Images/chess-figures/chess-bishop-white.png';

import './style.css';

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actuallyClassFigure: '',
            windowSetFigure: false,
        }
        this.setFigure = null;

        this.chooseFigure = this.chooseFigure.bind(this);
        this.setPositionFigurePawn = this.setPositionFigurePawn.bind(this);
        this.setFigureActually = this.setFigureActually.bind(this);
    }

    componentDidUpdate() {
        if(!this.props.clickFigure && this.state.actuallyClassFigure !== '') {
            this.setState({actuallyClassFigure: ''}); 
        }
    }

    WhenNotPlayerInGame(text, nameClass) {
        return <p className={nameClass}>{text}</p>
    }

    WhenCheckDecisionPlayers() {
        return <React.Fragment>
                    {this.spinerAnimation()}
                    {this.WhenNotPlayerInGame('Oczekuje na Akceptacje', 'board-wait-decision-text')}
                </React.Fragment>
    }

    spinerAnimation() {
       return <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
    }

    renderScaleBoard(text, index, direction) {
        return <div className="board-scale"
                    key={index}
                    style={direction === 'horizontally' ?
                            {left: (75 * index) + 'px',
                             top: '600px'}
                            :{left: '600px',
                              top: (525 - 75 * index) + 'px'
                             }
                          }
               >
                  {text}
               </div>
    }

    renderFigures(figure, index, enemy, userGame) {
        let classChoose = "board-figures " + figure.nameFigure + enemy;
        let classActuallyChoose = this.state.actuallyClassFigure;
        return <div className={"board-figures " + figure.nameFigure + enemy}
                    key={index}
                    onClick={(e) =>{this.chooseFigure(e, userGame)}}
                    style={{
                        right: figure.x + 'px',
                        bottom: figure.y + 'px',
                    }}
               >
                  <img className="board-figure-image"
                       src={require('../../../Images/chess-figures/' + figure.srcImage + '.png')}
                       alt={'figure' + index}
                  /> 
                  {
                    classChoose === classActuallyChoose ?
                    <React.Fragment>
                        <div className="spinner-figure"></div>
                        {this.renderNewPossiblePosition(figure, userGame)}
                    </React.Fragment>
                    :null
                  }   
               </div>
    }

    renderWaitOnMoveEnemy(userGame, index) {
        let userData = this.props.gameData.find((gameUser) => {
            return userGame.idGame === gameUser.idGame;
        })
        userData = this.props.usersData.find((user) => {
            return userData.id === user.id;
        })
        return <div className="board-check-your-move"
                    key={index}
               >
                    <div className="board-check-your-move-loader"></div>
                    <img className="board-check-your-move-img"
                         src={userData.pictureUrl}
                         alt={'user-picture' + index}  
                    />
                    <p className="board-text-wait">Aktualnie wykonuje ruch:</p>
                    <p className="board-text-wait-user">{userData.name + ' ' + userData.surname}</p>
               </div>
    }

    chooseFigure(e, userGame) {
        if(!userGame.yourMove) {
            return;
        }
        let classFigureName;
        if(e.target.className === 'board-figure-image' || e.target.className === 'spinner-figure') {
            classFigureName = e.target.parentNode.className;
        }
        else {
            classFigureName = e.target.className;
        }
        
        if(classFigureName.substr(-5) === 'enemy') {
            return;
        }
        if(classFigureName === this.state.actuallyClassFigure) {
            this.props.setClickFigure(false);
        }
        else {
            this.props.setClickFigure(true);
            this.setState({actuallyClassFigure: classFigureName})
        }
    }

    renderNewPossiblePosition(figure, userGame) {
        if(figure.nameFigure.substr(0,4) === 'pawn') {
           return this.checkNextPositionPawn(figure, userGame);
        }
        else if(figure.nameFigure.substr(0,5) === 'tower') {
           return this.checkNextPositionTower(figure, userGame);
        }
        else if(figure.nameFigure.substr(0,5) === 'horse') {
            return this.checkNextPositionHorse(figure, userGame);
        }
        else if(figure.nameFigure.substr(0,6) === 'bishop') {
            return this.checkNextPositionBishop(figure, userGame);
        }
    }

    checkNextPositionTower(figure, userGame) {
        let positionNext = [];
        let diffrent = 0;
        let newLengthArray = 0;
        let positionPositiveX = 75;
        let positionPositiveY = 75;
        let positionNegativeX = -75;
        let positionNegativeY = -75;
        let checkNextPositionPositiveY = true;
        let checkNextPositionNegativeY = true;
        let checkNextPositionPositiveX = true;
        let checkNextPositionNegativeX = true; 
        while(true) {  
            if(checkNextPositionPositiveY &&
                figure.y + positionPositiveY <= 525 && 
                !userGame.figures.find((figures) => {  
                   return figure.x === figures.x &&
                          figure.y + positionPositiveY === figures.y;  
               })) {
                positionNext.push({
                    right: 0,
                    bottom: positionPositiveY,
                })
                checkNextPositionPositiveY = this.checkEnemyCordinates(figure.x, figure.y + positionPositiveY, userGame);
            }
            else {
                checkNextPositionPositiveY = false;
            }
            if(checkNextPositionNegativeY &&
               figure.y + positionNegativeY >= 0 &&
               !userGame.figures.find((figures)=>{
                    return figure.x === figures.x &&
                           figure.y + positionNegativeY === figures.y;  
                })) {
                    positionNext.push({
                    right: 0,
                    bottom: positionNegativeY,
                })
                checkNextPositionNegativeY = this.checkEnemyCordinates(figure.x, figure.y + positionNegativeY, userGame);
            }
            else {
                checkNextPositionNegativeY = false;
            }

            if(checkNextPositionPositiveX &&
               figure.x + positionPositiveX <= 525 &&
               !userGame.figures.find((figures)=>{
                    return figure.x + positionPositiveX === figures.x &&
                           figure.y === figures.y;  
                })) {
                    positionNext.push({
                    right: positionPositiveX,
                    bottom: 0,
                })
                checkNextPositionPositiveX = this.checkEnemyCordinates(figure.x + positionPositiveX, figure.y, userGame);
            }

            else {
                checkNextPositionPositiveX = false;
            }
            if(checkNextPositionNegativeX &&
               figure.x + positionNegativeX >= 0 &&
               !userGame.figures.find((figures)=>{
                    return figure.x + positionNegativeX === figures.x &&
                           figure.y === figures.y;  
                })) {
                    positionNext.push({
                    right: positionNegativeX,
                    bottom: 0,
                })
                checkNextPositionNegativeX = this.checkEnemyCordinates(figure.x + positionNegativeX, figure.y, userGame);  
            }
            else {
                checkNextPositionNegativeX = false;
            }
            newLengthArray = positionNext.length;
            
            if(newLengthArray === diffrent) {
                break;
            }
            else {
                diffrent = newLengthArray;
                positionPositiveX += 75;
                positionPositiveY += 75;
                positionNegativeX -= 75;
                positionNegativeY -= 75;
            }
        }

       if(positionNext.length !== 0) {
        return positionNext.map((position, index)=> {
            return <div className="board-next-position"
                        style={position}
                        key={index}
                        onClick={()=>{this.setPositionFigures(figure, userGame, position)}}
                    >
                        <div className="board-next-position-point"></div> 
                   </div>
                })
        }
        else {
            return null;
        }  
    }

    checkNextPositionHorse(figure, userGame) {
        let positionNext = [];
        POSITION_HORSE.forEach((horsePos) => {
            if(figure.x + horsePos.x <= 525 &&
               figure.x + horsePos.x >= 0 &&
               figure.y + horsePos.y <= 525 &&
               figure.y + horsePos.y >= 0 &&
               !userGame.figures.find((figures)=>{
                return figure.x + horsePos.x === figures.x &&
                       figure.y + horsePos.y === figures.y;  
                })) {
                   positionNext.push({
                       right: horsePos.x,
                       bottom: horsePos.y,
                    });
               }
        })

        if(positionNext.length !== 0) {
            return positionNext.map((position, index)=> {
                return <div className="board-next-position"
                            style={position}
                            key={index}
                            onClick={()=>{this.setPositionFigures(figure, userGame, position)}}
                        >
                            <div className="board-next-position-point"></div> 
                       </div>
                    })
            }
            else {
                return null;
            }  
    }

    checkNextPositionBishop(figure, userGame) {
        let positionNext = [];
        let diffrent = 0;
        let newLengthArray = 0;
        let positionNegativeXPositiveY = {
            x: -75,
            y: 75,
        };
        let positionPositiveXPositiveY = {
            x: 75,
            y: 75,
        };
        let positionNegativeXNegativeY = {
            x: -75,
            y: -75,
        };
        let positionPositiveXNegativeY = {
            x: 75,
            y: -75,
        };
        let checkNextPositionNegativeXPositiveY = true;
        let checkNextPositionPositiveXPositiveY = true;
        let checkNextPositionNegativeXNegativeY = true;
        let checkNextPositionPositiveXNegativeY = true;
        let x =1;
        while(true) {  
            if(checkNextPositionNegativeXPositiveY &&
               figure.x + positionNegativeXPositiveY.x >= 0 &&
               figure.y + positionNegativeXPositiveY.y <= 525 &&
               !userGame.figures.find((figures)=>{
                return figure.x + positionNegativeXPositiveY.x === figures.x &&
                       figure.y + positionNegativeXPositiveY.y === figures.y;   
                })) {
                   positionNext.push({
                       right: positionNegativeXPositiveY.x,
                       bottom: positionNegativeXPositiveY.y,
                   })
                   checkNextPositionNegativeXPositiveY = this.checkEnemyCordinates(figure.x + positionNegativeXPositiveY.x, figure.y + positionNegativeXPositiveY.y, userGame);
            }

            else {
                checkNextPositionNegativeXPositiveY = false;
            }

            if(checkNextPositionPositiveXPositiveY &&
               figure.x + positionPositiveXPositiveY.x <= 525 &&
               figure.y + positionPositiveXPositiveY.y <= 525 &&
               !userGame.figures.find((figures)=>{
                return figure.x + positionPositiveXPositiveY.x === figures.x &&
                       figure.y + positionPositiveXPositiveY.y === figures.y;   
                })) {
                   positionNext.push({
                       right: positionPositiveXPositiveY.x,
                       bottom: positionPositiveXPositiveY.y,
                   })
                   checkNextPositionPositiveXPositiveY = this.checkEnemyCordinates(figure.x + positionPositiveXPositiveY.x, figure.y + positionPositiveXPositiveY.y, userGame);
            }

            else {
                checkNextPositionPositiveXPositiveY = false;
            }

            if(checkNextPositionNegativeXNegativeY &&
               figure.x + positionNegativeXNegativeY.x >= 0 &&
               figure.y + positionNegativeXNegativeY.y >= 0 &&
               !userGame.figures.find((figures)=>{
                    return figure.x + positionNegativeXNegativeY.x === figures.x &&
                           figure.y + positionNegativeXNegativeY.y === figures.y;   
                    })) {
                    positionNext.push({
                        right: positionNegativeXNegativeY.x,
                        bottom: positionNegativeXNegativeY.y,
                    })
                    checkNextPositionNegativeXNegativeY = this.checkEnemyCordinates(figure.x + positionNegativeXNegativeY.x, figure.y + positionNegativeXNegativeY.y, userGame);
             }

             else {
                checkNextPositionNegativeXNegativeY = false;
             }
            
            if(checkNextPositionPositiveXNegativeY &&
               figure.x + positionPositiveXNegativeY.x <= 525 &&
               figure.y + positionPositiveXNegativeY.y >= 0 && 
               !userGame.figures.find((figures)=>{
                    return figure.x + positionPositiveXNegativeY.x === figures.x &&
                           figure.y + positionPositiveXNegativeY.y === figures.y;   
                    })) {
                    positionNext.push({
                        right: positionPositiveXNegativeY.x,
                        bottom: positionPositiveXNegativeY.y,
                    })
                    checkNextPositionPositiveXNegativeY = this.checkEnemyCordinates(figure.x + positionPositiveXNegativeY.x, figure.y + positionPositiveXNegativeY.y, userGame);
            }

            else {
                checkNextPositionPositiveXNegativeY = false;
            }

            newLengthArray = positionNext.length;
            
            if(newLengthArray === diffrent) {
                break;
            }
            else {
                diffrent = newLengthArray;
                positionNegativeXPositiveY.x -= 75;
                positionNegativeXPositiveY.y += 75;
                positionPositiveXPositiveY.x += 75;
                positionPositiveXPositiveY.y += 75;
                positionNegativeXNegativeY.x -= 75;
                positionNegativeXNegativeY.y -= 75;
                positionPositiveXNegativeY.x += 75;
                positionPositiveXNegativeY.y -= 75;
            }
            x++;
            if(x===28) {
                break;
            }
        }

        if(positionNext.length !== 0) {
            return positionNext.map((position, index)=> {
                return <div className="board-next-position"
                            style={{
                                right: position.right - 2,
                                bottom: position.bottom,
                            }}
                            key={index}
                            onClick={()=>{this.setPositionFigures(figure, userGame, position)}}
                        >
                            <div className="board-next-position-point"></div> 
                       </div>
                    })
            }
            else {
                return null;
            }  

    }

    checkEnemyCordinates(x, y, userGame) {
        if(userGame.figuresEnemy.find((figures) => {
            return  y === figures.y && x === figures.x;  
        })) {
            return false;
        }
        else {
            return true;
        }
    }

    setPositionFigures(figure, userGame, position) {
        let setFigure = {
            nameFigure: figure.nameFigure,
            srcImage: figure.srcImage,
            x:  figure.x + position.right,
            y:  figure.y + position.bottom,
            status: true,
        }

        let setFigureForUser = {
            nameFigure: figure.nameFigure,
            srcImage: figure.srcImage,
            x: 525 - (figure.x + position.right),
            y:  525 - (figure.y + position.bottom),
            status: true,
        }

        let indexFigure = userGame.figures.findIndex((figures) => {
            return figure.nameFigure === figures.nameFigure; 
        })

        let indexUserGameInvite = this.props.actuallyGame.gameInvite.findIndex((userSearch) => {
            return userGame.idGame === userSearch.idGame;
        })
    
        let userSet = this.props.gameData.find((user) => {
            return user.idGame === userGame.idGame;
        })

        let indexActuallyUser = userSet.gameInvite.findIndex((userSearch) => {
            return userSearch.idGame === this.props.actuallyGame.idGame;
        })

        let figuresDelete = userGame.figuresEnemy.find((figuresEnemy) => {
            return figuresEnemy.x === setFigure.x && figuresEnemy.y === setFigure.y
        })
        
        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('figures').child(indexFigure).set(setFigure);
        this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('figuresEnemy').child(indexFigure).set(setFigureForUser);
        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('yourMove').set(false);
        this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('yourMove').set(true);
        
        if(figuresDelete) {
            let indexGameData = this.props.gameData.findIndex((userSearch)=> {
                return userGame.idGame === userSearch.idGame;
            })
            let thisFigureDelete = this.props.gameData[indexGameData].gameInvite[indexActuallyUser].figures.find((figures) => {
                return figures.nameFigure === figuresDelete.nameFigure;
            })
            let indexthisFigureDelete = this.props.gameData[indexGameData].gameInvite[indexActuallyUser].figures.findIndex((figures)=> {
                return figures.nameFigure === figuresDelete.nameFigure;
            })
            thisFigureDelete.x = 1000;
            thisFigureDelete.y = 1000;
            thisFigureDelete.status = false;
            this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('figures').child(indexthisFigureDelete).set(thisFigureDelete);
            this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('figuresEnemy').child(indexthisFigureDelete).set(thisFigureDelete);
        }
    }

    checkNextPositionPawn(figure, userGame) {
        let positionNext = [];
        if(!userGame.figures.find((figures) => {
            return figures.y === figure.y + 75 && figures.x === figure.x
        }) &&
        !userGame.figuresEnemy.find((figures) => {
            return figures.y === figure.y + 75 && figures.x === figure.x
        })) {
            positionNext.push({
                        right: 0,
                        bottom: 75,
            })
        }

        if(!figure.firstMove) {
            if(!userGame.figures.find((figures) => {
                return (figures.y === figure.y + 150 && figures.x === figure.x) ||
                       (figures.y === figure.y + 75 && figures.x === figure.x) 
            }) &&
            !userGame.figuresEnemy.find((figures) => {
                return (figures.y === figure.y + 150 && figures.x === figure.x) || 
                       (figures.y === figure.y + 75 && figures.x === figure.x) 
            })) {
                positionNext.push({
                            right: 0,
                            bottom: 150,
                })
            }
        }

        userGame.figuresEnemy.forEach((figuresEnemy) => {
            if(figuresEnemy.y === figure.y + 75 && figuresEnemy.x - 75 === figure.x) {
                positionNext.push({
                    right: 75,
                    bottom: 75,
                })  
             }
             if(figuresEnemy.y === figure.y + 75 && figuresEnemy.x + 75 === figure.x) {
                positionNext.push({
                    right:  -75,
                    bottom: 75,
                })  
             }
        })

        if(positionNext.length !== 0) {
            return positionNext.map((position, index)=> {
                return <div className="board-next-position"
                            style={position}
                            key={index}
                            onClick={()=>{this.setPositionFigurePawn(figure, userGame, position)}}
                       >
                            <div className="board-next-position-point"></div> 
                       </div>
                    })
        }
        else {
            return null;
        }
        
    }

    setPositionFigurePawn(figure, userGame, position) {
        let setPawn = {
                nameFigure: figure.nameFigure,
                srcImage: figure.srcImage,
                x:  figure.x + position.right,
                y:  figure.y + position.bottom,
                firstMove: true,
                status: true,
        }

        let setPawnForUser = {
            nameFigure: figure.nameFigure,
            srcImage: figure.srcImage,
            x: 525 - (figure.x + position.right),
            y:  525 - (figure.y + position.bottom),
            firstMove: true,
            status: true,
        }

        let indexPawn = userGame.figures.findIndex((figures) => {
            return figure.nameFigure === figures.nameFigure; 
        })
        let indexUserGameInvite = this.props.actuallyGame.gameInvite.findIndex((userSearch) => {
            return userGame.idGame === userSearch.idGame;
        })
        
        let userSet = this.props.gameData.find((user) => {
            return user.idGame === userGame.idGame;
        })

        let indexActuallyUser = userSet.gameInvite.findIndex((userSearch) => {
            return userSearch.idGame === this.props.actuallyGame.idGame;
        })

        let figuresDelete = userGame.figuresEnemy.find((figuresEnemy) => {
            return figuresEnemy.x === setPawn.x && figuresEnemy.y === setPawn.y
        })
        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('figures').child(indexPawn).set(setPawn);
        this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('figuresEnemy').child(indexPawn).set(setPawnForUser);
        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('yourMove').set(false);
        if(figure.y + position.bottom === 525) {
            this.setFigure = {
                    setPawn,
                    indexPawn,
                    indexUserGameInvite,
                    userGame,
                    indexActuallyUser,
                    setPawnForUser,
            };
            this.setState({windowSetFigure: true});                    
        }
        else {
            this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('yourMove').set(true);
        }
        if(figuresDelete) {
            let indexGameData = this.props.gameData.findIndex((userSearch)=> {
                return userGame.idGame === userSearch.idGame;
            })
            let thisFigureDelete = this.props.gameData[indexGameData].gameInvite[indexActuallyUser].figures.find((figures) => {
                return figures.nameFigure === figuresDelete.nameFigure;
            })
            let indexthisFigureDelete = this.props.gameData[indexGameData].gameInvite[indexActuallyUser].figures.findIndex((figures)=> {
                return figures.nameFigure === figuresDelete.nameFigure;
            })
            thisFigureDelete.x = 1000;
            thisFigureDelete.y = 1000;
            thisFigureDelete.status = false;
            this.props.databaseGame.child(userGame.idGame).child('gameInvite').child(indexActuallyUser).child('figures').child(indexthisFigureDelete).set(thisFigureDelete);
            this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(indexUserGameInvite).child('figuresEnemy').child(indexthisFigureDelete).set(thisFigureDelete);
        }
    }

    setFigureActually(newFigure) {
        if(newFigure === 'hetman') {
            this.setFigure.setPawn.nameFigure = newFigure + this.setFigure.setPawn.nameFigure.substr(-2);
            this.setFigure.setPawn.srcImage = 'chess-' + newFigure +  this.setFigure.setPawn.srcImage.substr(-6);
            this.setFigure.setPawnForUser.nameFigure =  this.setFigure.setPawn.nameFigure;
            this.setFigure.setPawnForUser.srcImage = this.setFigure.setPawn.srcImage;
        }
        else {
            this.setFigure.setPawn.nameFigure = newFigure + '_pawn' + this.setFigure.setPawn.nameFigure.substr(-2);
            this.setFigure.setPawn.srcImage = 'chess-' + newFigure +  this.setFigure.setPawn.srcImage.substr(-6);
            this.setFigure.setPawnForUser.nameFigure =  this.setFigure.setPawn.nameFigure;
            this.setFigure.setPawnForUser.srcImage = this.setFigure.setPawn.srcImage;

        }

        this.props.databaseGame.child(this.props.actuallyGame.idGame).child('gameInvite').child(this.setFigure.indexUserGameInvite).child('figures').child(this.setFigure.indexPawn).set(this.setFigure.setPawn);
        this.props.databaseGame.child(this.setFigure.userGame.idGame).child('gameInvite').child(this.setFigure.indexActuallyUser).child('figuresEnemy').child(this.setFigure.indexPawn).set(this.setFigure.setPawnForUser);
        this.props.databaseGame.child(this.setFigure.userGame.idGame).child('gameInvite').child(this.setFigure.indexActuallyUser).child('yourMove').set(true);
        this.setState({windowSetFigure: false})
        this.setFigure = null;
    }

    render() {
        return <div className="board">
                    {this.props.showComponent && this.props.visibleGame ?
                        <React.Fragment>
                            <img src={chessBoard}
                                alt={"board"}
                            />
                            {!this.props.actuallyGame.gameInvite ?
                                this.WhenNotPlayerInGame('Zaproś Znajomego Aby Zagrać!', 'board-wait-text')
                                :this.props.actuallyGame.gameInvite.find((userGame) => {
                                    return userGame.statusGame
                                })?
                                    <React.Fragment>
                                        {this.props.actuallyGame.gameInvite.filter((userGame) => {
                                            return userGame.thisGame;
                                        }).map((userGame) => {
                                            if(userGame.colorFigure === 'white') {
                                                return ALPHABET_SCALE.map((alphabet, index) => {
                                                    return this.renderScaleBoard(alphabet, index, 'horizontally');
                                                })
                                            }
                                            else {
                                                return ALPHABET_SCALE.slice().reverse().map((alphabet, index) => {
                                                    return this.renderScaleBoard(alphabet, index, 'horizontally');
                                                })
                                            }

                                                
                                        })}
                                        {this.props.actuallyGame.gameInvite.filter((userGame) => {
                                            return userGame.thisGame;
                                        }).map((userGame) => {
                                            if(userGame.colorFigure === 'white') {
                                                return NUMBER_SCALE.map((numberScale, index) => {
                                                    return this.renderScaleBoard(numberScale, index);
                                                })
                                            }
                                            else {
                                                return NUMBER_SCALE.slice().reverse().map((numberScale, index) => {
                                                    return this.renderScaleBoard(numberScale, index);
                                                })
                                            }   
                                        })}
                                       {this.props.actuallyGame.gameInvite.filter((userGame) => {
                                           return userGame.thisGame;
                                       }).map((userGame) => {
                                           return userGame.figures.map((figure, index) => {
                                               return this.renderFigures(figure, index, '', userGame)
                                           })
                                       })}
                                       {this.props.actuallyGame.gameInvite.filter((userGame) => {
                                           return userGame.thisGame;
                                       }).map((userGame) => {
                                           return userGame.figuresEnemy.map((figure, index) => {
                                               if(figure.status){
                                                return this.renderFigures(figure, index, '-enemy', userGame)
                                               }
                                               else {
                                                   return null;
                                               } 
                                           })
                                       })}
                                       {this.props.actuallyGame.gameInvite.filter((userGame) => {
                                           return userGame.thisGame;
                                       }).map((userGame, index) => {
                                           if(!userGame.yourMove) {
                                               return this.renderWaitOnMoveEnemy(userGame,index);
                                           }
                                           else {
                                               return null;
                                           }
                                       })}
                                       {this.state.windowSetFigure? 
                                        <div className="board-window-set-figures">
                                            <div className="board-window-figure"
                                                 onClick={()=>{this.setFigureActually('hetman')}}
                                            >
                                                <img className="board-window-figure-image"
                                                     src={hetman}
                                                     alt="hetman"   
                                                />
                                            </div>
                                            <div className="board-window-figure"
                                                 onClick={()=>{this.setFigureActually('horse')}}
                                            >
                                                <img className="board-window-figure-image"
                                                     src={horse}
                                                     alt="horse"
                                                />
                                            </div>
                                            <div className="board-window-figure"
                                                 onClick={()=>{this.setFigureActually('tower')}}
                                            >
                                                <img className="board-window-figure-image"
                                                     src={tower}
                                                     alt="tower"
                                                />
                                            </div>
                                            <div className="board-window-figure"
                                                 onClick={()=>{this.setFigureActually('bishop')}}
                                            >
                                                <img className="board-window-figure-image"
                                                     src={bishop}
                                                     alt="bishop"
                                                />
                                            </div>
                                        </div>
                                        :null
                                       }
                                    </React.Fragment>
                                    :this.WhenCheckDecisionPlayers()
                            }
                        </React.Fragment>
                        :null
                    }
                </div>
    }
}

const ALPHABET_SCALE = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G' , 'H'
]

const NUMBER_SCALE = [
    1, 2, 3, 4, 5, 6, 7, 8
]

const POSITION_HORSE = [
    {
        x: -150,
        y: 75,
    },
    {
        x: -150,
        y: -75,
    },
    {
        x: 150,
        y: 75,
    },
    {
        x: 150,
        y: -75,
    },
    {
        x: -75,
        y: 150,
    },
    {
        x: 75,
        y: 150,
    },
    {
        x: -75,
        y: -150,
    },
    {
        x: 75,
        y: -150,
    },
    
]
