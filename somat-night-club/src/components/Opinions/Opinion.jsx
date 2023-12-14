import "./Opinion.css";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../Contexts/authContext";
const db = getFirestore();

export default function Opinion() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const AddOpinion = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (values.title.length < 1) {
      return ErrorNotify("Title must be at least 1 character long");
    }

    if (values.description.length < 5) {
      return ErrorNotify("Message must be at least 5 character long");
    }

    e.currentTarget.reset();
    SuccessNotify("Your message has been send!");
    values.owner = userId;

    try {
        const ref = collection(db, "opinions");
        await addDoc(ref, values);
        SuccessNotify(
          "Congratulations, you have successfully added a new opinion!"
        );
        navigate("/Impressions");
      } catch (error) {
        let errors = Error(error);
        errors.forEach((err) => {
          ErrorNotify(err);
        });
      }
    };
    
    return (
      <section className="listingOpinion">
        <form className="headingOpinion" onSubmit={AddOpinion}>
          <div className="title-opinion">Give Opinion</div>
          <div className="description">
            Give your opinion about the club! <br></br>
            All fields are required.
          </div>
          <div className="firstInputField">
            <input
              type="text"
              name="title"
              className="InputField"
              placeholder="Give a title to your opinion"
              ></input>
          </div>
          <div className="textareaDescription">
            <textarea
              rows="5"
              name="description"
              placeholder="Tell us how the night went!"
              className="desc"
              ></textarea>
          </div>
          <button type="submit" className="Create">
            Create
          </button>
        </form>
      </section>
    );
  }

