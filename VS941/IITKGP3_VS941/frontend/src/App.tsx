import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Auth from "./components/Auth";
import CasePage from "./components/CasePage";
import Login from "./components/Login";
import Schedule from "./components/Schedule";
import Search from "./components/Search";
import Signup from "./components/Signup";
import { useThemeContext } from "./hooks/useThemeContext";
import 'react-toastify/dist/ReactToastify.min.css';
import Analytics from "./components/Analytics";
import Alert from "./components/Alert";

function App() {
  const {colorMode} = useThemeContext()
  return (
    <MantineProvider theme={{colorScheme: colorMode, fontFamily: 'Poppins, sans serif'}}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={colorMode}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth><Outlet /></Auth>}>
            <Route index element={<Analytics />} />
            <Route path="home" element={<Analytics />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="search">
              <Route index element={<Search />} />
              <Route path=":hash" element={<CasePage />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/alert" element={<Alert />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
