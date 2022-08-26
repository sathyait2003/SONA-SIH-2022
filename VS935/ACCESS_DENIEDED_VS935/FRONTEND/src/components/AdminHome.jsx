import * as React from "react";

import img1 from "../assets/domain.jfif";
import { Link } from "react-router-dom";
import img2 from "../assets/resources.jpg";
import im from "../assets/img1.jpg";
import imt from "../assets/img2.jpg";
import imt1 from "../assets/img3.webp";

import img3 from "../assets/grevance.jpg";
import LoginAsAdminNav from "./adminnav/LoginAsAdminNav";

const AdminHome = () => {
  return (
    <>
      <div>
        <LoginAsAdminNav></LoginAsAdminNav>
      </div>
      <div style={{ backgroundColor: "#00a69c" }}>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner" style={{ height: 550 }}>
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={im}
                style={{ height: 500 }}
                alt="First slide"
              />
            </div>
            <div className="carousel-item" style={{ height: 550 }}>
              <img
                className="d-block w-100"
                src={imt}
                style={{ height: 500 }}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item" style={{ height: 550 }}>
              <img
                className="d-block w-100"
                src={imt1}
                style={{ height: 500 }}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        {/* Carousel ends */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#00a69c",
            marginTop: 19,
          }}
        >
          <Link to="/adddomain">
            <div
              className="card"
              style={{
                width: "18rem",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              <img
                className="card-img-top"
                src={img1}
                alt="Card image cap"
                style={{ height: 150, width: 285 }}
              />
              <div className="card-body">
                <h2 className="card-text">Add Domain</h2>
              </div>
            </div>
          </Link>
          <Link to="/addresource">
            <div
              className="card"
              style={{
                width: "18rem",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              <img
                className="card-img-top"
                src={img2}
                alt="Card image cap"
                style={{ height: 150, width: 285 }}
              />
              <div className="card-body">
                <h2 className="card-text">Add Resources</h2>
              </div>
            </div>
          </Link>
          <div
            className="card"
            style={{
              width: "18rem",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            <img
              className="card-img-top"
              src={img3}
              alt="Card image cap"
              style={{ height: 150, width: 285 }}
            />
            <div className="card-body">
              <h2 className="card-text">Reslove Grievences</h2>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
export default AdminHome;
