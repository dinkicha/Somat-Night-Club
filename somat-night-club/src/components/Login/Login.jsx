import "./Login.css";
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="wrapper">
        <h1>Sign in</h1>
        <form action="#">
            <input type="text" placeholder="Username"></input>
            <input type="text" placeholder="Password"></input>
        </form>
        <button>Sign in</button>
        <div className="member">
        Not a member? <Link to="/register">Register Here</Link>
        </div>
    </div>
    );
}

