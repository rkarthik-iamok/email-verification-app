import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/layouts/Footer";
import UserProfile from "./pages/UserProfile";
import RequiredAuth from "./components/RequiredAuth";

function App() {
  return (
    // <div className="flex flex-col justify-between h-screen">
    <div className="flex items-center justify-center min-h-screen">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<RequiredAuth component={Home} />} />
        {/* <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route
          path="/profile"
          element={<RequiredAuth component={UserProfile} />}
        />{" "}
        */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
