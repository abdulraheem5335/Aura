import "../style/contact.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function Contact() {
  const [leftRef, leftVisible] = useScrollAnimation({ threshold: 0.1 });
  const [rightRef, rightVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="contact-wrapper" id="contact1">
      <div 
        ref={leftRef}
        className={`contact-left slide-in-left ${leftVisible ? 'visible' : ''}`}
      >
        <div className="contact">
          <h1>Get In Touch</h1>
          <p>
            We value open communication and are always eager to connect with our
            community. Whether you have questions about our collections,
            sustainability initiatives, or simply want to share your thoughts,
            we're here to listen and engage. Our dedicated customer experience
            team is available through multiple channels to ensure you receive
            prompt and personalized assistance. Feel free to reach out through
            the contact form, visit one of our flagship stores, or connect with
            us on social media platforms. For wholesale inquiries, collaboration
            proposals, or press-related matters, please specify in your message,
            and the appropriate department will get back to you. We strive to
            respond to all inquiries within 24-48 hours during business days.
          </p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" required></textarea>
          <input type="submit" value="Send Message" />
        </form>
      </div>
      <div 
        ref={rightRef}
        className={`contact-info slide-in-right ${rightVisible ? 'visible' : ''}`}
        style={{ transitionDelay: '200ms' }}
      >
        <h1>Contact Information</h1>

        <h2>Address</h2>
        <p>Nust University</p>
        <i className="fa-solid fa-location-dot"></i>
        <h2>phone</h2>
        <p>+92 123 456 7890</p>
        <i className="fa-solid fa-phone"></i>
        <h2>Email</h2>
        <p>hello@aurafashion.com</p>
        <i className="fa-solid fa-envelope"></i>
        <div className="social-links">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
