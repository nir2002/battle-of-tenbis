import { decorate, observable, action, computed } from "mobx";
import { getAuthenticatedUserVotes, vote } from "../api";
// import restaurantsStore from "./restaurants";
import firebase from "firebase/app";

class Users {
  currentUser = null;
  fetchingVotes = true;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.currentUser = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData
        };
        this.fetchUserVotes();
      } else {
        this.currentUser = null;
      }
    });
  }

  fetchUserVotes() {
    this.fetchingVotes = true;

    getAuthenticatedUserVotes().then(userVotes => {
      const userVotesData = [];
      const restaurantsNames = Object.keys(userVotes);
      restaurantsNames.forEach((restaurant, index) => {
        const userVote = {
          id: index,
          name: restaurant,
          vote: null
        };
        if (userVotes[restaurant]) {
          userVote.vote = userVotes[restaurant];
        }
        userVotesData.push(userVote);
      });

      this.currentUser.votes = userVotesData;
      this.fetchingVotes = false;
    });
  }

  vote(restaurantId, userVote) {
    vote(restaurantId, userVote).then(() => {
      this.fetchUserVotes();
    });
  }

  get userVotes() {
    return this.currentUser && this.currentUser.votes;
  }
}

decorate(Users, {
  currentUser: observable,
  fetchingVotes: observable,
  userVotes: computed,
  fetchUserVotes: action,
  vote: action
});

export default new Users();
