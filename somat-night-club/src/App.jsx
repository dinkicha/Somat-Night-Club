import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Pictures from "./components/Pictures/Pictures";
import Gallery from "./components/Gallery/Gallery";
import Reservations from "./components/Reservations/Reservations";
import List from "./components/List/List";
import Details from "./components/Details/Details";
import Edit from "./components/EditProfile/Edit";
import Logout from "./components/LogOut/Logout";
import { AuthProvider } from "./Contexts/authContext";
import { Toaster } from "react-hot-toast";
import EditList from "./components/EditList/ListEdit";
import Error from "./components/Error/noPage"
import AuthGuard from "./components/Guards/auth";
 
function App() {
  return (
    <AuthProvider>
      <div className="container">
      <Toaster
  position="bottom-right"
  reverseOrder={true}
/>
        <Header />
        <Routes>

        <Route element={<AuthGuard authenticated={true} />}>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/pictures" element={<Pictures />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:reservationId/edit" element={<EditList />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/list/:reservationId/details" element={<Details />} />
          <Route path="/profile/:profileId/edit" element={<Edit />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
