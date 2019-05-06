import React, { Component } from 'react'
var firebase = require('firebase/app');
require("firebase/auth");

    var firebaseConfig = {
        apiKey: "AIzaSyBIcLV4QyRSQk04eabdySZGt-SdEdTEvIw",
        authDomain: "cmpe-275-open-hack.firebaseapp.com",
        databaseURL: "https://cmpe-275-open-hack.firebaseio.com",
        projectId: "cmpe-275-open-hack",
        storageBucket: "cmpe-275-open-hack.appspot.com",
        messagingSenderId: "722197382416"
    };

        firebase.initializeApp(firebaseConfig);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("Current User", user);
                } else {
                    console.log("No user");
                }
        });

        var signUpWithGoogle=()=>{
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {

            var token = result.credential.accessToken;
            var user = result.user;
            console.log("Success...",result);
            }).catch(function(error) {
            console.log("Error..", error)
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            });
        }



        function signUpWithFacebook(){
            console.log("In Facebook method")
            var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    console.log("Success...",result);
                }).catch(function(error) {
                    console.log("Error..", error)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                });
        }

        var signout =()=>{
            firebase.auth().signOut().then(function() {
                console.log("Sign-out successful")
            }).catch(function(error) {
                console.log("An error happened in signout", error)
            });
        }

        var signUpWithCredentials= ()=>{
            firebase.auth().createUserWithEmailAndPassword("v810460@nwytg.net","abcdef").then(user=>{
                console.log(user);
                sendVerificationEmail();
            })

        }

        var loginWithCredentials =()=>{
            firebase.auth().signInWithEmailAndPassword("v810460@nwytg.net","abcdef").then(user=>{
                console.log(user);
            })
        }

        var sendVerificationEmail =()=>{
            var curr = firebase.auth().currentUser;
            console.log("curr ...",curr);
            if(curr && !curr.emailVerified){
            curr.sendEmailVerification().then(function() {
              window.alert(" Email sent.")
            }).catch(function(error) {
              console.log(error)
            });
            }else{
                console.log("No user found");
            }
        }

        var isUserVerified =()=>{
            var curr = firebase.auth().currentUser;
            console.log(curr.emailVerified,"/.............");   
            console.log(curr)
            return curr.emailVerified;
        }


        export default class Firebase extends Component {
            constructor(props){
            super(props);

            // Set the state directly. Use props if necessary.
        }

        render() {
            return(
            <div>
                <div >
                <button className="fa fa-facebook" onClick={signUpWithFacebook} > Log in with Facebook </button>
                </div><br></br>
                <div >
                <button className="googlebutton" onClick={signUpWithGoogle} > Log in with Google </button>
                </div> <br></br>
                <div >
                <button className="googlebutton" onClick={signout} > Sign Out </button>
                </div> <br></br>
                <button className="googlebutton" onClick={signUpWithCredentials} > Sign Up with credential </button>
                <button className="googlebutton" onClick={loginWithCredentials} > Login with credential </button>
                <button className="googlebutton" onClick={sendVerificationEmail} > Send Verification Mail </button>
                <button className="googlebutton" onClick={isUserVerified} > Check for Validation </button>
                <p>Email is verified : </p>
            </div>
            )
         }
}
