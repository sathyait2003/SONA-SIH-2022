import React from "react";
import "./Course.css";
import pic from '../images/logo1.png'

class Course extends React.Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Web Development",
        src: [
          // "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
        ],
        description: "UI/UX designing, html css tutorials",
        // "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 45,
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
      },
      {
        _id: "2",
        title: "Ethical Hacking",
        src: [
          // "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
          // "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
        ],
        description: "UI/UX designing, html css tutorials",
        // "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 65,
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
      },
      
    ],
    index: 0,
  };

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  //   componentDidMount(){
  //     const {index} = this.state;
  //     this.myRef.current.children[index].className = "active";
  //   }

  render() {
    const { products, index } = this.state;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-custom " style={{marginTop:-40}}>
          <div className="container-fluid" >
            <a className="navbar-brand" href="#">
              <img src={pic} alt="" width="30" height="24"></img>
              &nbsp;Siksha Vardhan
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active cls"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link cls" href="#">
                    Courses
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle cls"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item cls" href="#">
                        My Account
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item cls" href="#">
                        My Courses
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item cls" href="#">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item cls" href="#">
                        Forget Password
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex">
                <button
                  class="btn btn-danger cls"
                  style={{ backgroundColor: "#c45338" }}
                  type="submit"
                >
                  Admin
                </button>
              </form>
            </div>
          </div>
        </nav>
        <div className="app">
          {products.map((item) => (
            <div className="details" key={item._id}>
              <div className="big-img">
                <img
                  src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
                />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>{item.price}</span>
                </div>
                {/* <Colors colors={item.colors} /> */}

                <p>{item.description}</p>
                <p>{item.content}</p>

                {/* <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} /> */}

                {/* <Link to="/App"> */}
                <button className="cart">Info</button>

                {/* </Link> */}

                {/* <button className="cart" >Course Details</button> */}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Course;
