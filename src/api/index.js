import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

export function initalizeFirebase() {
  const config = {
    apiKey: "AIzaSyA88JgDDOlIbt9YsgxpTWIKBjtIcA1p0A4",
    authDomain: "the-battle-of-tenbis.firebaseapp.com",
    databaseURL: "https://the-battle-of-tenbis.firebaseio.com",
    projectId: "the-battle-of-tenbis",
    storageBucket: "the-battle-of-tenbis.appspot.com",
    messagingSenderId: "68857906130"
  };

  firebase.initializeApp(config);
}

export function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log("Error: ", errorCode, errorMessage, email, credential);
    });
}

export function signOut() {
  firebase.auth().signOut();
}

export function getRestaurants() {
  const resturantsRef = firebase.database().ref("/restaurants/");

  return resturantsRef.once("value").then(snapshot => {
    const result = [];
    snapshot.forEach(childSnapshot => {
      result.push(childSnapshot.key);
    });
    return result;
  });
}

export function getAuthenticatedUserVotes() {
  const userId = firebase.auth().currentUser.uid;
  const usersRef = firebase.database().ref("/users/");

  return usersRef.once("value").then(snapshot => {
    const userVotes = {};
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.key === userId) {
        childSnapshot.forEach(vote => {
          userVotes[vote.key] = vote.val();
        });
      }
    });

    return userVotes;
  });
}

export function getRestaurantVotes(restaurantId) {
  const resturantsRef = firebase.database().ref("/restaurants/");

  return resturantsRef.once("value").then(snapshot => {
    const result = {};
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.key === restaurantId) {
        childSnapshot.forEach(vote => {
          result[vote.key] = vote.val();
        });
      }
    });
    return result;
  });
}

export function vote(restaurantId, vote) {
  const userId = firebase.auth().currentUser.uid;
  return Promise.all([
    firebase
      .database()
      .ref("users/" + userId)
      .update({
        [restaurantId]: vote
      }),
    firebase
      .database()
      .ref("restaurants/" + restaurantId + "/" + userId)
      .update({
        name: firebase.auth().currentUser.displayName,
        vote
      })
  ]);
}
