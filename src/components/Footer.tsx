import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img src="./logo.png" alt="Aromamor logo" style={{ width: 64, height: 64, borderRadius: 16, objectFit: "cover" }} />
          <div>
            <div className="footer-brand-name">Aromamor</div>
            <p className="muted tiny">Hand-poured • Travel-inspired scents</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Shop</div>
            <Link to="/#collection">All Candles</Link>
            <Link to="/#collection">New Arrivals</Link>
            <Link to="/#collection">Bestsellers</Link>
            <Link to="/reviews">⭐ Reviews</Link>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Info</div>
            <Link to="/about">About Us</Link>
            <a href="#">Shipping &amp; Returns</a>
            <a href="#">Candle Care</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <a href="mailto:ImAmunch@ucf.edu">ImAmunch@ucf.edu</a>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap">
          <p className="muted tiny">© 2026 Aromamor. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" className="muted tiny">Privacy Policy</a>
            <a href="#" className="muted tiny">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}