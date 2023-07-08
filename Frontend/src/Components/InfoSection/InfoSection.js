import React, { Component } from 'react';
import "./InfoSection.css";
import { Avatar } from '@material-ui/core';
import imageSrc from "../../images/pp1.png"
import { auth, storage } from "../firebase";

const user = auth.currentUser;
class InfoSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImageFile: null
        }
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

    handleLogout = () => {
        localStorage.removeItem("users");
        window.location.reload();
    }

    handleDeleteAccount = () => {
        const userId = JSON.parse(localStorage.getItem("users")).uid;
        fetch(`http://localhost:8080/users/${userId}`, {
            method: 'DELETE'
        })
            .then(() => {
                this.handleLogout();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleProfileImageChange = (event) => {
        if (event.target.files[0]) {
            this.setState({ profileImageFile: event.target.files[0] });
        }
    }

    handleProfileImageUpload = () => {
        const userId = JSON.parse(localStorage.getItem("users")).uid;
        const uploadTask = storage.ref(`profileImages/${userId}`).put(this.state.profileImageFile);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("profileImages").child(userId).getDownloadURL().then(url => {
                    // Update the profileImage field in the database with the new URL
                    fetch(`http://localhost:8080/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            profileImage: url
                        })
                    })
                        .then(() => {
                            // Update the state with the new URL
                            const userDataCopy = Object.assign({}, this.state.userData);
                            userDataCopy.profileImage = url;
                            this.setState({ userData: userDataCopy });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
            }
        )

        window.location.reload();
    }

    render() {
        return (
            <div>
                {this.state.userData &&
                    <div className="info__container">
                        <Avatar src={this.state.userData.profileImage || imageSrc} className="info__image" />
                        <div className="info_content">
                            <br/>
                            <div className="info_username">{this.state.userData.userName}</div>
                            <div className="info_description">{this.state.userData.description}</div>
                            <input type="file" onChange={this.handleProfileImageChange} />
                            <div>
                            <button onClick={this.handleProfileImageUpload}>Change Profile Image</button>
                                <br/>

                            <button onClick={this.handleLogout}>Logout</button>
                                <br/>

                            <button onClick={this.handleDeleteAccount}>Delete Account</button>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default InfoSection;
