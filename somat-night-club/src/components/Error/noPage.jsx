import "./noPage.css";
import  errorgif  from "../../assets/errorgif.webp"
import {  useNavigate } from "react-router-dom";


export default function noPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    return (
        <div className="wrapper-404">
            <div className="error-title">
                Sorry!
            </div>
            <img src={errorgif} alt="" className="error-404"></img>
            <button type="submit" className="returnError" onClick={() => navigate(`/`)}>Return</button>
            </div>
    )
}