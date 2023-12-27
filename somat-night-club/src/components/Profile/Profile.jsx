import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getFirestore,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { deleteUser, getAuth } from "firebase/auth";
import AuthContext from "../../Contexts/authContext";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

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
        ErrorNotify("User profile not found");
        return null;
      }
    } catch (error) {
      ErrorNotify("Error getting user profile:" + error.message);
      return null;
    }
  };
  const handleDelete = async () => {
    try {
      await deleteUser(auth.currentUser);
      const userDocRef = doc(db, "users", profileId);
      await deleteDoc(userDocRef);
      logoutHandler();
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } catch (error) {
      ErrorNotify("Error deleting user:" + error.message);
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

  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        try {
          const userRef = doc(db, "users", profileId);
          await updateDoc(userRef, { pfp: url });
          const profile = await getUserProfileByUid(profileId);
      setUserProfile(profile);
        } catch (error) {
          let errors = Error(error);
          errors.forEach((err) => {
            ErrorNotify(err);
          });
          return;
        }
      });
      SuccessNotify("Image uploaded successfully!");
    });
  };

  return (
    <div className="profile">
      <div className="title">Profile Information</div>
      <div className="profileInfo">
        <div className="photoProfile">
          <img src={userProfile.pfp} />
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
            <div
              className="file-upload-wrapper"
              data-text={
                imageUpload !== null ? imageUpload.name : "Select your file!"
              }
            >
              <input
                name="file-upload-field"
                type="file"
                className="file-upload-field"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            <button onClick={uploadImage} className="UploadImage">
              Upload
            </button>
            </div>
            <button
              onClick={() => navigate(`/profile/${userProfile.uid}/edit`)}
              className="EditProfile"
            >
              Edit Profile
            </button>
            <button onClick={handleDelete} className="DeleteProfile">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
