import React from "react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { getRestaurants, getAuthenticatedUserVotes, vote } from "./../../api";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class MyVotes extends React.Component {
  state = {
    userVotes: []
  };

  componentDidUpdate() {
    getRestaurants().then(restaurants => {
      getAuthenticatedUserVotes().then(userVotes => {
        const userVotesData = [];
        restaurants.forEach((restaurant, index) => {
          const userVote = {
            id: index,
            name: restaurant,
            vote: null
          };
          if (userVotes[restaurant]) {
            userVote.vote = userVotes[restaurant];
          }
          userVotesData.push(userVote);
        });

        this.setState({
          userVotes: userVotesData
        });
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
          My Votes
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {this.state.userVotes.length === 0 ? (
            <CircularProgress color="secondary" size={50} />
          ) : (
            <Table
              rows={[
                {
                  label: "Name",
                  value: data => data.name
                },
                {
                  label: "Vote",
                  value: data => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <Button
                        variant="text"
                        color="primary"
                        aria-label="White List"
                        mini
                        disabled={data.vote === "white"}
                        onClick={() => {
                          vote(data.name, "white").then(() => {
                            this.forceUpdate();
                          });
                        }}
                      >
                        <CheckIcon />
                      </Button>
                      <Button
                        variant="text"
                        color="secondary"
                        aria-label="Black List"
                        mini
                        disabled={data.vote === "black"}
                        onClick={() => {
                          vote(data.name, "black").then(() => {
                            this.forceUpdate();
                          });
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  )
                }
              ]}
              data={this.state.userVotes}
            />
          )}
        </div>
      </section>
    );
  }
}
