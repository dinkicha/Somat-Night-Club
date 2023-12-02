import "./Edit.css";
import { Link } from 'react-router-dom';
 
export default function Edit() {
    return (
        <form className="wrapper">
        <h1>Edit Profile</h1>
            <input name="email"  className="login-input" type="text" placeholder="Email"></input>
            <input name="username"  className="login-input" type="text" placeholder="Username"></input>
            <input name="name"  className="login-input" type="text" placeholder="Name"></input>
        <button type="submit" className="Signup">Save</button>
        <div className="member">
            <Link to="/">Want to go to main page?</Link>
        </div>
    </form>
    );
}