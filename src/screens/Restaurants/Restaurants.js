import React from 'react';
import { inject, observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import RestaurantList from '../../components/RestaurantsList';
import { withStyles } from '@material-ui/core';

class Restaurants extends React.Component {
  componentDidMount() {
    const { restaurantsStore } = this.props;
    restaurantsStore.fetchRestaurantsData();
  }

  render() {
    const { restaurantsStore, classes } = this.props;

    return (
      <section className={classes.root}>
        <Typography variant="h3" color="inherit" className={classes.title}>
          Resatuarnts
        </Typography>

        <div className={classes.restaurantsLists}>
          {restaurantsStore.fetching ? (
            <CircularProgress color="secondary" size={100} />
          ) : (
            <React.Fragment>
              <RestaurantList
                title="White List"
                color="white"
                data={restaurantsStore.whiteListRestaurants}
              />
              <RestaurantList
                title="Black List"
                color="black"
                data={restaurantsStore.blackListRestaurants}
              />
            </React.Fragment>
          )}
        </div>
      </section>
    );
  }
}

const connectedRestaurants = inject('restaurantsStore')(observer(Restaurants));

const styledConnectedRestaurants = withStyles({
  root: {
    marginTop: 50
  },
  title: {
    textAlign: 'center',
    marginBottom: 50
  },
  restaurantsLists: {
    display: 'flex',
    justifyContent: 'space-around'
  }
})(connectedRestaurants);

export default styledConnectedRestaurants;
