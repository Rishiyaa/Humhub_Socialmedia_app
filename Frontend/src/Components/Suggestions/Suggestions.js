import React, { Component } from 'react';
import "./Suggestions.css"
import { Avatar } from '@material-ui/core';
import imageSrc1 from '../../images/pp1.png'
import imageSrc2 from '../../images/pp2.png'
import imageSrc3 from '../../images/pp3.jpeg'

class Suggestions extends Component {   
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
      <div className="suggestions__container">
        <div className="suggestions__header">
          <br/>
          <br/>
          <div>Suggestions For You</div>
        </div>
        <div className="suggestions__body">
          <div className="suggestions__friends">
            <Avatar src={imageSrc1} className="suggestions__image" />
            <div className="suggestions__username">Yasiru</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
          <div className="suggestions__friends">
            <Avatar src={imageSrc2} className="suggestions__image" />
            <div className="suggestions__username">Nethmini</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
          <div className="suggestions__friends">
            <Avatar src={imageSrc3} className="suggestions__image" />
            <div className="suggestions__username">Kasun</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
          <div className="suggestions__friends">
            <Avatar src={imageSrc2} className="suggestions__image" />
            <div className="suggestions__username">Sewwandi</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
          <div className="suggestions__friends">
            <Avatar src={imageSrc3} className="suggestions__image" />
            <div className="suggestions__username">Gayan</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
          <div className="suggestions__friends">
            <Avatar src={imageSrc1} className="suggestions__image" />
            <div className="suggestions__username">Muniya</div>
            <button className="suggestions__follow-button">Follow</button>
          </div>
        </div>
      </div>
    </div>
            );
    }
}
 
export default Suggestions;