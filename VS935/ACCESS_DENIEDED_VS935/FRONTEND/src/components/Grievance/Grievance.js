import React, { useState, useContext } from "react";
import { TextInput } from "evergreen-ui";
import "./grievance.css";
import { useEffect } from "react";
import axios from "axios";
import Main from "../Main";
export default function Grievance() {
  const complaints = [
    ["complaint1", "ans1", "s"],
    ["compalint2", "ans2", "inq"],
    ["complaint3", "ans3", "up"],
    ["complaint4", "ans4", "s"],
    ["complaint5", "ans5", "inq"],
    ["complaint6", "ans6", "up"],
  ];
  const [page, setPage] = useState("register");
  const [IN, setIN] = useState("");
  const [CN, setCN] = useState("");
  const [AN, setAN] = useState("");
  const [complain, setComplain] = useState("");
  console.log("page", page);

  const handleChangedate = (event) => {
    setIN(event.target.value);

    console.log("value is:", IN);
  };
  const handleChangecomplain = (event) => {
    setComplain(event.target.value);

    console.log("value is:", complain);
  };
  const handleChangeuserid = (event) => {
    setAN(event.target.value);

    console.log("value is:", AN);
  };
  async function submitcomplain() {
    console.log(IN + " " + AN + " " + complain);

    await axios
      .post("http://127.0.0.1:8000/add_complain/", {
        date: IN,
        complaint: complain,
        userid: AN,
        status: "0",
      })
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "white" }}>
        <div
          style={{
            width: "50%",
            height: "90%",
            margin: "auto",
            backgroundColor: "#00a69c",
            boxShadow: "5px 5px 5px 5px #bbbbbb",
            maxHeight: 650,
            overflow: "scroll",
          }}
        >
          <h1 style={{ color: "white" }}>Grievance System</h1>
          <div style={{ display: "flex", width: "100%", marginTop: -30 }}>
            <div
              style={{
                backgroundColor: page == "register" ? "white" : "#00a69c",
                width: "50%",
                marginBottom: 5,
              }}
            >
              <button
                style={{
                  textAlign: "center",
                  borderStyle: "none",
                  backgroundColor: page == "register" ? "white" : "#00a69c",
                  color: page == "register" ? "#00a69c" : "white",
                }}
                onClick={() => {
                  setPage("register");
                }}
              >
                Register
              </button>
            </div>
            <div
              style={{
                backgroundColor: page == "track" ? "white" : "#00a69c",
                width: "50%",
                marginBottom: 5,
              }}
            >
              <button
                style={{
                  borderStyle: "none",
                  backgroundColor: page == "track" ? "white" : "#00a69c",
                  color: page == "track" ? "#00a69c" : "white",
                }}
                onClick={() => {
                  setPage("track");
                }}
              >
                Track
              </button>
            </div>
          </div>

          {page === "register" && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginRight: 40 }}>
                  <h3>Date (DD-MM-YYYY)</h3>
                  <TextInput
                    style={{ height: 50 }}
                    onChange={handleChangedate}
                    placeholder="Enter Date"
                  />
                  {/* <h3>COMPLAINT</h3>
                <TextInput
                  style={{ height: 50 }}
                  onChange={(e) => setCN(e.target.value)}
                  placeholder="Enter your Complaint"
                /> */}
                  <h3>USERID</h3>
                  <TextInput
                    style={{ height: 50 }}
                    onChange={handleChangeuserid}
                    placeholder="Enter UserId"
                  />
                </div>
                <div>
                  <h3>COMPLAIN</h3>
                  <TextInput
                    multiline={true}
                    style={{ height: 280, width: 300 }}
                    onChange={handleChangecomplain}
                    placeholder="Enter complain"
                  />
                </div>
              </div>
              <button
                onClick={submitcomplain}
                style={{
                  backgroundColor: "white",
                  fontSize: 14,
                  color: "#00a69c",
                  marginTop: 10,
                  borderStyle: "none",
                  borderRadius: 9,
                }}
              >
                <h3 style={{ marginTop: 4 }}>SUBMIT</h3>
              </button>
            </>
          )}

          {console.log("complains", complaints)}

          {page === "track" && (
            <>
              {complaints.map((complain) => {
                console.log("complain", complain);
                return (
                  <>
                    <div
                      style={{
                        backgroundColor:
                          complain[2] == "s"
                            ? "lightgreen"
                            : complain[2] == "up"
                            ? "gold"
                            : "red",
                        width: "71%",
                        alignSelf: "center",
                        height: 13,
                        borderTopLeftRadius: 23,
                        borderTopRightRadius: 23,
                        textAlign: "center",
                        padding: 10,
                        margin: "auto",
                        marginTop: 10,
                      }}
                    >
                      <h3
                        style={{ color: "white", fontSize: 15, marginTop: -5 }}
                      >
                        {complain[2] == "s"
                          ? "Solved"
                          : complain[2] == "up"
                          ? "Under Processing"
                          : "In Queue"}
                      </h3>
                    </div>
                    <div
                      style={{
                        width: "70%",
                        height: 80,
                        backgroundColor: "white",

                        padding: 15,
                        borderBottomLeftRadius: 23,
                        borderBottomRightRadius: 23,
                        margin: "auto",
                        marginBottom: 10,
                      }}
                    >
                      <p>{complain[0]}</p>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
