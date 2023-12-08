import "./noPage.css";
import  error  from "../../assets/error.gif"
import { Link } from "react-router-dom";

export default function noPage() {
    return (
        <div className="wrapper-404">
            <div className="error-title">
                Sorry!
            </div>
            <div className="description-404">
                We can&apos;t find the page you are looking for.
            </div>
            <img src={error} alt="" className="error-404"></img>
            <Link to="/" className="return-error">Return</Link>
        </div>
    );
}