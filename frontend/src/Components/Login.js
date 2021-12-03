import React from "react";
import "./login.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(login);

    try {
      const deployedUrl = "https://chatapp978.herokuapp.com/users/login";
      //const localUrl = "http://localhost:3001/users/login";

      const res = await axios.post(deployedUrl, {
        email: login.email,
        password: login.password,
      });

      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setLogin({ ...login, email: "", password: "" });
      }

      //console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/liveChat");
        setLogin({ ...login, email: "", password: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Chat Application-Home</h1>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={login.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={login.password}
          onChange={handleChange}
        ></input>
        <Button variant="outlined" type="submit">
          Login
        </Button>
        <Link to="/register">Register</Link>
      </form>
      {message}
    </div>
  );
}

export default Login;
