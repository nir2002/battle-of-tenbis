import React from "react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import { getRestaurantsData } from "./../../api";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Restaurants extends React.Component {
  state = {
    whiteListRestaurants: [],
    blackListRestaurants: []
  };

  componentDidMount() {
    getRestaurantsData().then(data => {
      this.setState({
        whiteListRestaurants: data.filter(
          restaurant => restaurant.decision === "white"
        ),
        blackListRestaurants: data.filter(
          restaurant => restaurant.decision === "black"
        )
      });
    });
  }

  render() {
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
          {this.state.whiteListRestaurants.length === 0 ? (
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
              data={this.state.whiteListRestaurants}
            />
          )}
          {this.state.blackListRestaurants.length === 0 ? (
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
              data={this.state.blackListRestaurants}
            />
          )}
        </div>
      </section>
    );
  }
}
