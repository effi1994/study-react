import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Link, Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Passwoed"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username,data.password);
      const {state} =this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to={"/"}/>
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            {this.renderInput(
              "username",
              "Username/Email",
              "text",
              "username or email",
              ""
            )}
          </div>
          <div className="col-md-4">
            {" "}
            {this.renderInput("password", "Password", "password", "", "")}
          </div>
          <div className="col-12">
            {this.renderButton("Login")} <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
