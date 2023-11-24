import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import "./Header.css";

export default function Header() {
    return (
        <header>
        <img src={logo} className='logo'></img>
        <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/pictures">Pictures</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/reservations">Reservation</Link>
            <Link to="/list">List</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <span></span>
        </nav>
        </header>
    );
}