import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { SyntheticEvent } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Permission } from "../../models/Permission";

const RoleCreate = () => {
  const [permissions, setPermissions] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState([] as number[]);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
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

    await axios.post("roles", data);
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
                      onChange={() => check(permission.id)}
                    />
                    <label className="form-check-label">
                      {permission.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default RoleCreate;
