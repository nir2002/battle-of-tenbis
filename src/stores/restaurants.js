import { decorate, observable, action, computed } from "mobx";
import { getRestaurantsData } from "../api";

class Restaurants {
  data = [];
  fetching = false;

  constructor() {
    this.fetchRestaurantsData();
  }

  fetchRestaurantsData() {
    this.fetching = true;
    getRestaurantsData().then(data => {
      this.data = data;
      this.fetching = false;
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

  get restaurantsNames() {
    return this.data.map(restaurant => restaurant.name);
  }
}

decorate(Restaurants, {
  data: observable,
  fetching: observable,
  fetchRestaurantsData: action,
  whiteListRestaurants: computed,
  blackListRestaurants: computed,
  restaurantsNames: computed
});

export default new Restaurants();
