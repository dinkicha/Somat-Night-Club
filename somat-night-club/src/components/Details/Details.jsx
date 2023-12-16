import "./Details.css";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Contexts/authContext";
import { ErrorNotify } from "../../utils/Notification";

const db = getFirestore();

export default function Details() {
  const navigate = useNavigate();
 
  const { reservationId } = useParams();
  const getReservationByUid = async (uid) => {
    try {
      const ref = await getDoc(doc(db, `reservations`, uid));
      //   const doc = await collection(db,'users').doc(uid).get();
      if (ref.exists) {
        return ref.data();
      } else {
       ErrorNotify("Reservation not found");
        return null;
      }
    } catch (error) {
      ErrorNotify("Error getting reservation:" + error.message);
      return null;
    }
  };
  const handleDelete = async () => {
    try {
      const userDocRef = doc(db, "reservations", reservationId);
      await deleteDoc(userDocRef);
      navigate("/list");
    } catch (error) {
     ErrorNotify("Error deleting reservation:" + error.message);
    }
  };
  const [reservation, setReservation] = useState({
    id: "",
    date: "",
    details: "",
    name: "",
    people: "",
  });

  const { userId } = useContext(AuthContext);


  useEffect(() => {
    const fetchUserProfile = async () => {
      const reservationGet = await getReservationByUid(reservationId);
      setReservation(reservationGet);
    };

    fetchUserProfile();
  }, [reservationId]);

  return (
    <div className="details-container">
      <div className="information-reservation-list">
        <div className="description-reservation">
          <p>Reservation details: {reservation.details}</p>
          <p>Created by: {reservation.name}</p>
          <p>People: {reservation.people}</p>
          <p>Reservation date: {reservation.date}</p>
          <div className="buttonsDetails">
          <button
              className="returnListDetails"
              onClick={() => navigate(`/list`)}
            >
              Return to the list
            </button>
            {userId == reservation.owner && (
              <>
            <button
              className="editDetails"
              onClick={() => navigate(`/list/${reservationId}/edit`)}
            >
              Edit
            </button>
            <button className="deleteReservation" onClick={handleDelete}>Delete
            </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
