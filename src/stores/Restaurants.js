import { decorate, observable, action, computed } from "mobx";
import { getRestaurantsData } from "./../api";

class Restaurants {
  data = [];

  fetchRestaurantsData() {
    getRestaurantsData().then(data => {
      this.data = data;
    });
  }

  get restaurants() {
    return this.data;
  }

  get whiteListRestaurants() {
    return this.data.filter(restaurant => restaurant.decision === "white");
  }

  get blackListRestaurants() {
    return this.data.filter(restaurant => restaurant.decision === "black");
  }
}

decorate(Restaurants, {
  data: observable,
  fetchRestaurantsData: action,
  whiteListRestaurants: computed,
  blackListRestaurants: computed
});

export default Restaurants;
