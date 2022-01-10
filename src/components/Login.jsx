import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/form.css";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container login-form ">
      <div className="row justify-content-center">
        <div className="form-group col-sm-4 align-center text-center">
          <form action="" onSubmit={handleSubmit}>
            <h1>Log In</h1>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-control"
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-control"
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <div className="text-center">
              <span>
                Need an account? <Link to="/register">Create One!</Link>
              </span>
            </div>

            <input
              type="submit"
              value="Log In"
              className="btn btn-primary mt-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
