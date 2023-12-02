import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, getFirestore, setDoc } from "firebase/firestore";

import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPdtpjZ5Z2JPX88aoDo622MeW5vuu93qM",
  authDomain: "somat-night-club.firebaseapp.com",
  databaseURL:
    "https://somat-night-club-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "somat-night-club",
  storageBucket: "somat-night-club.appspot.com",
  messagingSenderId: "521082571465",
  appId: "1:521082571465:web:c1d52817203f4c32d49b18",
};

const app = initializeApp(firebaseConfig);
const fireAuth = getAuth();
// console.log(app);
// const authFire = app.auth();
const db = getFirestore();

export const AuthProvider = ({
  // eslint-disable-next-line react/prop-types
  children,
}) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});

  // const loginSubmitHandler = async (values) => {
  //     const result = await authService.login(values.email, values.password);

  //     setAuth(result);

  //     localStorage.setItem('accessToken', result.accessToken);

  //     navigate(Path.Home);
  // };
  const loginSubmitHandler = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        fireAuth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      setAuth(user);
      localStorage.setItem("id", user.uid);
      navigate("/");
      return user;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  // const registerSubmitHandler = async (values) => {
  //     const result = await authService.register(values.email, values.password);

  //     setAuth(result);

  //     localStorage.setItem('accessToken', result.accessToken);

  //     navigate(Path.Home);
  // };

  const registerSubmitHandler = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        fireAuth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: values.name,
        username: values.username,
      };

      // Save the profile data to the database
      const ref = doc(db,`users`, user.uid);
      await setDoc(ref, userProfile);
      setAuth(user);
      localStorage.setItem("id", user.uid);
      navigate("/");
      return user;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  };

  // const logoutHandler = () => {
  //     setAuth({});
  //     localStorage.removeItem('accessToken');
  // };
  const logoutHandler = async () => {
    try {
      await signOut(fireAuth);
      setAuth({});
      localStorage.removeItem("Id");
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    email: auth.email,
    username: auth.username,
    name: auth.name,
    userId: auth.uid,
    isAuthenticated: !!auth.uid,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
