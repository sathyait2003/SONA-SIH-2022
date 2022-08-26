import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { TextInput } from "evergreen-ui";
import { queryAllByTestId } from "@testing-library/react";

export default function Queryresolve() {
  const [qids, setqids] = useState();
  const [finalqids, setFinalQuids] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/complainid/" + userid + "/")
      .then((res) => {
        console.log(res.data);
        setqids(res.data);
        console.log(qids);
        trans(res.data);
        //setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("qids", qids);
  }, [qids]);
  useEffect(() => {
    console.log("finalqids", finalqids);
  }, [finalqids]);

  const trans = (qids) => {
    console.log("trans is running");
    qids.map((qid, index) => {
      let dummy = { label: qid[0].toString(), id: index };

      setFinalQuids([...finalqids, dummy]);
    });
    console.log("finalquids", finalqids);
  };
  const [selection, setSelection] = useState(false);
  const [qid, setqid] = useState("");
  const [userid, setid] = useState("");
  //   const techCompanies = [
  //     { label: "Apple", value: 1 },
  //     { label: "Facebook", value: 2 },
  //     { label: "Netflix", value: 3 },
  //     { label: "Tesla", value: 4 },
  //     { label: "Amazon", value: 5 },
  //     { label: "Alphabet", value: 6 },
  //   ];
  const hello = () => {
    console.log("ambuj chumtiya");
  };
  return (
    <>
      <div style={{ height: "100vh", width: "100%", backgroundColor: "white" }}>
        <div
          style={{
            backgroundColor: "#00a69c",
            height: "90%",
            width: "80%",
            margin: "auto",
            marginTop: 20,
            padding: 20,
            boxShadow: "5px 5px 5px 5px #bbbbbb",
          }}
        >
          <h1
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "6rem",
            }}
          >
            QUERY RESOLUTION
          </h1>
          <h5>SELECT QUERY ID</h5>
          <Select
            style={{ width: "80%" }}
            options={qids}
            isSearchable
            onChange={(e) => {
              setqid(e.label);
              setSelection(true);
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
                <TextInput disabled style={{ width: 600 }} />

                <h6 style={{ color: "white", marginTop: 40 }}>
                  PROPOSED SOLUTION
                </h6>
                <TextInput
                  multiline={true}
                  style={{ height: 200, width: 600 }}
                />
                <br />
                <br />
                <button
                  style={{ marginLeft: "49%" }}
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
  );
}
