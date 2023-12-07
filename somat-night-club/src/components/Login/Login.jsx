import "./Login.css";
import { Link } from 'react-router-dom';

import { useContext } from "react";

import AuthContext from "../../Contexts/authContext";
import useForm from "../../hooks/useForm";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";


export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
       email: '',
       password: ''
    });
    return (
        <form className="wrapper2" onSubmit={onSubmit}>
        <h1>Sign in</h1>
            <input name="email" onChange={onChange} value={values.email} className="login-input" type="text" placeholder="Email"></input>
            <input name="password" onChange={onChange} value={values.password} className="login-input" type="text" placeholder="Password"></input>
        <button type="submit" className="Signin">Sign in</button>
        <div className="member">
        Not a member? <Link to="/register">Register Here</Link>
        </div>
    </form>
    );
}

