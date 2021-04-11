// Sample usage for react hook
// import React, { useState } from "react";

// const Login = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div className="container">
//       <h1>Count {count}</h1>
//       <input
//         type="number"
//         onChange={(e) => setCount(parseInt(e.target.value))}
//       />
//       Login
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Redirect } from "react-router-dom";

import { login } from "../routes/url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const req = {
      email,
      password,
    };
    const { data } = await axios.post(login, req);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Login</h1>

        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
