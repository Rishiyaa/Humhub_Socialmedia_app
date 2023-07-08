import React, { Component } from 'react';
import "./SignUp.css";
import { storage, auth } from "../firebase";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            name: '',
            userName: '',
            password: '',
            emailError: '',
            nameError: '',
            userNameError: '',
            passwordError: '',
            emailExistsError: '',
            userNameExistsError: ''
        }
    }

    validate = () => {
        let emailError = '';
        let nameError = '';
        let userNameError = '';
        let passwordError = '';

        if (!this.state.emailId) {
            emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(this.state.emailId)) {
            emailError = 'Invalid email address';
        }

        if (!this.state.name) {
            nameError = 'Full Name is required';
        }

        if (!this.state.userName) {
            userNameError = 'Username is required';
        }

        if (!this.state.password) {
            passwordError = 'Password is required';
        } else if (this.state.password.length < 6) {
            passwordError = 'Password must be at least 6 characters long';
        }

        if (emailError || nameError || userNameError || passwordError) {
            this.setState({ emailError, nameError, userNameError, passwordError });
            return false;
        }

        return true;
    };

    checkEmailExists = () => {
        // Simulating email existence check
        const existingEmail = 'test@example.com'; // Replace with your existing email check logic

        if (this.state.emailId === existingEmail) {
            this.setState({ emailExistsError: 'Email is already in use' });
            return false;
        }

        return true;
    };

    checkUserNameExists = () => {
        // Simulating username existence check
        const existingUserName = 'testuser'; // Replace with your existing username check logic

        if (this.state.userName === existingUserName) {
            this.setState({ userNameExistsError: 'Username is already in use' });
            return false;
        }

        return true;
    };

    newSignUp = () => {
        if (this.validate() && this.checkEmailExists() && this.checkUserNameExists()) {
            auth.createUserWithEmailAndPassword(this.state.emailId, this.state.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;

                    let payload = {
                        "userId": user.uid,
                        "userName": this.state.userName,
                        "name": this.state.name,
                        "profileImage": ""
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/users", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem("users", JSON.stringify(user));
                            window.location.reload();
                        })
                        .catch(error => {

                        })

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
        }
    }

    render() {
        return (
            <div>
                <input className="logipage__text" onChange={(event) => { this.setState({ emailId: event.currentTarget.value }) }} type="text" placeholder="Mobile number or Email" />
                <div className='error'>{this.state.emailError}</div>
                <div className='error'>{this.state.emailExistsError}</div>

                <input className="logipage__text" onChange={(event) => { this.setState({ name: event.currentTarget.value }) }} type="text" placeholder="Full Name" />
                <div className='error'>{this.state.nameError}</div>

                <input className="logipage__text" onChange={(event) => { this.setState({ userName: event.currentTarget.value }) }} type="text" placeholder="Username" />
                <div className='error'>{this.state.userNameError}</div>
                <div className='error'>{this.state.userNameExistsError}</div>

                <input className="logipage__text" onChange={(event) => { this.setState({ password: event.currentTarget.value }) }} type="password" placeholder="Password" />
                <div className='error'>{this.state.passwordError}</div>

                <button className="login__button" onClick={this.newSignUp}>Sign up</button>
            </div>
        );
    }
}

export default SignUp;
