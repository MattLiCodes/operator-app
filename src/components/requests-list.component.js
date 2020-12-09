import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Request = (props) => (
  <tr>
    <td>{props.request.name}</td>
    <td>{props.request.bed}</td>
    <td>{props.request.description}</td>
    <td>{props.request.staff}</td>
    <td>{props.request.date.substring(0, 10)}</td>
    <td>{props.request.status ? "Seen" : "Not Seen"}</td>
    <td>
      <Link to={"/edit/" + props.request._id}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteRequest(props.request._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class RequestsList extends Component {
  constructor(props) {
    super(props);

    this.deleteRequest = this.deleteRequest.bind(this);

    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/requests/")
      .then((response) => {
        this.setState({
          requests: response.data.filter((el) => el.completed != true),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRequest(id) {
    axios
      .delete("http://localhost:5000/requests/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      requests: this.state.requests.filter((el) => el._id !== id),
    });
  }

  requestList() {
    return this.state.requests.map((currentrequest) => {
      return (
        <Request
          request={currentrequest}
          deleteRequest={this.deleteRequest}
          key={currentrequest._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Patient Requests</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Bed</th>
              <th>Description</th>
              <th>Staff</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.requestList()}</tbody>
        </table>
      </div>
    );
  }
}
