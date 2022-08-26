import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import img1 from "./assets/profile.png";
import star1 from "./assets/1star.jpg";
import star2 from "./assets/2star.jpg";
import star3 from "./assets/3star.jpg";
import star4 from "./assets/4star.jpg";
import star5 from "./assets/5star.jpg";
import Modal from "react-modal";
import Main from "../Main";
import "./home.css";

const Homepage = () => {
  async function domain1() {
    await axios
      .get("http://127.0.0.1:8000/domain/")
      .then((res) => {
        console.log(res.data);
        setcourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get("http://127.0.0.1:8000/sort_rating/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    domain1();
  }, []);
  const items = [
    { id: 1, name: "angellist" },
    { id: 2, name: "codepen" },
    { id: 3, name: "envelope" },
    { id: 4, name: "etsy" },
    { id: 5, name: "facebook" },
    { id: 6, name: "foursquare" },
    { id: 7, name: "github-alt" },
    { id: 8, name: "github" },
    { id: 9, name: "gitlab" },
    { id: 10, name: "instagram" },
  ];

  const [courses, setcourses] = useState([
    ["Web-Development"],
    ["App-Dev"],
    ["Blockchain"],
    ["Web-3"],
    ["IOT"],
    ["NLP"],
    ["Cloud Computing"],
    ["Quantum Computing"],
    ["AI-ML"],
    ["AR-VR"],
    ["Mobile-Computing"],
  ]);

  const [cards, setcards] = useState([
    ["Cloud Computing", "NIT-T", "5", "Cloud Computing", "95", "000056", "CSE"],
    ["AR-VR is tech", "NIT-A", "5", "AR-VR", "88", "002500", "CSE"],
    ["Intro to QC", "NIT-S", "4", "Quantum Computing", "75", "000586", "CSE"],
    [
      "Loven with Meta Mask",
      "IIIT-N",
      "3",
      "Blockchain",
      "70",
      "000045",
      "CSE",
    ],
    ["Say Hi to W3", "IIT-K", "2", "Web-3", "60", "000896", "CSE"],
    ["Go Dart with Flutter", "IIIT-L", "4", "App-Dev", "50", "000003", "ECE"],
    ["Computer Speaks", "IIT-M", "5", "NLP", "45", "000076", "CSE"],
    ["AI is future", "NIT-W", "3", "AI-ML", "45", "002528", "CSE"],
    ["IOTICS", "IIT-J", "2", "IOT", "45", "000806", "CSE"],
    ["Intro to JS", "IIIT-H", "5", "Web-Dev", "100", "000001", "CSE"],
  ]);

  const radio_props = [
    { label: "Ratings ", value: 0 },
    { label: "Price : low to high", value: 1 },
    { label: "Price : high to low", value: 2 },
  ];

  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [SortBy, setSortBy] = useState("relevance");
  const [FilterBy, setFilterBy] = useState("paid");
  const [domain, setDomain] = useState("all");

  function openSortModal() {
    setSortModalOpen(true);
  }

  function closeSortModal() {
    setSortModalOpen(false);
  }
  function handleChange(e) {
    setSortBy(e.target.value);
  }
  function handleChangefilter(e) {
    setFilterBy(e.target.value);
  }
  async function hello() {
    console.log("bhag bsdk");
    await axios
      .get("http://127.0.0.1:8000/price_asc/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function hello1() {
    await axios
      .get("http://127.0.0.1:8000/price_desc/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function hello3() {
    await axios
      .get("http://127.0.0.1:8000/sort_rating/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function hello4() {
    await axios
      .get("http://127.0.0.1:8000/free/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function hello5() {
    await axios
      .get("http://127.0.0.1:8000/paid/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function hello6() {
    console.log("hi from ello6");

    await axios
      .get("http://127.0.0.1:8000/domain_wise/" + domain + "/")
      .then((res) => {
        console.log(res.data);
        setcards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      {/* ===============================================Modals================================================== */}
      <div>
        <Main></Main>
      </div>
      <Modal
        isOpen={sortModalOpen}
        onRequestClose={closeSortModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 style={{ color: "#c45338" }}>SORT BY</h2>
        <div style={{}}>
          <input
            type="radio"
            value="relevance"
            id="relevance"
            style={{ width: 20, height: 20 }}
            onChange={(e) => {
              handleChange(e);
            }}
            name="sortby"
            defaultChecked
          />
          <label for="relevance">&nbsp;&nbsp;Relevance</label>
          <br></br>

          <input
            type="radio"
            value="plh"
            id="plh"
            style={{ width: 20, height: 20 }}
            onChange={(e) => {
              handleChange(e);
              hello();
            }}
            name="sortby"
          />
          <label for="plh">&nbsp;&nbsp;Price: Low to high</label>
          <br></br>

          <input
            type="radio"
            value="phl"
            id="phl"
            style={{ width: 20, height: 20 }}
            onChange={(e) => {
              handleChange(e);
              hello1();
            }}
            name="sortby"
          />
          <label for="phl">&nbsp;&nbsp;Price: High to low</label>
        </div>
        <button
          onClick={() => setSortModalOpen(false)}
          style={{
            textAlign: "center",
            backgroundColor: "white",
            borderStyle: "none",
            color: "#c45338",
            marginTop: 20,
          }}
        >
          CLOSE
        </button>
      </Modal>

      <Modal
        isOpen={filterModalOpen}
        onRequestClose={() => setFilterModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 style={{ color: "#c45338" }}> FILTERS</h2>
        <div>
          <form style={{ alignItems: "center", justifyContent: "center" }}>
            <input
              type="radio"
              value="paid"
              id="paid"
              style={{ width: 20, height: 20 }}
              onChange={(e) => {
                handleChangefilter(e);
                hello5();
              }}
              name="paid"
              checked={FilterBy == "paid" ? true : false}
            />
            <label for="paid">&nbsp;&nbsp;Paid</label>

            <input
              type="radio"
              value="free"
              id="free"
              style={{ width: 20, height: 20, marginLeft: 40 }}
              onChange={(e) => {
                handleChangefilter(e);
                hello4();
              }}
              name="free"
              checked={FilterBy == "free" ? true : false}
            />
            <label for="free">&nbsp;&nbsp;Free</label>
          </form>
        </div>
        <button
          onClick={() => setFilterModalOpen(false)}
          style={{
            textAlign: "center",
            backgroundColor: "white",
            color: "#c45338",
            borderStyle: "none",
            marginTop: 20,
          }}
        >
          CLOSE
        </button>
      </Modal>

      {/* ===============================================ModalsEnd================================================ */}

      <div
        style={{ height: "100vh", width: "100%", backgroundColor: "#334249" }}
      >
        <div style={{ backgroundColor: "#334249" }} className="scrollmenu">
          <h2 style={{ fontSize: 40, textAlign: "center", color: "#c45338" }}>
            Courses
          </h2>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              cursor: "pointer",
            }}
          >
            {courses.map((course) => {
              return (
                <li
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}
                  onClick={() => {
                    setDomain(course[0]);
                    hello6();
                  }}
                >
                  {course[0]}
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                width: "50%",
                backgroundColor: "#334249",
                color: "white",
              }}
            >
              <button
                style={{
                  backgroundColor: "#334249",
                  color: "white",
                  width: "100%",
                  borderStyle: "none",
                }}
                onClick={() => {
                  openSortModal();
                }}
              >
                <h2 style={{ color: "#c45338" }}>SORT</h2>
              </button>
            </div>
            <div
              style={{
                width: "50%",
                backgroundColor: "#334249",
                color: "white",
                textAlign: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "#334249",
                  color: "white",
                  borderStyle: "none",
                  width: "100%",
                }}
                onClick={() => {
                  setFilterModalOpen(true);
                }}
              >
                <h2 style={{ color: "#c45338" }}>FILTER</h2>
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              height: "100vh",
              width: "90%",
              margin: "auto",
              padding: 20,
              backgroundColor: "white",
              opacity: 2,
              overflow: "scroll",
            }}
          >
            {cards.map((card) => {
              let imgsrc = "";
              if (card[2] == 1) imgsrc = star1;
              else if (card[2] == 2) imgsrc = star2;
              else if (card[2] == 3) imgsrc = star3;
              else if (card[2] == 4) imgsrc = star4;
              else if (card[2] == 5) imgsrc = star5;

              return (
                <>
                  <div
                    style={{
                      width: "96%",
                      height: 200,

                      marginBottom: 30,
                      borderStyle: "ridge",
                      padding: 20,
                      display: "flex",
                      boxShadow: "2px 2px 5px 5px #bbbbbb",
                    }}
                  >
                    <div
                      style={{
                        width: "25%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightStyle: "solid",
                        borderRightWidth: 2,
                        borderRightColor: "#bbbbbb",
                      }}
                    >
                      <img
                        src={img1}
                        style={{
                          height: 170,
                          width: 200,
                          alignSelf: "center",
                          marginTop: -45,
                        }}
                      />
                    </div>
                    <div style={{ padding: 20, width: "70%" }}>
                      <h2 style={{ color: "#00a69c" }}>{card[0]}</h2>
                      <p style={{ marginTop: -15 }}>{card[1]}</p>
                      <hr />
                      <hr style={{ marginTop: -3 }} />
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <div style={{ width: "100%" }}>
                          <img
                            src={imgsrc}
                            style={{ height: 40, width: 180, marginTop: -120 }}
                          />
                        </div>
                        <div
                          style={{
                            justifyContent: "flex-end",
                            marginLeft: 200,
                          }}
                        >
                          <p
                            style={{
                              fontSize: 16,
                              padding: 8,
                              backgroundColor:
                                card[4] > 0 ? "orange" : "lightgreen",
                              marginTop: -70,
                            }}
                          >
                            {card[4] > 0 ? "Paid" : "Free"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                </>
              );
            })}
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};
export default Homepage;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "5px 5px 5px 5px #bbbbbb",
    borderRadius: 8,
    padding: 40,
    alignItems: "center",
  },
};
