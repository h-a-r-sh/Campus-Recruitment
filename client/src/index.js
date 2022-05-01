import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import "semantic-ui-css/semantic.min.css";
import AdminLogin from "./components/Admin-panel/adminLogin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./components/Admin-panel/AdminDashboard";

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/adminLogin" exact component={AdminLogin} />
      <Route path="/adminDashboard" exact component={AdminDashboard} />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));
