import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Menu from "./Menu";
import Nav from "./Nav";
import { connect } from "react-redux";
import { User } from "../models/User";
import { setUser } from "../redux/action/setUserAction";

const Wrapper = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");

        // dispatch user
        props.setUser(
          new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
          )
        );
      } catch (error) {
        setRedirect(true);
      }
    })();
    return () => {};
  }, []);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: { user: User }) => ({ user: state.user });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
