import { useState } from "react";
import Contact from "../components/Contact";

function ContactPage() {
  const [message, setMessage] = useState("");

  return (
    <section className="page-shell">
      <div className="container contact-grid">
        <div className="card-section">
          <Contact />
        </div>

        <div className="card-section">
          <div className="section-heading">
            <p className="eyebrow">Message</p>
            <h2>Say hello</h2>
          </div>

          <form>
            <label htmlFor="msg">Your message</label>
            <textarea
              id="msg"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell me about your idea, project, or just say hi..."
            />
            <button type="button" className="btn btn-primary">
              Send a note
            </button>
          </form>

          <p className="preview">Preview: {message || "Your message will appear here."}</p>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;