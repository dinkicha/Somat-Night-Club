import { error } from "../../assets/error.gif"
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="wrapper-404">
            <div className="error-title">
                Sorry!
            </div>
            <div className="description-404">
                We can&apos;t find the page you are looking for.
            </div>
            <img src={error} alt=""></img>
            <Link to="/" className="return-error">Return</Link>
        </div>
    );
}