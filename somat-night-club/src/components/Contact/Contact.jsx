// import { collection } from "firebase/firestore";
import "./Contact.css";
// import { useState } from "react";
import { ErrorNotify, SuccessNotify } from "../../utils/Notification";

const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
export default function Contact() {

  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [subject, setSubject] = useState("");
  // const [message, setMessage] = useState("");

  //   const handleSubmit = (e) => {
  //       e.preventDefault();

  //       const ref = collection(db, "messages");

  //      add(messagesRef, {
  //       name: name,
  //       phone: phone,
  //       email: email,
  //       subject: subject,
  //       message: message,
  //     });

  //     setName("");
  //     setEmail("");
  //     setMessage("");
  //     setPhone("");
  //     setSubject("");
  //   };

  function handleSubmit(e) {
    e.preventDefault();
    let formData = Object.fromEntries(new FormData(e.currentTarget));
    if (emailValidator.test(formData.email) == false) {
      return ErrorNotify("Email format is invalid");
    }
    if (formData.subject.length < 1) {
      return ErrorNotify("Please enter a subject");
    }
    if (formData.message.length < 1) {
      return ErrorNotify("Please enter a message");
    }
    if (formData.phone.length < 1) {
      return ErrorNotify("Please enter a phone");
    }
    if (formData.name.length < 1) {
      return ErrorNotify("Please enter a name");
    }
    e.currentTarget.reset();
    SuccessNotify("Your message has been send!")
  }

  return (
    <div className="Contact">
      <h1 className="Connect">Connect with us</h1>
      <p className="Touch">
        Need to get in touch with us? Fill out the form, so we can help you
        succeed!{" "}
      </p>
      <div className="contact-box">
        <div className="contact-left">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input
                  className="input-contact"
                  type="text"
                  name="name"
                  placeholder="Ivan Petrov"
                ></input>
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input
                  className="input-contact"
                  type="phone"
                  name="phone"
                  placeholder="+359 889016925"
                ></input>
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input
                  className="input-contact"
                  type="email"
                  name="email"
                  placeholder="somatnightclub@gmail.com"
                ></input>
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input
                  className="input-contact"
                  type="subject"
                  name="subject"
                  placeholder="Subject of the problem"
                ></input>
              </div>
            </div>
            <label>Message</label>
            <textarea
              rows="5"
              placeholder="Write your message!"
              className="message"
              name="message"
            ></textarea>
            <button type="submit" className="SendContact">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
