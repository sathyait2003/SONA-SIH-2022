import React from "react";
import logo from "../images/logo1.png";
// import "./Navbar.css";
// import src from "../images/Education Ad Video Template (Editable)_1080p.mp4";
export default function FrontPage() {
  return (
    <div>
      <div
        style={{
          height: "60vh",
          marginTop: "25vh",
        }}
      >
        <img
          src={logo}
          style={{
            width: "50%",
            height: "100%",
            borderRightStyle: "solid",
            borderRightWidth: 2,
          }}
        />
      </div>
      <br />
      <div className="para container-sm py-3">
        <h2 className="text-center">About Us</h2>
        <br />
        <p className="container">
          SHIKSHA VARDHAN is an education platform for all students around the
          globe. Education is important for all. In our life, all of us don't
          get the opportunity to grab that and make our success path brighter.
          Sometimes we get the opportunity but could not use all of it. so, here
          we are launching a portal for all of the students around the globe to
          fulfill their learning process more better. ABOUT OUR PLATFORM! From
          our portal industries can share their best courses with other
          industries, and other industries can buy that courses and avail them
          free for their students. If any student wants to access any particular
          resource that student can buy the course from our portal. it will be
          paid so that educational industries that are sharing the courses can
          make some profit.
        </p>
        <br />
      </div>
      <br />
      <br />
      {/* <video>
        <source
          src="../images/Education Ad Video Template (Editable)_1080p.mp4"
          type="video/webm"
          style={{height:50,width:100}}
        />
        Sorry, your browser doesn't support videos.
      </video> */}
      <iframe
        width="800"
        height="350"
        src={src}
        title="Youtube Player"
        frameborder="0"
        allowFullScreen
        style={{marginLeft:70}}
      />
    </div>
  );
}
