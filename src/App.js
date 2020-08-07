import React, { Component } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";

export default class App extends Component {
  state = {
    columnDefs: [
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Email",
        field: "email",
      },
      {
        headerName: "Mobile Number",
        field: "mobile_number",
      },
      {
        headerName: "Hotel Name",
        field: "hotel_name",
      },
      {
        headerName: "No Of Rooms Booked",
        field: "noOfRoomsBooked",
      },
      {
        headerName: "No Of Rooms Available",
        field: "noOfRoomsAvailable",
      },
    ],
    rowData: null,
  };
  componentDidMount = () => {
    this.getData();
  };
  getData = () => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        this.setState({
          rowData: res.data,
        });
        console.log(this.state.rowData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div
        className="table ag-theme-alpine"
        style={{
          height: "500px",
          width: "95%",
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        ></AgGridReact>
      </div>
    );
  }
}
