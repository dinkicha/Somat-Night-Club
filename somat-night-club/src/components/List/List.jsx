import "./List.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";

const db = getFirestore();

export default function List() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    let ref = collection(db, "reservations");

    const unsub = onSnapshot(ref, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setReservations(result);
    });

    return () => unsub();
  }, []);

  return (
    <>
    {reservations.length > 0 && (
    <div className="container-reservations">
      {reservations.map((r) => (
        <div key={r.id} className="list-reservations">
          <h3 className="name-reservation">{r.name}</h3>
          <div className="details-reservations">
            <p>{r.date}</p>
          </div>
          <div className="details-button-reservations">
            <button
              onClick={() => navigate(`/list/${r.id}/details`)}
              className="details-button-reserv"
            >
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
    )}
    </>
  );
}
