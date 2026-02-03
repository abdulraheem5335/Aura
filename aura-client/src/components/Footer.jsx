import "../style/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div>
          <h2>Newsletter</h2>
          <p>Be the first one to know about discounts, offers and events</p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">AURA</div>
          <p>
            AURA is a registered trademark of AURA FASHION and has been in the fashion industry since 2020. We believe in satisfying customers through our quality and brilliant customer service.
          </p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
          <div className="footer-contact">
            <span>How can we help you? Let us know at</span>
            <a href="mailto:cs@aura.com.pk" className="footer-email">cs@aura.com.pk</a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3>Help</h3>
            <ul>
              <li><a href="#">Exchange & Return</a></li>
              <li><a href="#">Shipping & Handling</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3>About</h3>
            <ul>
              <li><a href="#">Corporate Orders</a></li>
              <li><a href="#">Store Locator</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h3>My Account</h3>
            <ul>
              <li><a href="#">Login</a></li>
              <li><a href="#">Checkout</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Aura. All Rights Reserved. Design & Developed By Aura Team</span>
        <div className="footer-payments">
          <img src="/visa.png" alt="Visa" />
          <img src="/mastercard.png" alt="Mastercard" />
          <img src="/unionpay.png" alt="UnionPay" />
        </div>
      </div>
    </footer>
  );
}
