import axios from "axios";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { User } from "../../models/User";
import { setUser } from "../../redux/action/setUserAction";

const Profile = (props: { user: User; setUser: (user: User) => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);

    return () => {};
  }, [props.user]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const req = {
      first_name: firstName,
      last_name: lastName,
      email,
    };

    const { data } = await axios.patch("users/profile", req);
    props.setUser(
      new User(data.id, data.first_name, data.last_name, data.email, data.role)
    );
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      password,
      password_confirm: passwordConfirm,
    };
    await axios.patch("users/password", data);
  };

  return (
    <Wrapper>
      <h3>Account Information</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Update</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Update</button>

        <Link to="/" className="btn btn-danger float-end">
          Back
        </Link>
      </form>
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

const mapStateToProps = (state: { user: User }) => ({ user: state.user });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
