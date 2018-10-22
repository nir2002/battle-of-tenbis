const initialState = {
  currentUser: null,
  userVotes: [],
  fetchingVotes: true
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SIGNED_IN":
      return {
        ...state,
        currentUser: action.data
      };
    case "USER_SIGNED_OUT":
      return {
        ...state,
        currentUser: null
      };
    case "FETCH_USER_VOTES":
      return {
        ...state,
        fetchingVotes: true
      };
    case "LOAD_USER_VOTES":
      return {
        ...state,
        fetchingVotes: false,
        userVotes: action.userVotes
      };

    default:
      return state;
  }
};

export default users;
