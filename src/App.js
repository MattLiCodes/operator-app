import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component.js";
import RequestsList from "./components/requests-list.component";
import EditRequest from "./components/edit-requests.component";
import CreateRequest from "./components/create-request.component";
import CreateStaff from "./components/create-staff.component";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <br />
        <Route path="/" exact component={RequestsList} />
        <Route path="/edit/:id" component={EditRequest} />
        <Route path="/create" component={CreateRequest} />
        <Route path="/staff" component={CreateStaff} />
      </div>
    </Router>
  );
}

export default App;
