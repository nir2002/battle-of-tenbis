import React from "react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

let id = 0;
export const createMyRestuarantsVotesData = (name, vote) => {
  return { id: id++, name, vote };
};

const data = [
  createMyRestuarantsVotesData("Yashka", "white"),
  createMyRestuarantsVotesData("Piazza", "white"),
  createMyRestuarantsVotesData("Restaurant 3", "black"),
  createMyRestuarantsVotesData("Restaurant 4", "black"),
  createMyRestuarantsVotesData("Restaurant 5", "black"),
  createMyRestuarantsVotesData("Restaurant 6")
];
export default class MyVotes extends React.Component {
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
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      variant="text"
                      color="primary"
                      aria-label="White List"
                      mini
                      disabled={data.vote === "white"}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      variant="text"
                      color="secondary"
                      aria-label="Black List"
                      mini
                      disabled={data.vote === "black"}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                )
              }
            ]}
            data={data}
          />
        </div>
      </section>
    );
  }
}
