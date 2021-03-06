import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import { Redirect } from "react-router";
import "../Login.css";
import { register } from "../routes/url";

export default class Register extends Component {
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirm = "";
  data!: Object;
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      this.data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      };

      const res = await axios.post(register, this.data);

      console.log(res.data);
      this.setState({
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <main className="form-signin">
        <form onSubmit={this.submit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            required
            onChange={(e) => (this.first_name = e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            required
            onChange={(e) => (this.last_name = e.target.value)}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => (this.email = e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => (this.password = e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password Confirm"
            required
            onChange={(e) => (this.password_confirm = e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Register
          </button>
        </form>
      </main>
    );
  }
}
