import React, { useState } from "react";
import "./register.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(register);
    try {
      const deployedUrl = "https://chatapp978.herokuapp.com/users/register";
      //const localUrl = "http://localhost:3001/users/register";

      const res = await axios.post(deployedUrl, {
        name: register.name,
        email: register.email,
        password: register.password,
      });
      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(res.data);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      setRegister({ ...register, name: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          <Link to="/"> Chat Application </Link>
        </h1>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="enter your name"
          name="name"
          value={register.name}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          value={register.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="enter your password"
          name="password"
          value={register.password}
          onChange={handleChange}
        ></input>

        <Button variant="outlined" type="submit">
          Register
        </Button>
      </form>
      {message}
    </div>
  );
}

export default Register;
