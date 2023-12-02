import "./Register.css";
import { Link } from 'react-router-dom';

import { useContext } from "react";

import AuthContext from "../../Contexts/authContext";
import useForm from "../../hooks/useForm";

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
       email: '',
       username: '',
       name: '',
       password: '',
       confirmPassword: '',
    });
    return (
        <form className="wrapper" onSubmit={onSubmit}>
            <h1>Sign up</h1>
                <input name="email" onChange={onChange} value={values.email} className="login-input" type="text" placeholder="Email"></input>
                <input name="username" onChange={onChange} value={values.username} className="login-input" type="text" placeholder="Username"></input>
                <input name="name" onChange={onChange} value={values.name} className="login-input" type="text" placeholder="Name"></input>
                <input name="password" onChange={onChange} value={values.password} className="login-input" type="text" placeholder="Password"></input>
                <input name="confirmPassword" onChange={onChange} value={values.confirmPassword} className="login-input" type="text" placeholder="Confirm Password"></input>
            <button type="submit" className="Signup">Sign up</button>
            <div className="member">
            Already a member? <Link to="/login">Login Here</Link>
            </div>
        </form>
    );
}