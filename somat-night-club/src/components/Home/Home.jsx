import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="HomePage">
      <div className="title-home">
        About <span className="nightclub-name">Somat</span>
      </div>
      <p className="description">
        Somat Night Club is the first night club in Bulgaria that has his own
        site! You can make your own reservations here. Stop worrying about not
        answering your phone call, now you can make everything by yourself. You
        can edit, delete etc. the reservation if neccessary without any
        problems.
      </p>
      <div className="buttonsHome">
        <button className="SignupHome">
          <Link to="/register">Sign up</Link>
        </button>
        <button className="SigninHome">
          <Link to="/login">Sign in</Link>
        </button>
      </div>
      {/* <div className="allImages">
        <div className="title">Most liked pictures</div>
        <div className="images">
          <div className="image">
            <img src="/download.jpg"></img>
            <div className="image-info">
              <div className="side">Listed by:</div>
              <div className="side">dinkicha</div>
            </div>
            <div className="info">
              <div className="side">Listed on:</div>
              <div className="side">06/01/2005</div>
            </div>
          </div>
        </div>
    </div> */}
    </div>

  );
}
