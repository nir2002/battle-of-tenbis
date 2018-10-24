import React from "react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import {
  getRestaurantsNames,
  getAuthenticatedUserVotes,
  vote
} from "./../../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core";

const styles = {
  userVote: {
    backgroundColor: "#e28c36"
  }
};

class MyVotes extends React.Component {
  state = {
    userVotes: null
  };

  componentDidMount() {
    this.fetchUserVotes();
  }

  fetchUserVotes() {
    getAuthenticatedUserVotes().then(userVotes => {
      const userVotesData = [];
      const restaurantsNames = Object.keys(userVotes);
      restaurantsNames.forEach((restaurant, index) => {
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
  }

  componentDidUpdate() {
    if (this.state.userVotes) return;
    this.fetchUserVotes();
  }

  render() {
    const { classes } = this.props;

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
          {!this.state.userVotes ? (
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
                        className={
                          data.vote === "white" ? classes.userVote : ""
                        }
                        onClick={() => {
                          vote(data.name, "white").then(() => {
                            this.setState({ userVotes: null });
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
                        className={
                          data.vote === "black" ? classes.userVote : ""
                        }
                        onClick={() => {
                          vote(data.name, "black").then(() => {
                            this.setState({ userVotes: null });
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

export default withStyles(styles)(MyVotes);
