import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./App.css";

export default class App extends Component {
  state = {
    name: "",
    email: "",
    mobile_number: "",
    hotel_name: "",
    noOfRoomsAvailable: "",
    noOfRoomsBooked: "",

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
        editable: true,
      },
      {
        headerName: "No Of Rooms Booked",
        field: "noOfRoomsBooked",
      },
      {
        headerName: "No Of Rooms Available",
        field: "noOfRoomsAvailable",
      },
      {
        headerName: "Delete",
        maxWidth: 100,
        cellRendererFramework: (params) => {
          let id = params.data._id;
          return (
            <div>
              <div>
                <Button
                  color="danger"
                  value={id}
                  onClick={this.openDeleteModal}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Edit",
        field: "Edit",
        editable: true,
        maxWidth: 100,
        cellRendererFramework: (params) => {
          let id = params.data._id;
          return (
            <Button color="primary" value={id} onClick={this.openEditModal}>
              Edit
            </Button>
          );
        },
      },
    ],
    rowData: [],
    showModal: false,
    openModal: false,
    openEditModal: false,
    Id: "",
  };
  componentDidMount = () => {
    this.getData();
  };

  toggle = () => {
    this.setState({
      openModal: false,
      openEditModal: false,
    });
  };

  getData = () => {
    axios
      .get("http://localhost:5000/totalReservations")
      .then((res) => {
        console.log(res);
        this.setState({
          rowData: res.data,
        });
        console.log(this.state.rowData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editData = (e) => {
    let id = e.target.value;
    console.log(e.target.value, "id");
    axios
      .put(`http://localhost:5000/totalReservations/${id}`, {
        name: this.state.name,
        email: this.state.email,
        mobile_number: this.state.mobile_number,
        hotel_name: this.state.hotel_name,
        noOfRoomsBooked: this.state.noOfRoomsBooked,
        noOfRoomsAvailable: this.state.noOfRoomsAvailable,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    this.toggle();
  };
  openDeleteModal = async (e) => {
    console.log(e.target.value);
    let id = e.target.value;
    await this.setState({ openModal: !this.state.openModal, Id: id });
    console.log(this.state.Id);
    console.log(this.state.openModal);
    console.log("clicked");
    // alert("Reservation is Deleted");
  };
  openEditModal = async (e) => {
    console.log(e.target.value);
    let id = e.target.value;
    await this.setState({ openEditModal: !this.state.openEditModal, Id: id });
    console.log(this.state.Id);
  };
  deleteData = (e) => {
    console.log(e.target.value);
    let id = e.target.value;
    axios
      .delete(`http://localhost:5000/totalReservations/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.toggle();
  };

  showModal = () => {
    this.setState({ showModal: true });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:5000/add", {
        name: this.state.name,
        email: this.state.email,
        mobile_number: this.state.mobile_number,
        hotel_name: this.state.hotel_name,
        noOfRoomsBooked: this.state.noOfRoomsBooked,
        noOfRoomsAvailable: this.state.noOfRoomsAvailable,
      })
      .then((res) => {
        this.setState({
          rowData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      name: "",
      email: "",
      mobile_number: "",
      hotel_name: "",
      noOfRoomsAvailable: "",
      noOfRoomsBooked: "",
    });
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div>
        <div>
          <div className="header">
            <div className="reservation">User Reservations</div>
            <button
              type="button"
              className="btn btn-success btn newUserButton"
              onClick={this.showModal}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Add New
              Reservation
            </button>
          </div>
          <div>
            <Modal isOpen={this.state.showModal}>
              <Form className="form">
                <FormGroup row>
                  <Label for="name" sm={2}>
                    Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="mobile_number" sm={2}>
                    Number
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="number"
                      id="number"
                      placeholder="Mobile Number"
                      value={this.state.mobile_number}
                      onChange={(e) => {
                        this.setState({ mobile_number: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="hotel_name" sm={2}>
                    Hotel Name
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="hotel_name"
                      id="hotel_name"
                      placeholder="Hotel Name"
                      value={this.state.hotel_name}
                      onChange={(e) => {
                        this.setState({ hotel_name: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="roomsBooked" sm={2}>
                    Rooms Booked
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="noOfRoomsBooked"
                      id="noOfRoomsBooked"
                      placeholder="No Of Rooms Booked"
                      value={this.state.noOfRoomsBooked}
                      onChange={(e) => {
                        this.setState({ noOfRoomsBooked: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Rooms Available</Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="noOfRoomsAvailable"
                      id="noOfRoomsAvailable"
                      placeholder="No Of Rooms Available"
                      value={this.state.noOfRoomsAvailable}
                      onChange={(e) => {
                        this.setState({ noOfRoomsAvailable: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <button
                  type="button"
                  className="btn btn-info mr-2"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
                <button
                  onClick={this.handleClose}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </Form>
            </Modal>
          </div>
        </div>

        <Modal isOpen={this.state.openModal} toggle={this.toggle}>
          <ModalBody>Are you sure want to delete?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              value={this.state.Id}
              onClick={this.deleteData}
            >
              Yes
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.openEditModal} toggle={this.toggle}>
          <Form className="form">
            <h3>Edit Reservation</h3>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="email" sm={2}>
                Email
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="mobile_number" sm={2}>
                Number
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Mobile Number"
                  value={this.state.mobile_number}
                  onChange={(e) => {
                    this.setState({ mobile_number: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="hotel_name" sm={2}>
                Hotel Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="hotel_name"
                  id="hotel_name"
                  placeholder="Hotel Name"
                  value={this.state.hotel_name}
                  onChange={(e) => {
                    this.setState({ hotel_name: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="roomsBooked" sm={2}>
                Rooms Booked
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="noOfRoomsBooked"
                  id="noOfRoomsBooked"
                  placeholder="No Of Rooms Booked"
                  value={this.state.noOfRoomsBooked}
                  onChange={(e) => {
                    this.setState({ noOfRoomsBooked: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Rooms Available</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="noOfRoomsAvailable"
                  id="noOfRoomsAvailable"
                  placeholder="No Of Rooms Available"
                  value={this.state.noOfRoomsAvailable}
                  onChange={(e) => {
                    this.setState({ noOfRoomsAvailable: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <Button
              color="primary"
              value={this.state.Id}
              onClick={this.editData}
            >
              Yes
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
          </Form>
        </Modal>
        <div
          className="table ag-theme-alpine"
          style={{
            height: "500px",
            width: "95%",
          }}
        >
          <AgGridReact
            onGridReady={this.onGridReady}
            ariaHideApp={false}
            rowSelection="single"
            columnDefs={this.state.columnDefs}
            onSelectionChanged={this.onSelectionChanged}
            rowData={this.state.rowData}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
