import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import pic from "./logo1.png";
// import { Link } from "react-router-dom";
// import './navbar.css'
const LoginAsAdminNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      {/* <nav className={styles.navbar}>
				<h1>ShikshaVardhan</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button> 
                  <Link to="/signup">
 						<button type="button" className={styles.white_btn}>
					Logout
				</button>
				</Link> 
                
			</nav> */}
      <nav className="navbar navbar-expand-lg navbar-custom ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={pic} alt="" width="35" height="30"></img>
            &nbsp;SikshaVardhan
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
              <Link to="/addresource">
                <button type="button" className={styles.white_btn}>
                  Add Resources
                </button>
              </Link>
              <Link to="/adminhome">
                <li className="nav-item">
                  <a className="nav-link cls" href="#">
                    Admin DashBoard
                  </a>
                </li>
              </Link>
              <Link to="/adddomain">
                <li className="nav-item">
                  <a className="nav-link cls" href="/adddomain">
                    Add Domain
                  </a>
                </li>
              </Link>
              <Link to="/gr">
                <li className="nav-item">
                  <a className="nav-link cls" href="#">
                    Resolve Grievence
                  </a>
                </li>
              </Link>
            </ul>
            <form class="d-flex">
              <Link to="/signup">
                <button type="button" className={styles.white_btn}>
                  Logout
                </button>
              </Link>
              <Link to="/mainnav">
                <button type="button" className="btn btn-danger cls">
                  User
                </button>
              </Link>
            </form>
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
export default LoginAsAdminNav;
