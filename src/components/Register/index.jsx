import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

const Register = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitSuccess = (message) => {
    alert("User Registered Successfully")
  };

  const onSubmitFailure = (error) => {
    alert(error)
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const url = "https://todo-backend-ee4y.onrender.com/todo/auth/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        onSubmitSuccess(data.message);
      } else {
        onSubmitFailure(data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="register-form-container d-flex flex-column justify-content-center align-items-center vh-100">
      <form className="register-form" onSubmit={onSubmitForm}>
        <h1 className="align-self-center heading-txt">Register Now</h1>
        <div className="d-flex flex-column input-form">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            value={Data.username}
            name="username"
            placeholder="Username"
            onChange={(e) =>
              setData({ ...Data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="d-flex flex-column input-form">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="input-field"
            value={Data.password}
            name="password"
            placeholder="password"
            onChange={(e) =>
              setData({ ...Data, [e.target.name]: e.target.value })
            }
          />
          {showPassword ? (
            <FaEye
              onClick={() => setShowPassword(false)}
              className="cursor-pointer show-password"
              size={20}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword(true)}
              className="cursor-pointer show-password"
              size={20}
            />
          )}
        </div>
        <button className="btn btn-info" type="submit">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default Register;
