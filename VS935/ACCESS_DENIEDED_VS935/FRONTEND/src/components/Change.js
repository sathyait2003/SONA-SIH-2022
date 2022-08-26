import * as React from "react";
import Main from "./Main";
import { TextInput, Button } from "evergreen-ui";
const Forget = () => {
  return (
    <>
      <div>
        <Main></Main>
      </div>
      <div
        style={{ height: "100vh", width: "100%", backgroundColor: "#334249" }}
      >
        <br></br>
        <br></br>
        <br />
        <br />
        <div
          style={{
            backgroundColor: "white",
            height: "70vh",
            width: "40%",

            margin: "auto",

            padding: 30,
            boxShadow: "15px 10px 30px 10px #bbbbbb",
          }}
        >
          <div>
            {/* <img src={img} style={{ width: 100, height: 100, marginLeft: 120 }} /> */}

            <h1 style={{ color: "#33424", marginLeft: 90 }}>
              <b>CHANGE PASSWORD</b>
            </h1>
          </div>
          <div style={{ marginTop: 20, marginLeft: 15 }}>
            <h4 style={{ color: "#334249" }}>Old Password</h4>
            <TextInput
              placeholder="Enter Old Passowrd"
              style={{ height: 35, width: 300, borderRadius: 20 }}
            />
          </div>

          <div style={{ marginTop: 20, marginLeft: 15 }}>
            <h4 style={{ color: "#334249" }}>New Password</h4>
            <TextInput
              placeholder="Enter New Passowrd"
              style={{ height: 35, width: 300, borderRadius: 20 }}
            />
          </div>
          <div style={{ marginTop: 20, marginLeft: 15 }}>
            <h4 style={{ color: "#334249" }}>Confirm Password</h4>
            <TextInput
              placeholder="Confirm Passowrd"
              style={{ height: 35, width: 300, borderRadius: 20 }}
            />
          </div>
          <br />
          <br />
          <Button
            marginLeft={120}
            intent="success"
            style={{
              width: 120,
              height: 50,
              fontSize: 25,
              color: "white",
              borderRadius: 20,
              backgroundColor: "#334249",
              marginTop: -10,
              marginLeft: 210,
            }}
          >
            CHANGE
          </Button>
        </div>
      </div>
    </>
  );
};
export default Forget;
