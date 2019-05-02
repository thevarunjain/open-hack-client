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
console.log("Current User", user)
} else {
console.log("Error")
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



function facebook(){
console.log("In Facebook methond")
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
// ...
});
}

var signout =()=>{
firebase.auth().signOut().then(function() {
console.log("Sign-out successful")
}).catch(function(error) {
console.log("An error happened in signout", error)
});
}

var create = ()=>{

firebase.auth().createUserWithEmailAndPassword("bargemayur05@gmail.com","abcdef").then(user=>{
console.log(user);
})

}

var login =()=>{
firebase.auth().signInWithEmailAndPassword("varunsj18@gmail.com","abcdef").then(user=>{
console.log(user);
})
}
var send =()=>{


var curr = firebase.auth().currentUser;
console.log("curr ...",curr);
if(!curr.emailVerified){
curr.sendEmailVerification().then(function() {
window.alert(" Email sent.")
}).catch(function(error) {
console.log(error)
});
}

}

var check =()=>{
var curr = firebase.auth().currentUser;
console.log(curr.emailVerified,"/.............");
console.log(curr)
curr.updateProfile({
displayName: "Jane Q. User",
photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
console.log(curr)
}).catch(function(error) {
// An error happened.
});

}


export default class Firebase extends Component {
constructor(props){
super(props);

// Set the state directly. Use props if necessary.
}
render() {
return (
<div>
<div >
<button className="fa fa-facebook" onClick={facebook} > Log in with Facebook </button>
</div><br></br>
<div >
<button className="googlebutton" onClick={signUpWithGoogle} > Log in with Google </button>
</div> <br></br>
<div >
<button className="googlebutton" onClick={signout} > Sign Out </button>
</div> <br></br>
<button className="googlebutton" onClick={create} > create </button>
<button className="googlebutton" onClick={login} > login </button>
<button className="googlebutton" onClick={send} > verify </button>
<button className="googlebutton" onClick={check} > check </button>
<p>Email is verified : </p>
</div>
)
}
}
