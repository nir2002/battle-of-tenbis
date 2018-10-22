import { combineReducers } from "redux";
import restaurants from "./restaurants";
import users from "./users";

export default combineReducers({
  restaurants,
  users
});
