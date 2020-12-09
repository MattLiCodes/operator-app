import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditRequest extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBed = this.onChangeBed.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStaff = this.onChangeStaff.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      bed: "",
      description: "",
      staff: "",
      date: new Date(),
      status: false,
      completed: false,
      staffs: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/requests/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          bed: response.data.bed,
          description: response.data.description,
          staff: response.data.staff,
          date: new Date(response.data.date),
          status: response.data.status,
          completed: response.data.completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/staffs/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          staffs: response.data.map((staff) => staff.username),
        });
      }
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeBed(e) {
    this.setState({
      bed: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeStaff(e) {
    this.setState({
      staff: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const request = {
      name: this.state.name,
      bed: this.state.bed,
      description: this.state.description,
      staff: this.state.staff,
      date: this.state.date,
      status: this.state.status,
      completed: this.state.completed,
    };
    console.log(request);

    axios
      .post(
        "http://localhost:5000/requests/update/" + this.props.match.params.id,
        request
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Request</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Bed: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.bed}
              onChange={this.onChangeBed}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Staff: </label>
            <select
              ref="staffInput"
              required
              className="form-control"
              value={this.state.staff}
              onChange={this.onChangeStaff}
            >
              {this.state.staffs.map(function (staff) {
                return (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Request"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
