import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  getFirestore,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { deleteUser, getAuth } from "firebase/auth";
import AuthContext from "../../Contexts/authContext";


const db = getFirestore();
const auth = getAuth();

export default function Profile() {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { logoutHandler } = useContext(AuthContext);
  const getUserProfileByUid = async (uid) => {
    try {
      const ref = await getDoc(doc(db, `users`, uid));
      //   const doc = await collection(db,'users').doc(uid).get();
      if (ref.exists) {
        return ref.data();
      } else {
        console.error("User profile not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting user profile:", error.message);
      return null;
    }
  };
  const handleDelete = async () => {
    try {
      await deleteUser(auth.currentUser);
      const userDocRef = doc(db, 'users', profileId);
      await deleteDoc(userDocRef);

      logoutHandler();
      // After successful deletion, redirect to sign-in page
      navigate('/login');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
  const [userProfile, setUserProfile] = useState({
    uid: "",
    email: "",
    displayName: "",
    username: "",
    pfp: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfileByUid(profileId);
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, [profileId]);
  console.log(userProfile);
  return (
    <div className="profile">
      <div className="title">Profile Information</div>
      <div className="profileInfo">
        <div className="photoProfile">
          <img
            src={
              userProfile.pfp ||
              "data:image/png;base64,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"
            }
            className="photoProfile"
          ></img>
        </div>
        <div className="info">
          <div className="firstField">
            <div className="side">Email:</div>
            <div className="side">{userProfile.email}</div>
          </div>
          <div className="secondField">
            <div className="side">Full Name:</div>
            <div className="side">{userProfile.displayName}</div>
          </div>
          <div className="thirdField">
            <div className="side">Username:</div>
            <div className="side">{userProfile.username}</div>
          </div>
          <div className="controls">
            <button
              onClick={() => navigate(`/profile/${userProfile.uid}/edit`)}
              className="EditProfile"
            >
              Edit Profile
            </button>
            <button onClick={handleDelete} className="DeleteProfile">Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
