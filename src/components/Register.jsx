import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/form.css";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const { register } = useAuth();

  const registerUser = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    register(name, email, password)
      .then((ref) => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="container login-form ">
      <div className="row justify-content-center">
        <div className="form-group col-sm-5 align-center text-center">
          <form action="" onSubmit={registerUser}>
            <h1>Register!</h1>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="form-control"
              required
              ref={nameRef}
            />
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              ref={usernameRef}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form-control"
              required
              ref={emailRef}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="form-control"
              required
              ref={passwordRef}
            />
            <div className="text-center">
              <span>
                Already have an account? <Link to="/login">Login!</Link>
              </span>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-success mt-2"
              disabled={loading}
            />

            {loading && (
              <div
                class="spinner-border text-success m-auto mt-3 d-block"
                role="status"
              ></div>
            )}

            {error && (
              <span
                className="text-danger d-block"
                style={{ overflowWrap: "anywhere", cursor: "pointer" }}
              >
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
