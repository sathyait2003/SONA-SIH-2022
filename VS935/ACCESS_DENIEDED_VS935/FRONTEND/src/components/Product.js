import React from "react";
import "./Product.css";
class Product extends React.Component {
  state = {
    products: [
      {
        _id: "1",
        title: "Web Development",
        src: [
          "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
          "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
          "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
          "https://www.upsieutoc.com/images/2020/06/27/img4.jpg",
        ],
        description: "UI/UX designing, html css tutorials",
        content:
          "Welcome to Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        price: 100,
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

  // componentDidMount(){
  //   const {index} = this.state;
  //   this.myRef.current.children[index].className = "active";
  // }

  render() {
    const { products, index } = this.state;
    return (
      <>
        <index />
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
                <a href="https://rzp.io/i/ZAmucSdnw">
                  <button className="cart">Buy</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Product;
