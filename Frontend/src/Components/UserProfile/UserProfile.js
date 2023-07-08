import React, { Component } from 'react';
import './UserProfile.css';
import { Avatar } from '@material-ui/core';
import imageSrc1 from '../../images/pp1.png';
import imageSrc2 from '../../images/pp2.png';
import imageSrc3 from '../../images/pp3.jpeg';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userData: null
    };
  }

  componentDidMount() {
    // retrieve user data from MySQL database using the userId of the logged-in user
    const userId = JSON.parse(localStorage.getItem("users")).uid;
    fetch(`http://localhost:8080/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ userData: data });
        })
        .catch(error => {
            console.log(error);
        });
}



  render() {
    return (
      <div>
        <div className="user_profile">
            <div>Profile</div>
            {this.state.userData && 
            <div className="info__container">
                
                <div className="info_content">
                    <div className="info_username">{this.state.userData.userName}</div>
                    <div className="info_description">{this.state.userData.gender}</div>
                    <div className="info_description">{this.state.userData.birthday}</div>
                    <div className="info_description">{this.state.userData.city}</div>
                    
                </div>
            </div>}
         
         
        </div>
      </div>
    );
  }
}

export default UserProfile;
