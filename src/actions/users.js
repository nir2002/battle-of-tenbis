import firebase from "firebase/app";
import { getRestaurantsData, getAuthenticatedUserVotes, vote } from "./../api";

const fetchUserVotesData = () => dispatch => {
  getRestaurantsData()
    .then(restaurants => {
      return restaurants.map(restaurant => restaurant.name);
    })
    .then(restaurantsNames => {
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
        dispatch(loadUserVotes(userVotesData));
      });
    });
};

export const fetchUserVotes = () => dispatch => {
  dispatch(fetchUserVotesData());
  dispatch({ type: "FETCH_USER_VOTES" });
};

export const loadUserVotes = data => ({
  type: "LOAD_USER_VOTES",
  userVotes: data
});

export const voteOnRestaurant = (restaurantId, userVote) => dispatch => {
  vote(restaurantId, userVote).then(() => {
    dispatch(fetchUserVotes(dispatch));
  });
};

const signIn = user => ({
  type: "USER_SIGNED_IN",
  data: user
});

const signOut = () => ({
  type: "USER_SIGNED_OUT"
});

export const initAuthCallback = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      const currentUser = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        uid: user.uid,
        providerData: user.providerData
      };

      dispatch(signIn(currentUser));
      // this.fetchUserVotes();
    } else {
      dispatch(signOut());
    }
  });
};
