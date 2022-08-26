import pic from "./logo1.png";
import "./navbar.css";
import chatBot from "../chatBot";
import { Link } from "react-router-dom";
const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ marginTop: -90 }}>
      <nav className="navbar navbar-expand-lg navbar-custom ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={pic} alt="" width="30" height="24"></img>
            <br></br>&nbsp;Siksha Vardhan
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active cls"
                  aria-current="page"
                  href="#"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
              <Link to="/homepage">
                <li className="nav-item">
                  <a
                    className="nav-link cls"
                    href="#"
                    style={{ color: "white" }}
                  >
                    Courses
                  </a>
                </li>
              </Link>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle cls"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/edit">
                    <li>
                      <a
                        className="dropdown-item cls"
                        href="#"
                        style={{ color: "white" }}
                      >
                        My Account
                      </a>
                    </li>
                  </Link>
                  <Link to="/courses">
                    <li>
                      <a
                        className="dropdown-item cls"
                        href="#"
                        style={{ color: "white" }}
                      >
                        My Courses
                      </a>
                    </li>
                  </Link>
                  <Link to="/forget">
                    <li>
                      <a
                        className="dropdown-item cls"
                        href="#"
                        style={{ color: "white" }}
                      >
                        Change Password
                      </a>
                    </li>
                  </Link>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item cls"
                      href=""
                      style={{ color: "white" }}
                    >
                      Forget Password
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <Link to="/adminnav">
              <form class="d-flex">
                <button
                  class="btn btn-danger cls"
                  style={{ backgroundColor: "#c45338" }}
                  type="submit"
                >
                  Admin
                </button>
              </form>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
// {/* <Link to="/signup">
// 						<button type="button" className={styles.white_btn}>
// 							Logout
// 						</button>
// 					</Link> */}
export default Main;
