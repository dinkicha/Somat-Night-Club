import "./Register.css";
import { Link } from 'react-router-dom';


export default function Register() {
    return (
        <div className="wrapper">
            <h1>Sign up</h1>
            <form action="#">
                <input type="text" placeholder="Username"></input>
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Password"></input>
                <input type="text" placeholder="Confirm Password"></input>
            </form>
            <div className="terms">
            <input type="checkbox" id="checkbox"></input>
            <label form="checkbox"> I agree to these <a href="#">Terms & Conditions</a></label>
            </div>
            <button>Sign up</button>
            <div className="member">
            Already a member? <Link to="/login">Login Here</Link>
            </div>
        </div>
    );
}