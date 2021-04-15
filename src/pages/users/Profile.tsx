import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("user");
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
    })();
    return () => {};
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
    };

    await axios.patch("users/profile", data);
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

export default Profile;
