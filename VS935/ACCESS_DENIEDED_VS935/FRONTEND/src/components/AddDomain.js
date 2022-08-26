import * as React from "react";
import img from "../images/logo1.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextInput, Button } from "evergreen-ui";
import LoginAsAdminNav from "./adminnav/LoginAsAdminNav";

const AddDomain = () => {
  const [vari, setvari] = useState("");
  async function submit() {
    console.log("dfg");
    await axios
      .post("http://127.0.0.1:8000/add_domain/", {
        domain: vari,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Domain Added Successfully");
  }
  const handleChange = (event) => {
    setvari(event.target.value);

    console.log("value is:", event.target.value);
  };
  return (
    <>
      <LoginAsAdminNav></LoginAsAdminNav>
      <div
        style={{ height: "100vh", width: "100%", backgroundColor: "#334249" }}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "85vh",
            width: "26%",
            marginTop: 30,
            margin: "auto",

            padding: 30,
            boxShadow: "15px 10px 30px 10px #bbbbbb",
          }}
        >
          <div>
            <h2 style={{ color: "black", marginLeft: 50 }}>ADD DOMAIN</h2>
            <img
              src={img}
              style={{
                width: "70%",
                height: "50%",
                marginLeft: 10,
                marginTop: -2,
                borderRadius: 40,
              }}
            />
            <br />
            <br />
          </div>
          <div style={{ marginTop: -1, marginLeft: 5 }}>
            <h3 style={{ color: "white", marginLeft: 10 }}>Enter Domain</h3>
            <TextInput
              placeholder="Enter Domain"
              style={{ height: 45, width: 340, borderRadius: 20 }}
              onChange={handleChange}
            />
          </div>

          <br />
          <br />
          <Button
            marginLeft={20}
            intent="success"
            style={{
              width: 100,
              height: 50,
              fontSize: 20,
              color: "#c45338",
              borderRadius: 20,
            }}
            onClick={submit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
export default AddDomain;
