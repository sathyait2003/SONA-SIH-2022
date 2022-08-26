import * as React from "react";
import img from "../images/change.jpg";
import { TextInput, Button } from "evergreen-ui";
const Forget = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#00a69c",
          height: "85vh",
          width: "26%",
          marginTop: 30,
          margin: "auto",

          padding: 30,
          boxShadow: "15px 10px 30px 10px #bbbbbb",
        }}
      >
        <div>
          <img
            src={img}
            style={{
              width: 100,
              height: 100,
              marginLeft: 120,
              borderRadius: 40,
            }}
          />
          <br />
          <br />
          <h2 style={{ color: "black", marginLeft: 20 }}>FORGET PASSWORD</h2>
        </div>
        <div style={{ marginTop: 60, marginLeft: 5 }}>
          <h3 style={{ color: "white" }}>Enter Email</h3>
          <TextInput
            placeholder="Enter Email"
            style={{ height: 45, width: 300, borderRadius: 20 }}
          />
        </div>

        <br />
        <br />
        <Button
          marginLeft={120}
          intent="success"
          style={{
            width: 100,
            height: 50,
            fontSize: 25,
            color: "#00a69c",
            borderRadius: 20,
          }}
        >
          Send
        </Button>
      </div>
    </>
  );
};
export default Forget;
