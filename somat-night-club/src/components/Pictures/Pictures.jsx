import "./Pictures.css";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Contexts/authContext";
const db = getFirestore();

export default function Pictures() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
   const AddPicture = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    values.owner = userId;
    try {
        const ref = collection(db, "pictures");
        await addDoc(ref, values);
        SuccessNotify('Congratulations, you have successfully added a new picture!')
        navigate('/gallery')
    } catch (error) {
       let errors =  Error(error);
       errors.forEach(err => {
            ErrorNotify(err);
       });
    }
   }
  return (
    <section className="listingHome">
      <form className="headingPictures" onSubmit={AddPicture}>
        <div className="title-picture">Add Picture</div>
        <div className="description">
          Fill in the required information about the picture you are listing.
          All fields are required.
        </div>
        <div className="firstInputField">
          <i className="fa-solid fa-user-secret icon"></i>
          <input
            type="text"
            name="title"
            className="InputField"
            placeholder="Title of the picture"
          ></input>
        </div>
        <div className="firstInputField">
          <i className="fa-solid fa-image icon"></i>
          <input
          type="text"
          name="image"
         className="photoPictures"
         placeholder="Image URL"
         ></input>
        </div>
        <div className="firstInputField">
          <input type="date" name="date" className="InputField"></input>
        </div>
        <div className="textareaDescription">
          <textarea
            rows="5"
            name="description"
            placeholder="Description about your picture.Tell us how the night went!"
            className="desc"
          ></textarea>
        </div>
        <button type="submit" className="Create">Create</button>
      </form>
    </section>
  );
}
