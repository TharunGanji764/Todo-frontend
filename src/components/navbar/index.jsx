import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Nav = () => {
  const jwt = Cookies.get("jwt_token");
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="nav-bar">
      {jwt === undefined && (
        <div className="nav-buttons">
          <Link to="/register">
            <button className="btn btn-info" type="button">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-info" type="button">
              Login
            </button>
          </Link>
        </div>
      )}
      {jwt !== undefined && (
        <button className="btn btn-info" type="button" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
};
export default Nav;
