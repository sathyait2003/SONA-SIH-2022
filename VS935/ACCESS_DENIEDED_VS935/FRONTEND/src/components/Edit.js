import * as React from "react";
import img from "../images/logo1.png";
import { TextInput, Button } from "evergreen-ui";
import Select from "react-dropdown-select";
import { useState, useEffect } from "react";
import axios from "axios";
import Main from "./Main";

const Edit = () => {
  const [userid, setuserid] = useState("000001");
  const [name, setname] = useState("");
  const [college, setcollege] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [mob, setmob] = useState("");
  const [collegeid, setcollegeid] = useState("");
  const [courses, setcourses] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/view_profile/" + userid + "/")
      .then((res) => {
        console.log(res.data);
        setuserid(res.data[0]);
        setname(res.data[1]);
        setcollege(res.data[2]);
        setemail(res.data[4]);
        setmob(res.data[5]);
        setcollegeid(res.data[6]);
        setgender(res.data[3]);
        //setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangename = (event) => {
    setname(event.target.value);

    console.log("value is:", name);
  };
  const handleChangecollege = (event) => {
    setcollege(event.target.value);

    console.log("value is:", college);
  };
  const handleChangeemail = (event) => {
    setemail(event.target.value);

    console.log("value is:", email);
  };
  const handleChangemob = (event) => {
    setmob(event.target.value);

    console.log("value is:", mob);
  };
  const handleChangegender = (event) => {
    setgender(event.target.value);

    console.log("value is:", gender);
  };

  async function editprofile() {
    console.log("ok called");
    await axios
      .post("http://127.0.0.1:8000/edit_profile/", {
        college_name: college,
        name: name,
        gender: gender,
        email: email,
        mobile_no: mob,
        userid: userid,
      })
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <>
      <div>
        <Main></Main>
      </div>
      <div
        style={{
          backgroundColor: "#334249",
          height: "120vh",
          width: "26%",
          marginTop: 30,
          margin: "auto",
          alignItems: "center",
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
              borderRadius: 50,
            }}
          />
          <br />
        </div>
        <h2 style={{ color: "black", marginLeft: 30 }}>EDIT PROFILE</h2>
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          User Id :
        </h3>
        <TextInput
          disabled
          value={userid}
          style={{ height: 35, width: 300, borderRadius: 20 }}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          Name :
        </h3>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChange={handleChangename}
          style={{ height: 35, width: 300, borderRadius: 20 }}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          College Name :
        </h3>
        <TextInput
          value={college}
          placeholder="Enter College Name"
          style={{ height: 35, width: 300, borderRadius: 20 }}
          onChange={handleChangecollege}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          Gender :
        </h3>
        <div className="container-sm py-3" style={{ marginTop: -16 }}>
          <div
            className="input-group mb-3"
            style={{
              width: 300,
              height: 35,
              marginLeft: -11,
              borderRadius: 40,
            }}
          >
            <select
              className="form-select"
              id="inputGroupSelect01"
              style={{ borderRadius: 20, color: "#D3D3D3" }}
              onChange={handleChangegender}
            >
              <option defaultValue={gender} style={{ color: "white" }}>
                Choose...
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>
        <h3
          style={{
            color: "white",
            marginTop: -20,
            marginLeft: 5,
            fontSize: 20,
          }}
        >
          Email :
        </h3>

        <TextInput
          placeholder="Enter Email"
          value={email}
          onChange={handleChangeemail}
          style={{ height: 35, width: 300, borderRadius: 20 }}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          Mobile Number :
        </h3>
        <TextInput
          value={mob}
          placeholder="Enter Mobile Number"
          onChange={handleChangemob}
          style={{ height: 35, width: 300, borderRadius: 20 }}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        >
          College Id :
        </h3>
        <TextInput
          disabled
          placeholder="Enter College Id"
          value={collegeid}
          style={{ height: 35, width: 300, borderRadius: 20 }}
        />
        <h3
          style={{ color: "white", marginTop: 8, marginLeft: 5, fontSize: 20 }}
        />
        <br />
        <br />
        <Button
          marginLeft={120}
          intent="success"
          style={{
            width: 80,
            height: 30,
            fontSize: 20,
            color: "#00a69c",
            borderRadius: 20,
          }}
          onClick={editprofile}
        >
          Edit
        </Button>
      </div>
    </>
  );
};
export default Edit;
