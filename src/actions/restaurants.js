import { getRestaurantsData } from "./../api";

export const fetchRestaurantsData = () => dispatch => {
  dispatch({
    type: "FETCH_RESTAURANTS"
  });
  getRestaurantsData().then(data => {
    dispatch(loadRestaurantsData(data));
  });
};

export const loadRestaurantsData = data => ({
  type: "LOAD_RESTAURANTS",
  data
});
