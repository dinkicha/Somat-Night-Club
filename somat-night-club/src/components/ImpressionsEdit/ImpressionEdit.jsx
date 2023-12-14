import "./ImpressionEdit.css";
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import { ErrorNotify, SuccessNotify } from '../../utils/Notification';
import { Link } from "react-router-dom";


const db = getFirestore();

export default function EditImpressions() {
  const { opinionId } = useParams();
  const [opinion, setImpression] = useState({
    id: "",
    details: "",
    title: "",
  });
  const navigate = useNavigate();

  const getEditListByUid = async (id) => {
    try {
      const ref = await getDoc(doc(db, `opinions`, id));
      if (ref.exists) {
        return ref.data();
      } else {
        ErrorNotify("Opinion not found");
        return null;
      }
    } catch (error) {
      ErrorNotify("Error getting Opinion:", error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const editList = await getEditListByUid(opinionId);
      setImpression(editList);
    };

    fetchUserProfile();
  }, [opinionId]);

  const EditImpression = async (e) => {
    e.preventDefault();
    try {
      const ImpressionRef = doc(db, "opinions", opinionId);
      await updateDoc(ImpressionRef, opinion);
      SuccessNotify("Updated impression!");
      navigate('/impressions');
    } catch (error) {
      let errors = Error(error);
      errors.forEach((err) => {
        ErrorNotify(err);
      });
    }
  };

  const onChange = (e) => {
      setImpression((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="opinion-container">
        <section className="listingOpinion">
        <form className="headingOpinion" onSubmit={EditImpression}>
          <div className="title-opinion">Give Opinion</div>
          <div className="description">
            Give your opinion about the club! <br></br>
            All fields are required.
          </div>
          <div className="firstInputField">
            <input
              type="text"
              onChange={onChange}
              value={opinion.title}
              name="title"
              className="InputField"
              placeholder="Give a title to your opinion"
              ></input>
          </div>
          <div className="textareaDescription">
            <textarea
              rows="5"
              onChange={onChange}
              value={opinion.description}
              name="description"
              placeholder="Tell us how the night went!"
              className="desc"
              ></textarea>
          </div>
          <button type="submit" className="Create">
            Edit
          </button>
          <button type='button' className="Create" onClick={() => navigate('/impressions')}>Cancel</button>

        </form>
      </section>
    </div>
  );
}
