import React, { useState,useEffect } from 'react'
import axios from "axios";
import './Aboutus.css'
export default function () {
    const [desc,setdesc]=useState("Siskha Vardhan");
    const [contributors,setcontributors]=useState("Access Denieded");
    useEffect(() => {
      // Update the document title using the browser API
      axios
        .get("http://127.0.0.1:8000/about_us/")
        .then((res) => {
          console.log(res.data);
          setdesc(res.data.Description);
          setcontributors(res.data.contributors);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  return (
    <div>
      <div className="aboutus container-sm py-3">
        <h2 className="text-center">About Us</h2>
        <br />
        <p className="container">
         {desc}
        </p>
        <br />
        <p>Contributed by :- {contributors}</p>
        <br />
      </div>
    </div>
  );
}
