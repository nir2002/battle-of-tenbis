import { decorate, observable, action, computed, when } from "mobx";
import { getAuthenticatedUserVotes, vote } from "../api";
import restaurantsStore from "./restaurants";
import firebase from "firebase/app";

class Users {
  currentUser = null;
  fetchingVotes = true;

  constructor() {
    when(
      () => restaurantsStore.data.length > 0,
      () => {
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
    );
  }

  fetchUserVotes() {
    this.fetchingVotes = true;

    const restaurantsNames = restaurantsStore.restaurantsNames;

    getAuthenticatedUserVotes().then(userVotes => {
      const userVotesData = [];
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
  fetchUserVotes: action,
  vote: action,
  userVotes: computed
});

export default new Users();
