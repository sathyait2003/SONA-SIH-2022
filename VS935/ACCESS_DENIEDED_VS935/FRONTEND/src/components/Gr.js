import Select from "react-select";
import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { TextInput } from "evergreen-ui";
import axios from "axios";
import LoginAsAdminNav from "./adminnav/LoginAsAdminNav";
export default function Gr() {
  const [selection, setSelection] = useState(false);
  const [qid, setqid] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([
    ["878940"],
    ["565952"],
    ["445952"],
    ["928525"],
    ["123456"],
    ["000002"],
    ["000003"],
    ["000004"],
    ["000005"],
    ["000001"],
    ["000008"],
    ["741632"],
    ["000001"],
    ["000000"],
  ]);

  const [newdata, setNewData] = useState([]);
  const [finaldata, setFinalData] = useState([]);

  useEffect(() => {
    trans();

  }, []);


  useEffect(() => {
    if (count <= 1) {
      console.log("newdata in useEffect", newdata);
      const half = newdata.length / 2;
      const l = newdata.splice(0, half);
      console.log("l", l);
      setFinalData(l);
      setCount(count + 1);
    }
  }, [newdata]);

  const trans = () => {
    console.log("trans is running");
    data.map((d, index) => {
      console.log("test", d, index);
      setNewData((current) => [
        ...current,
        { label: d[0].toString(), id: index },
      ]);
    });
  };
const [prob,setprob]=useState("");
  async function hello1()
  {
     await axios
       .post("http://127.0.0.1:8000/get_complaint/", {
         userid: qid,
       })
       .then((response) => {
         console.log(response.data);
         setprob(response.data);
       });
  }
    async function hello() {
    console.log("dfg");
    await axios
      .post("http://127.0.0.1:8000/resolve_complain/", {
        userid: qid,
        solution: solution,
      })
      .then((response) => {
        console.log(response);
      });
    alert("Complaint Resolved Successfully");
  };
  const [userid, setuserid] = useState("000001");
const [solution,setsol]=useState("");
  const handleChange = (event) => {
    setsol(event.target.value);

    console.log("value is:", event.target.value);
  };
  return (
    <div style={{marginTop:-90}}>
      <LoginAsAdminNav></LoginAsAdminNav>
      <>
        <div></div>
        <div
          style={{ height: "100vh", width: "100%", backgroundColor: "white" }}
        >
          <div
            style={{
              backgroundColor: "#334249",
              height: "110%",
              width: "60%",
              margin: "auto",
              marginTop: 20,
              padding: 20,
              boxShadow: "5px 5px 5px 5px #bbbbbb",
            }}
          >
            <h1
              style={{
                color: "#c45338",
                textAlign: "center",
                marginBottom: "6rem",
              }}
            >
              QUERY RESOLUTION
            </h1>
            <h5 style={{ color: "#c45338" }}>SELECT QUERY ID</h5>
            <Select
              style={{ width: "80%" }}
              options={finaldata}
              isSearchable
              onChange={(e) => {
                
                setqid(e.label);
                setSelection(true);
                hello1();
              }}
            />
            {console.log("selection", selection, "qid", qid)}
            {selection && (
              <>
                <div
                  style={{
                    marginTop: 40,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <h6 style={{ color: "white" }}>PROBLEM STATEMENT</h6>
                  <TextInput disabled style={{ width: 600 }} value={prob} />

                  <h6 style={{ color: "white", marginTop: 40 }}>
                    PROPOSED SOLUTION
                  </h6>
                  <TextInput
                    multiline={true}
                    style={{ height: 200, width: 600 }}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <button
                    style={{
                      marginLeft: "49%",
                      padding: 6,
                      color: "#334249",
                      borderRadius: 6,
                    }}
                    onClick={() => {
                      hello();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
