import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from "axios";
const baseUrl = "http://localhost:3002";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
    role: ""
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getData = () => {
    if (this.props.role === "student") {
      Axios.get(`${baseUrl}/api/student`).then(res => {
        if (res.status === 200) {
          const data = res.data.userData;
          for (let i = 0; i < data.length; i++) {
            if (
              this.state.email === data[i].email &&
              data[i].password === this.state.password &&
              this.props.role === data[i].role
            ) {
              console.log("logged in");
              this.props.handleLogin();
            } else {
              let error;
              error = { message: "Data not found" };
              this.setState({ errors: this.state.errors.concat(error) });
            }
          }
        }
      });
    } else {
      Axios.get(`${baseUrl}/api/company`).then(res => {
        if (res.status === 200) {
          const data = res.data.userData;
          for (let i = 0; i < data.length; i++) {
            if (
              this.state.email === data[i].email &&
              data[i].password === this.state.password &&
              this.props.role === data[i].role
            ) {
              console.log("logged in");
              this.props.handleLogin();
            } else {
              let error;
              error = { message: "Data not found" };
              this.setState({ errors: this.state.errors.concat(error) });
            }
          }
        }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.getData();
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    // console.log(this.state.role);
    // console.log(this.props);
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 1000 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            Login Here
          </Header>
          <Form
            onSubmit={this.handleSubmit}
            size="large"
            inverted
            widths="equal"
          >
            <Segment inverted color="teal">
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Enter your email address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
                label="Email Address"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Enter your password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
                label="Password"
              />
              <label
                style={{
                  fontWeight: "bold"
                }}
              >
                Type
              </label>
              <select
                value={this.props.role}
                name="role"
                onChange={this.props.handleRole}
              >
                <option value="company">Company</option>
                <option value="student">Student</option>
              </select>
              <br />
              <br />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message color="black">
            Not Registered? <Link to="/register">Create an account</Link> <br />{" "}
            Or Are you Admin ? <Link to="/adminLogin">Admin Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
