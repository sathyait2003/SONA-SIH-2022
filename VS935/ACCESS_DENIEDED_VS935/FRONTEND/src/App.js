import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Try from "./components/Try";
import Aboutus from "./components/Aboutus";
// import Homepage from "./components/Homepage/homepage";

// import Edit from "./components/Edit";
import Grievance from "./components/Grievance/Grievance";
import Queryresolve from "./components/Queryresolve";
import LoginAsAdminNav from "./components/adminnav/LoginAsAdminNav";
import AdminHome from "./components/AdminHome";
import AddResource from "./components/addresource/AddResource";
import AddDomain from "./components/AddDomain";
import Homepage from "./components/Homepage/homepage";
import Course from "./components/Course";
import Forget from "./components/Change";
import Edit from "./components/Edit";
import Gr from "./components/Gr";
import Product from "./components/Product";

function App() {
  // const user = localStorage.getItem("token");

  return (
    <>
    <Product/>
      {/* <Router>
        <Routes>
          <Route path="/mainnav" exact element={<Main />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/mainnav" element={<Navigate replace to="/login" />} />
          <Route path="/adminnav" exact element={<LoginAsAdminNav />} />
          <Route path="/adminhome" exact element={<AdminHome />} />
          <Route path="/addresource" exact element={<AddResource />} />
          <Route path="/adddomain" exact element={<AddDomain />} />
          <Route path="/homepage" exact element={<Homepage />} />
          <Route path="/addgrievance" exact element={<Grievance />} />
          <Route path="/courses" exact element={<Course />} />
          <Route path="/forget" exact element={<Forget />} />
          <Route path="/edit" exact element={<Edit />} />
          <Route path="/gr" exact element={<Gr />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
