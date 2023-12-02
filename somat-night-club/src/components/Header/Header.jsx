import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";
import  AuthContext  from "../../Contexts/authContext";
import { useContext } from "react";
// import {logoutHandler} from ''

export default function Header() {
  const { isAuthenticated, userId } = useContext(AuthContext);
  return (
    <header>
      <img src={logo} className="logo"></img>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/gallery">Gallery</Link>
        {isAuthenticated && (
          <>
            <Link to="/pictures">Pictures</Link>
            <Link to="/reservations">Reservation</Link>
            <Link to="/list">List</Link>
            <Link to={`/profile/${userId}`}>Profile</Link>
            <Link to="/logout">Sign Out</Link>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <span></span>
      </nav>
    </header>
  );
}
