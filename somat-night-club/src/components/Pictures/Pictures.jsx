import "./Pictures.css"

export default function Pictures() {
    return (
        <section className="listingHome">
            <div className="headingPictures">
                <div className="title">Add Picture</div>
                <div className="description">Fill in the required information about the picture you are listing. All fields are required.</div>
                <div className="firstInputField">
                <i className="fa-solid fa-user-secret"></i>
                <input type="text" className="inputFieldTitlePictures" placeholder="Title of the picture"></input>
                </div>
                <div className="secondInputFieldData">
                <i className="fa-regular fa-calendar"></i>
                <input type="date" className="datePicker"></input>
                </div>
                <div className="textareaDescription">
                    <textarea rows="5" placeholder="Description about your picture.Tell us how the night went!" className="desc"></textarea>
                </div>
            </div>
        </section>
    );
}