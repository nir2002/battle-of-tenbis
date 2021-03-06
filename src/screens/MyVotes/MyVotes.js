import React from "react";
import { observer, inject } from "mobx-react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core";

const styles = {
  userVote: {
    backgroundColor: "#e28c36"
  }
};

class MyVotes extends React.Component {
  render() {
    const { classes, usersStore } = this.props;

    if (!usersStore.currentUser) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Please sign in to see your votes
        </div>
      );
    }

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
          {usersStore.fetchingVotes ? (
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
                          usersStore.vote(data.name, "white");
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
                          usersStore.vote(data.name, "black");
                        }}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  )
                }
              ]}
              data={usersStore.userVotes}
            />
          )}
        </div>
      </section>
    );
  }
}

export default withStyles(styles)(inject("usersStore")(observer(MyVotes)));
