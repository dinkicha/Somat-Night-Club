import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import { ErrorNotify, SuccessNotify } from '../../utils/Notification';
import { Link } from "react-router-dom";


const db = getFirestore();

export default function EditList() {
    const { reservationId } = useParams();
    const [reservation, setResevation] = useState({
      id: "",
      details: "",
      name: "",
      people: "",
      date: "",
    });
    const navigate = useNavigate();
  
    const getEditListByUid = async (id) => {
      try {
        const ref = await getDoc(doc(db, `reservations`, id));
        if (ref.exists) {
          return ref.data();
        } else {
          console.error("Reservation not found");
          return null;
        }
      } catch (error) {
        console.error("Error getting Reservation:", error.message);
        return null;
      }
    };
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        const editList = await getEditListByUid(reservationId);
        setResevation(editList);
      };
  
      fetchUserProfile();
    }, [reservationId]);
  
    const EditList = async (e) => {
      e.preventDefault();
      try {
        const listRef = doc(db, "reservations", reservationId);
        await updateDoc(listRef, reservation);
        SuccessNotify("Updated list!");
        navigate("/list/" + reservationId + '/details');
      } catch (error) {
        let errors = Error(error);
        errors.forEach((err) => {
          ErrorNotify(err);
        });
      }
    };
  
    const onChange = (e) => {
        setResevation((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    };

    return (
        <div className="create-reservation">
        <form className="create-form" onSubmit={EditList}>
            <label className="form-field">
            <span>Add a reservation:</span>
                <div className="first-input-reservation">
            <i className="fa-solid fa-file-signature icon"></i>
            <input className="InputFieldReservation" onChange={onChange} value={reservation.name} name="name" required type="text" placeholder="Your Name:"></input>
                </div>
            </label>
            <label className="form-field">
                <span>How many people are you going to be?</span>
                <div className="second-input-reservation">
                <i className="fa-solid fa-person icon"></i>
            <input className="InputFieldReservation" required type="number" onChange={onChange} value={reservation.people} name="people" placeholder="Number of people"></input>
                </div>
            </label>
            <label className="form-field">
            <span>Reservation details:</span>
            <textarea className="textAreaReservation" required type="text" onChange={onChange} value={reservation.details} name="details" placeholder="Details about the reservation:"></textarea>
            </label>
            <label>
                <span>Set due date:</span>
            <input name="date" onChange={onChange} value={reservation.date} className="InputFieldReservation" required type="date"></input>
            </label>
            <div className="reservation-buttons">
            <button type="submit" className="create-reservation-button">Edit</button>
            <button type='button' className="return-to-the-list" onClick={() => navigate(`/list/${reservationId}/details`)}>Cancel</button>
            </div>
        </form>
    </div>
    );
}