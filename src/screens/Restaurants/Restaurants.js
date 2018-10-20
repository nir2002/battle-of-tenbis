import React from "react";
import { inject, observer } from "mobx-react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class Restaurants extends React.Component {
  componentDidMount() {
    const { restaurantsStore } = this.props;
    restaurantsStore.fetchRestaurantsData();
  }

  render() {
    const { restaurantsStore } = this.props;

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
          {restaurantsStore.fetching ? (
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
              data={restaurantsStore.whiteListRestaurants}
            />
          )}
          {restaurantsStore.fetching ? (
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
              data={restaurantsStore.blackListRestaurants}
            />
          )}
        </div>
      </section>
    );
  }
}

export default inject("restaurantsStore")(observer(Restaurants));
