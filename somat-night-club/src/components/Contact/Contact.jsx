import "./Contact.css";

export default function Contact() {
    return (
        <div className="Contact">
            <h1 className="Connect">Connect with us</h1>
            <p className="Touch">Need to get in touch with us? Fill out the form, so we can help you succeed! </p>
            <div className="contact-box">
                <div className="contact-left">
                    <h3>Sent your request</h3>
                    <form>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Name</label>
                                <input type="text" placeholder="Ivan Petrov"></input>
                            </div>
                            <div className="input-group">
                                <label>Phone</label>
                                <input type="text" placeholder="+359 889016925"></input>
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" placeholder="somatnightclub@gmail.com"></input>
                            </div>
                            <div className="input-group">
                                <label>Subject</label>
                                <input type="text" placeholder="Subject of the problem"></input>
                            </div>
                        </div>
                        <label>Message</label>
                        <textarea rows="5" placeholder="Write your message!" className="message"></textarea>
                        <button type="submit" className="SendContact">SEND</button>
                    </form>
                </div>
            </div>
        </div>

    );
}