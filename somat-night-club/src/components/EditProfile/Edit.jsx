import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Contexts/authContext";
import { getDoc } from "firebase/firestore";
import { Error } from "../../utils/Error";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";
import { getAuth, updateProfile as updateFirebaseProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export default function Edit() {
  const { profileId } = useParams();
  const [user, setUser] = useState({
    uid: "",
    username: "",
    name: "",
  });
  const navigate = useNavigate();

  const getUserProfileByUid = async (uid) => {
    try {
      const ref = await getDoc(doc(db, `users`, uid));
      if (ref.exists) {
        return ref.data();
      } else {
        ErrorNotify("User profile not found");
        return null;
      }
    } catch (error) {
      ErrorNotify("Error getting user profile:" + error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfileByUid(profileId);
      setUser(profile);
    };

    fetchUserProfile();
  }, [profileId]);

  const EditProfile = async (e) => {
    e.preventDefault();

    try {
      await updateFirebaseProfile(auth.currentUser, user);
      const userRef = doc(db, "users", profileId);
      await updateDoc(userRef, user);
      SuccessNotify("Updated profile!");
      navigate("/profile/" + profileId);
    } catch (error) {
      let errors = Error(error);
      errors.forEach((err) => {
        ErrorNotify(err);
      });
    }
  };

  const onChange = (e) => {
    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="wrapper" onSubmit={EditProfile}>
      <h1>Edit Profile</h1>
      <input
        name="username"
        onChange={onChange}
        value={user.username}
        className="login-input"
        type="text"
        placeholder="Username"
      ></input>
      <input
        name="displayName"
        onChange={onChange}
        value={user.displayName}
        className="login-input"
        type="text"
        placeholder="Name"
      ></input>
      <button type="submit" className="Signup">
        Save
      </button>
      <div className="member">
        <button
          type="button"
          className="Signup"
          onClick={() => navigate(`/profile/${profileId}`)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
