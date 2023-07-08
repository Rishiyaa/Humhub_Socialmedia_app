import React, { Component } from 'react';
import "../LoginPage/LoginPage.css"
import "../SignIn/SignIN.css"
import firebase from 'firebase';
import { storage, auth } from "../firebase";

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            emailError: '',
            passwordError: ''
        }
    }

    validate = () => {
        let emailError = '';
        let passwordError = '';

        if (!this.state.emailId) {
            emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(this.state.emailId)) {
            emailError = 'Invalid email address';
        }

        if (!this.state.password) {
            passwordError = 'Password is required';
        } else if (this.state.password.length < 6) {
            passwordError = 'Password must be at least 6 characters long';
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }

        return true;
    };

    login = () => {
        if (this.validate()) {
            auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    localStorage.setItem("users", JSON.stringify(user));
                    window.location.reload();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }

    googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((userCredential) => {
                // Signed in with Google
                const user = userCredential.user;

                let payload = {
                    "userId": user.uid,
                    "userName": user.displayName,
                    "name": user.displayName,
                    "profileImage": user.photoURL
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

                    });

            })
            .catch((error) => {
                // Handle errors here
            });
    }

    render() {
        return (
            <div>
                <input className="logipage__text" onChange={(event) => { this.setState({ emailId: event.currentTarget.value }) }} type="text" placeholder="Phone number, username, or email" />
                <div className='error'>{this.state.emailError}</div>
                <input className="logipage__text" onChange={(event) => { this.setState({ password: event.currentTarget.value }) }} type="password" placeholder="Password" />
                <div className='error'>{this.state.passwordError}</div>
                <button className="login__button" onClick={this.login}>Log In</button>

                <button className="login__button" onClick={this.googleLogin}>Log In with Google</button>
            </div>
        );
    }
}

export default SignIN;
