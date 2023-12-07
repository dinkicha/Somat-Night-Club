import "./Reservations.css";
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { getFirestore} from 'firebase/firestore';
import { Error } from "../../utils/Error";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";
import { useContext } from "react";
import AuthContext from "../../Contexts/authContext";
const db = getFirestore();

export default function Reservations() {
    const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
   const CreateReservation = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    values.owner = userId;
    try {
        const ref = collection(db, "reservations");
        await addDoc(ref, values);
        SuccessNotify('Congratulations, you have successfully added a reservation!')
        navigate('/list')
    } catch (error) {
       let errors =  Error(error);
       errors.forEach(err => {
            ErrorNotify(err);
       });
    }
   }
    return (
        <div className="create-reservation">
            <form className="create-form" onSubmit={CreateReservation}>
                <label className="form-field">
                <span>Add a reservation:</span>
                    <div className="first-input-reservation">
                <i className="fa-solid fa-file-signature icon"></i>
                <input className="InputFieldReservation" name="name" required type="text" placeholder="Your Name:"></input>
                    </div>
                </label>
                <label className="form-field">
                    <span>How many people are you going to be?</span>
                    <div className="second-input-reservation">
                    <i className="fa-solid fa-person icon"></i>
                <input className="InputFieldReservation" required type="number" name="people" placeholder="Number of people"></input>
                    </div>
                </label>
                <label className="form-field">
                <span>Reservation details:</span>
                <textarea className="textAreaReservation" required type="text" name="details" placeholder="Details about the reservation:"></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                <input name="date" className="InputFieldReservation" required type="date"></input>
                </label>
                <div className="reservation-buttons">
                <button type="submit" className="create-reservation-button">Add</button>
                <button className="return-to-the-list"><Link to="/list">Return to the list</Link></button>
                </div>
            </form>
        </div>
    );
}