import "./Impressions.css";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/authContext";
import { ErrorNotify } from "../../utils/Notification";

const db = getFirestore();

export default function Impressions() {
  const handleDelete = async (opinionId) => {
    try {
      const userDocRef = doc(db, "opinions", opinionId);
      await deleteDoc(userDocRef);
    } catch (error) {
      ErrorNotify("Error deleting opinion:" + error.message);
    }
  };

  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const [opinions, setOpinion] = useState([]);

  useEffect(() => {
    let ref = collection(db, "opinions");

    const unsub = onSnapshot(ref, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setOpinion(result);
    });

    return () => unsub();
  }, []);

  return (
    <>
      {opinions.length > 0 && (
        <div className="opinion-list">
          {opinions.map((o) => (
            <div key={o.id} className="opinion">
              <div className="opinion-name">{o.title}</div>
              <div className="desctription-opinion">{o.description}</div>
              {userId == o.owner && (
                <div className="controls">
                  <button
                    className="deleteOpinion"
                    onClick={() => handleDelete(o.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="editOpinion"
                    onClick={() => navigate(`/impressions/${o.id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
