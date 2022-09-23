import React from "react";
import Joi from "joi-browser";
import * as userService from '../services/userService'
import Form from "./common/form";
class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
      address: "",
    },
    errors: {},
  };

 

  schema = {
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    email: Joi.string().email().required().label("Email"),
    phoneNumber: Joi.string().min(5).required().label("Phone Number"),
    city: Joi.string().required().label("City"),
    country: Joi.string().required().label("Country"),
    address: Joi.string().required().label("Address"),
  };

  doSubmit = async () => {
    try{
     const response=  await userService.register(this.state.data);
     localStorage.setItem('token',response.headers['x-auth-token']);
     window.location="/";
    }catch(ex){
       if(ex.response && ex.response.status === 400){
        const errors ={...this.state.errors};
        if(ex.response.data.includes("Email")){
          errors.email=ex.response.data;
        }else{
          errors.username=ex.response.data;
        }
        console.log(ex.response)
        this.setState({errors});
       }
    }
    
     
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form className="row g-3 needs-validation" onSubmit={this.handleSubmit}>
          <div className="col-md-3">
            {this.renderInput("firstName", "First name", "text", "ex.Mark")}
          </div>
          <div className="col-md-3">
            {this.renderInput("lastName", "Last name", "text", "ex.Otto")}
          </div>
          <div className="col-md-3">
            {this.renderInput("username", "Username", "text", "ex.user23")}
          </div>
          <div className="col-md-3">
            {this.renderInput("email", "Email", "text", "ex.user21@gamil.com")}
          </div>
          <div className="col-md-3">
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className="col-md-3">
            {this.renderInput(
              "phoneNumber",
              "Phone Number",
              "text",
              "ex.055789545"
            )}
          </div>
          <div className="col-md-3">
            {this.renderInput("city", "City", "text", "tel aviv")}
          </div>
          <div className="col-md-3">
            {this.renderInput("country", "Country", "text",'ex.israel')}
          </div>
          <div className="col-md-3">
            {this.renderInput("address", "Address", "text", "ex.hbi 176/1")}
          </div>
          <div className="col-12">{this.renderButton("Register")}</div>
        </form>
      </div>
    );
  }
}

export default Register;
