import React, { Component } from 'react';
import './EditUser.css';
import { Avatar } from '@material-ui/core';
import imageSrc1 from '../../images/pp1.png';
import imageSrc2 from '../../images/pp2.png';
import imageSrc3 from '../../images/pp3.jpeg';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: ''
        };
    }

    componentDidMount() {
        // retrieve user data from MySQL database using the userId of the logged-in user
        const userId = JSON.parse(localStorage.getItem("users")).uid;
        fetch(`http://localhost:8080/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ userData: data });
                console.log(this.state.userData)
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            userData: { ...prevState.userData, [name]: value }
        }));
    };

    handleSubmit = (event) => {
        const userId = JSON.parse(localStorage.getItem("users")).uid;
        event.preventDefault();
        fetch(`http://localhost:8080/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => console.error(error));
    };

    handleClear = () => {
        this.setState({
            userData: {
                userName: '',
                birthday: '',
                city: '',
                gender: ''
            }
        });
    };

    render() {
        return (
            <div>
                <div className="edit_profile">
                    <div className="profile__header">
                        <br/>
                        <br/>
                        <div>Profile</div>
                    </div>
                    <div className="form">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="userName"
                                    defaultValue={this.state.userData.userName}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Birthday:
                                <input
                                    type="date"
                                    name="birthday"
                                    defaultValue={this.state.userData.birthday}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                City:
                                <input
                                    type="text"
                                    name="city"
                                    defaultValue={this.state.userData.city}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <br />
                            <div>
                                <label>
                                    Gender:
                                    <br/>
                                    <select
                                        name="gender"
                                        value={this.state.userData.gender}
                                        onChange={this.handleChange}
                                        className="info_select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <br />
                            <input type="submit" value="Update" />
                            <br/>
                            <div>
                                <button type="button" onClick={this.handleClear}>Clear Information</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditUser;
