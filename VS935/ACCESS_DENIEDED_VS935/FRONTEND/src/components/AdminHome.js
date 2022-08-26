import * as React from "react";
import pic from "../images/logo1.png";
import img1 from "../images/domain.jfif";

import img2 from "../images/resources.jpg";
import im from "../images/img1.jpg";
import imt from "../images/img2.jpg";
import imt1 from "../images/img3.webp";
import LoginAsAdminNav from "./adminnav/LoginAsAdminNav";
import img3 from "../images/grevance.jpg";

const AdminHome = () => {
  return (
    <>
      <div style={{ backgroundColor: "#334249", marginTop: -50 }}>
        <LoginAsAdminNav></LoginAsAdminNav>
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
            backgroundColor: "#334249",
            marginTop: -51,
          }}
        >
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
              <h2 className="card-text">Add Grievences</h2>
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
