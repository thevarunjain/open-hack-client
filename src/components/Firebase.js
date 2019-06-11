import React, { Component } from "react";
var firebase = require("firebase/app");
require("firebase/auth");

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log("Current User", user);
//   } else {
//     console.log("No user", user);
//   }
//   return user ? user : null;
// });

export var signUpWithGoogle = () => {
  console.log("In google method");

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("Success...", result);
    })
    .catch(function(error) {
      console.log("Error..", error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

export function signUpWithFacebook() {
  console.log("In Facebook method");
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("Success...", result);
    })
    .catch(function(error) {
      console.log("Error..", error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}

export var signoutFirebase = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Sign-out successful");
    })
    .catch(function(error) {
      console.log("An error happened in signout", error);
    });
};

export var signUpWithCredentials = (email, password) => {
  console.log("In Firebase SignUp");
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      sendVerificationEmail();
      return user;
    })
    .catch(function(error) {
      console.log(error);
      window.alert(error.message);
    });
};

export var loginWithCredentials = (email, password) => {
  console.log("Firebase login", email, password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(function(error) {
      console.log(error);
      window.alert(error.message);
    });
};

export var sendVerificationEmail = () => {
  var curr = firebase.auth().currentUser;
  console.log("curr ...", curr);
  if (curr && !curr.emailVerified) {
    curr
      .sendEmailVerification()
      .then(function() {
        console.log("Verification Mail has been sent");
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    console.log("No user found");
  }
};

export var isUserVerified = (user) => {
  return user ? user.emailVerified : false;
};

export var getFirebaseUser = () => {
  return firebase.auth().currentUser;
};

class Firebase extends Component {
  constructor(props) {
    super(props);

    // Set the state directly. Use props if necessary.
  }

  render() {
    return <div />;
  }
}
export default Firebase;
