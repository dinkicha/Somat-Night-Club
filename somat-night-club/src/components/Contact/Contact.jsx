import { collection } from "firebase/firestore";
import "./Contact.css";
import { useState } from "react";

export default function Contact() {


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const ref = collection(db, "messages");


       add(messagesRef, {
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
      });
  
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
      setSubject("");
    };

  return (
    <div className="Contact" onSubmit={handleSubmit}>
      <h1 className="Connect">Connect with us</h1>
      <p className="Touch">
        Need to get in touch with us? Fill out the form, so we can help you
        succeed!{" "}
      </p>
      <div className="contact-box">
        <div className="contact-left">
          <form>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input
                  className="input-contact"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ivan Petrov"
                ></input>
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input
                  className="input-contact"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="somatnightclub@gmail.com"
                ></input>
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input
                  className="input-contact"
                  type="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of the problem"
                ></input>
              </div>
            </div>
            <label>Message</label>
            <textarea
              rows="5"
              placeholder="Write your message!"
              value={message}
                  onChange={(e) => setMessage(e.target.value)}
              className="message"
            ></textarea>
            <button  type="submit" className="SendContact">
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
