import React from "react";
import Table from "../../components/Tables/Table";

let id = 0;
export const createRestuarantsData = (name, voters) => {
  return { id: id++, name, ...voters };
};

const data = [
  createRestuarantsData("Yashka", [{ name: "Nir" }, { name: "Dan" }]),
  createRestuarantsData("Piazza", [{ name: "Ben" }, { name: "Dan" }]),
  createRestuarantsData("Restaurant 3", [
    { name: "Ben" },
    { name: "Avi" },
    { name: "Alon" }
  ]),
  createRestuarantsData("Restaurant 4", [
    { name: "Naor" },
    { name: "Nir" },
    { name: "Lev" }
  ]),
  createRestuarantsData("Restaurant 5", [
    { name: "Eyal" },
    { name: "Lev" },
    { name: "Avi" }
  ])
];

export default class Restaurants extends React.Component {
  render() {
    return (
      <div>
        <h1>Resatuarnts Page</h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Table
            color="white"
            rows={[
              {
                label: "Name",
                value: data => data.name
              },
              {
                label: "Voters",
                value: data => data.voters
              }
            ]}
            data={data}
          />
          <Table
            color="black"
            rows={[
              {
                label: "Name",
                value: data => data.name
              },
              {
                label: "Voters",
                value: data => data.voters
              }
            ]}
            data={data}
          />
        </div>
      </div>
    );
  }
}
