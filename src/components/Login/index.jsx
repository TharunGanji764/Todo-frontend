import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./index.css";

const Login = () => {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [error, setError] = useState({ errorMsg: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onSubmitSuccess = (jwt) => {
    Cookies.set("jwt_token", jwt, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (err) => {
    setError({ errorMsg: err });
    console.log(error);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let userDetails = details;
    const url = "https://todo-backend-ee4y.onrender.com/todo/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.token);
    } else {
      onSubmitFailure(data.error);
    }
  };

  return (
    <div className="login-form-container d-flex flex-column justify-content-center align-items-center vh-100">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1 className="text-center heading">Login</h1>
        <div className="d-flex flex-column input-form">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={details.username}
            name="username"
            className="input-field"
            placeholder="Username"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
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
            value={details.password}
            name="password"
            className="input-field"
            placeholder="password"
            onChange={(e) =>
              setDetails({ ...details, [e.target.name]: e.target.value })
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
