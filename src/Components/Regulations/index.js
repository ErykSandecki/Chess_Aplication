import './index.css';
import React, { Component } from 'react';
import {regulations} from '../../Resources/regulations.js';

export default class Regulations extends Component {
    constructor() {
        super();
        this.state = {
            styleRegular: 'none',
            styleRegulationsBackground: 0,
            styleRegulationsTable: 0,
        }
        this.showRegular = this.showRegular.bind(this);
        this.hideRegular = this.hideRegular.bind(this);
    }
    
    componentWillReceiveProps() {
        setTimeout(()=>{
            if(this.props.vissibleRegular) {
                this.showRegular();
            }
        },1);
    }

    showRegular() {
        this.setState({styleRegular : "block"});
        setTimeout(()=> {
            this.setState({styleRegulationsBackground: 0.7});
            setTimeout(() => {
                this.setState({styleRegulationsTable: 1});
            },500);    
        },100);
    }

    hideRegular() {
        this.setState({styleRegulationsTable: 0});
        setTimeout(()=> {
            this.setState({styleRegulationsBackground: 0});
            setTimeout(() => {
                this.setState({styleRegular: "none"});
            },500);
            this.props.hideRegulatSection();    
        },500);
    }
    
    componentDidMount() {
        let selector = document.getElementsByClassName("text-regulations");
        for(let i = 0; i < selector.length; i++) {
            if(selector[i].innerHTML.charAt(0) === "§") {
                selector[i].style.fontSize="18px";
                selector[i].style.fontWeight="bold";
                selector[i].style.textAlign="center";
                selector[i].style.marginTop="10px";
            }
            // eslint-disable-next-line
            else if(parseInt(selector[i].innerHTML.charAt(0)) > 0) {
                selector[i].style.marginLeft="15px";
            }
            else {
                selector[i].style.marginLeft="25px";
            }
        }
    }
    render() {
        const styleRegulations={display: this.state.styleRegular};
        const styleRegulatiosBackground={opacity: this.state.styleRegulationsBackground};
        const styleRegulationsTable={opacity: this.state.styleRegulationsTable};
        return(
            <div className="regulations" 
                 style={styleRegulations}
                 onClick={this.hideRegular}>
            <div className="regulations-background" style={styleRegulatiosBackground}/>
              <div className="regulations-table" style={styleRegulationsTable}>
                <div className="regulations-title">REGULAMIN</div>
                <div className="regulations-regular-text">
                    {regulations.map(function(reg, index){
                        return <p key={index} className="text-regulations">{reg}</p>
                    })}
                </div>
                <div className="regulations-exit" onClick={this.hideRegisterLogin}>
                    <span>WYJŚCIE</span>   
                    <span className="glyphicon glyphicon-remove regulations-remove"/>                
                </div> 
              </div>
            </div>
        )
    }
}