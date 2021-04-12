/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/Role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("roles");
      setRoles(data);
    })();
    return () => {};
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Are sure you want to delete this record?")) {
      await axios.delete(`roles/${id}`);
      setRoles(roles.filter((r: Role) => r.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to="/roles/create" className="btn btn-sm btn-primary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>

                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`roles/${role.id}/edit`}
                        className="btn btn-sm btn-success"
                      >
                        Edit
                      </Link>
                      <a
                        href="#"
                        className="btn btn-sm btn-danger"
                        onClick={() => del(role.id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;