import logo from '../../assets/logo.png'
import "./Header.css";

export default function Header() {
    return (
        <header>
        <img src={logo} className='logo'></img>
        <nav className="navigation">
            <a href="#">Home</a>
            <a href="#">Contact</a>
            <a href="#">Login</a>
            <a href="#">Register</a>
            <a href="#">Profile</a>
            <span></span>
        </nav>
        </header>
    );
}