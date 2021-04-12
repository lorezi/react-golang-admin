import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { SyntheticEvent } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Permission } from "../../models/Permission";
import { Link } from "react-router-dom";

const RoleEdit = (props: any) => {
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([] as number[]);

  const [redirect, setRedirect] = useState(false);
  const id: number = props.match.params.id;

  useEffect(() => {
    (async () => {
      const res = await axios.get("permissions");
      setPermissions(res.data);

      const { data } = await axios.get(`roles/${id}`);

      setName(data.name);
      setSelected(data.permissions.map((p: Permission) => p.id));
    })();
    return () => {};
  }, []);

  const check = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      name,
      permissions: selected.map(String),
    };

    await axios.patch(`roles/${id}`, data);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/roles" />;
  }

  return (
    <Wrapper>
      <div className="container-fluid mt-3">
        <form onSubmit={submit}>
          <div className="mb-3 row">
            <label className="form-label col-sm-2">Role Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                defaultValue={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Permissions</label>
            <div className="col-sm-10">
              {permissions.map((permission: Permission) => {
                return (
                  <div
                    className="form-check form-check-inline col-3"
                    key={permission.id}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={permission.id}
                      checked={selected.some((s) => s === permission.id)}
                      onChange={() => check(permission.id)}
                    />
                    <label className="form-check-label">
                      {permission.name}{" "}
                      {selected.filter((s) => s === permission.id).length > 0}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>

          <Link to="/roles" className="btn btn-danger float-end">
            Back
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

export default RoleEdit;
