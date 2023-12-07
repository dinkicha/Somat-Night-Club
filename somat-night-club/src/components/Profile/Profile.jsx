import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getFirestore, getDoc, deleteDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { deleteUser, getAuth } from "firebase/auth";
import AuthContext from "../../Contexts/authContext";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid";
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
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user:", error.message);
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
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, { url, id: uuidv4() }]);
      });
      SuccessNotify("Image uploaded successfully!");
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, [imageListRef]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await listAll(imageListRef);
        const urls = await Promise.all(
          response.items.map(async (item) => getDownloadURL(item))
        );
        setImageList((prev) => [...prev, ...urls]);
      } catch (error) {
        console.error("Error fetching images:" + error);
      }
    };
  
    fetchImages();
  }, []); 

  return (
    <div className="profile">
      <div className="title">Profile Information</div>
      <div className="profileInfo">
        <div className="photoProfile">
        <img src={imageList}/>
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
          <button onClick={uploadImage} className="UploadImage">Upload Image</button>
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
      <div className="photoProfileSelect">
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      </div>
    </div>
  );
}


