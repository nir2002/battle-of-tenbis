const initialState = {
  data: [],
  whiteListRestaurants: [],
  blackListRestaurants: [],
  restaurantsNames: [],
  fetching: false
};

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RESTAURANTS":
      return {
        ...state,
        fetching: true
      };
    case "LOAD_RESTAURANTS":
      return {
        ...state,
        fetching: false,
        data: action.data,
        whiteListRestaurants: action.data.filter(
          restaurant => restaurant.decision === "white"
        ),
        blackListRestaurants: action.data.filter(
          restaurant => restaurant.decision === "black"
        ),
        restaurantsNames: action.data.map(restaurant => restaurant.name)
      };
    default:
      return state;
  }
};

export default restaurants;
