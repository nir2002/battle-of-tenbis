import React from "react";
// import { inject, observer } from "mobx-react";
import { connect } from "react-redux";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchRestaurantsData } from "./../../actions/restaurants";

class Restaurants extends React.Component {
  componentDidMount() {
    // const { restaurantsStore } = this.props;
    // restaurantsStore.fetchRestaurantsData();
    this.props.fetchRestaurantsData();
  }

  render() {
    // const { restaurantsStore } = this.props;
    const { fetching, whiteListRestaurants, blackListRestaurants } = this.props;

    return (
      <section style={{ marginTop: 50 }}>
        <Typography
          variant="h6"
          color="inherit"
          style={{ textAlign: "center", marginBottom: 50 }}
        >
          Resatuarnts
        </Typography>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {fetching ? (
            <CircularProgress color="secondary" size={50} />
          ) : (
            <Table
              color="white"
              rows={[
                {
                  label: "Name",
                  value: data => data.name
                },
                {
                  label: "Voters",
                  value: data => data.voters.map(voter => voter.name).join(", ")
                }
              ]}
              data={whiteListRestaurants}
            />
          )}
          {fetching ? (
            <CircularProgress color="secondary" size={50} />
          ) : (
            <Table
              color="black"
              rows={[
                {
                  label: "Name",
                  value: data => data.name
                },
                {
                  label: "Voters",
                  value: data => data.voters.map(voter => voter.name).join(", ")
                }
              ]}
              data={blackListRestaurants}
            />
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.restaurants.fetching,
    whiteListRestaurants: state.restaurants.whiteListRestaurants,
    blackListRestaurants: state.restaurants.blackListRestaurants
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRestaurantsData: () => {
    dispatch(fetchRestaurantsData());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurants);

// export default inject("restaurantsStore")(observer(Restaurants));
