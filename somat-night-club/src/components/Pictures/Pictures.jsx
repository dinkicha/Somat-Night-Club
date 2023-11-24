import "./Pictures.css";

export default function Pictures() {
  return (
    <section className="listingHome">
      <div className="headingPictures">
        <div className="title-picture">Add Picture</div>
        <div className="description">
          Fill in the required information about the picture you are listing.
          All fields are required.
        </div>
        <div className="firstInputField">
          <i className="fa-solid fa-user-secret icon"></i>
          <input
            type="text"
            className="InputField"
            placeholder="Title of the picture"
          ></input>
        </div>
        <div className="firstInputField">
          <i className="fa-solid fa-image icon"></i>
          <input type="text" placeholder="Image URL" className="InputField"></input>
        </div>
        <div className="firstInputField">
          <input type="date" className="InputField"></input>
        </div>
        <div className="textareaDescription">
          <textarea
            rows="5"
            placeholder="Description about your picture.Tell us how the night went!"
            className="desc"
          ></textarea>
        </div>
        <button type="submit" className="Create">Create</button>
      </div>
    </section>
  );
}
