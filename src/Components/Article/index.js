import React, { Component } from 'react';

import learn from '../../Images/learn-to-play.png';
import ranking from '../../Images/ranking.png';
import tournament from '../../Images/tournament.png';

import './style.css';

export default class Article extends Component {
    render() {
        return(
            <div className="article">
                <p className="col-xs-12 article-main-text">Wszystko czego potrzebujesz, aby zacząć grać w szachy</p>
                <div className="article-option">
                    <div className="col-xs-12 col-md-4 article-section">
                        <img src={learn} alt="learn"/>
                        <p className="article-text-title-option">UCZ SIĘ GRAĆ</p>
                        <p className="article-text-option">Zapoznaj się z zasadmi - pokażemy Ci, jak się poruszają pionki, przejrzyj kluczowe ruchy, które powinieneś przemyśleć. Wszystko tu masz nawet jako niedoświadczony szachista.</p>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Ucz się grać</span>
                        </div>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Graj Online</span>
                        </div>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Graj z Komputerem</span>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4 article-section">
                        <img src={tournament} alt="tournament"/>
                        <p className="article-text-title-option">TURNIEJE ANALIZA</p>
                        <p className="article-text-option">Weź udział w turniejach między narodowych organizowanych każdego roku! Sprawdź swoje umiejętności i wygraj tytuł mistrza!</p>                    
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Lista Turnieji</span>
                        </div>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Kolejny Turniej</span>
                        </div>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Zasady Turnieju</span>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4 article-section">
                        <img src={ranking} alt="ranking"/>
                        <p className="article-text-title-option">RANKING</p>
                        <p className="article-text-option">Sprawdź swój obecny ranking! Wspinaj się jak najwyżej, osiągaj wysoki poziom i pokaż umiejętności całemu Światu!</p>  
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Ranking Osób</span>
                        </div>
                        <div className="article-check-options">
                            <span className="article-text glyphicon glyphicon-chevron-right"></span>
                            <span className="article-text">Analiza Rozgrywek</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 