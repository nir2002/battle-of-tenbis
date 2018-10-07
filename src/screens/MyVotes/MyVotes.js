import React from "react";
import Table from "../../components/Tables/Table";
import Typography from "@material-ui/core/Typography";

let id = 0;
export const createMyRestuarantsVotesData = (name, vote) => {
  return { id: id++, name, vote };
};

const data = [
  createMyRestuarantsVotesData("Yashka", "white"),
  createMyRestuarantsVotesData("Piazza", "white"),
  createMyRestuarantsVotesData("Restaurant 3", "black"),
  createMyRestuarantsVotesData("Restaurant 4", "black"),
  createMyRestuarantsVotesData("Restaurant 5", "black")
];
export default class MyVotes extends React.Component {
  render() {
    return (
      <section style={{ marginTop: 50 }}>
        <Typography
          variant="title"
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
                value: data => data.vote
              }
            ]}
            data={data}
          />
        </div>
      </section>
    );
  }
}
