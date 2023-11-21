import "./Profile.css";

export default function Profile() {
    return (
        <div className="profile">
            <div className="title">Profile Information</div>
            <div className="profileInfo">
                <div className="photoProfile">
                    <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png" className="photoProfile"></img>
                </div>
                <div className="info">
                    <div className="firstField">
                        <div className="side">Email:</div>
                        <div className="side">dinkoproto2@gmail.com</div>
                    </div>
                    <div className="secondField">
                        <div className="side">Full Name:</div>
                        <div className="side">Gospodin Gospodinov</div>
                    </div>
                    <div className="thirdField">
                        <div className="side">Username:</div>
                        <div className="side">dinkichae</div>
                    </div>
                    <div className="controls">
                        <button className="EditProfile">Edit Profile</button>
                        <button className="DeleteProfile">Delete Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}