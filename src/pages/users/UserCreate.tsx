import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/Role";

const UserCreate = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRole_id] = useState("");
  const [roles, setRoles] = useState([]);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    })();
    return () => {};
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const r = parseInt(role_id, 10);
    const data = {
      first_name,
      last_name,
      email,
      role_id: r,
    };

    await axios.post("users", data);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/users" />;
  }

  return (
    <Wrapper>
      <div className="container-fluid mt-3">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              onChange={(e) => setRole_id(e.target.value)}
            >
              {roles.map((r: Role) => {
                return (
                  <option value={r.id} key={r.id}>
                    {r.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default UserCreate;
