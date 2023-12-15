import "./Gallery.css";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import AuthContext from "../../Contexts/authContext";
import { ErrorNotify } from "../../utils/Notification";

const db = getFirestore();

export default function Gallery() {
  const handleDelete = async (pictureId) => {
    try {
      const userDocRef = doc(db, "pictures", pictureId);
      await deleteDoc(userDocRef);
    } catch (error) {
      ErrorNotify("Error deleting picture:" + error.message);
    }
  };

  const { userId } = useContext(AuthContext);

  const [pictures, setPicture] = useState([]);

  useEffect(() => {
    let ref = collection(db, "pictures");

    const unsub = onSnapshot(ref, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setPicture(result);
    });

    return () => unsub();
  }, []);

  return (
    <>
      {pictures.length > 0 && (
        <div className="pictures-container">
          {pictures.map((p) => (
            <div key={p.id} className="picture">
              <img src={p.image}></img>
              <div className="picture-name">{p.title}</div>
              <div className="picture-date">{p.date}</div>
              {userId == p.owner && (
                <button
                  className="deletePicture"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
    </>
  );
}
