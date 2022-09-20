import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {Link} from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Passwoed"),
  };



  doSubmit = () => {
    //Call the server
    console.log("submitted"); 
  };



  render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="row g-1" onSubmit={this.handleSubmit}>
        <div className="col-md-4">
          {this.renderInput('username','Username/Email','text','username or email','')}
        </div>
        <div className="col-md-4"> {this.renderInput('password','Password','password','','')}</div>
         <div className="col-12">
          {this.renderButton('Login')} <Link to={'/register'}>Register</Link>
         </div>
          
        </form>
      </div>
    );
  }
}

export default LoginForm;
