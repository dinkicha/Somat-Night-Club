import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Pictures from "./components/Pictures/Pictures";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes><Route path="/" element={<Home />} /></Routes>
      <Routes><Route path="/contact" element={<Contact />} /></Routes>
      <Routes><Route path="/login" element={<Login />} /></Routes>
      <Routes><Route path="/register" element={<Register />} /></Routes>
      <Routes><Route path="/profile" element={<Profile />} /></Routes>
      <Routes><Route path="/pictures" element={<Pictures />} /></Routes>
      <Footer />
    </div>
  );
}

export default App;
