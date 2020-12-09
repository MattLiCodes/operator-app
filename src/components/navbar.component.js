import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-primary navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          <img
            width="20%"
            height="20%"
            src="https://raw.githubusercontent.com/MattLiCodes/operator-client/main/public/ScrubsLogo.png"
            alt="Scrubs"
          ></img>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto nav-text">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Requests
              </Link>
            </li>
            <li className="navbar-item nav-text">
              <Link to="/create" className="nav-link">
                Create Request
              </Link>
            </li>
            <li className="navbar-item nav-text">
              <Link to="/staff" className="nav-link">
                Create Staff Member
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
