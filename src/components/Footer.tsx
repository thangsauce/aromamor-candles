export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
            <img src="/logo.png" alt="Aromamor logo" style={{ width: 64, height: 64, borderRadius: 16, objectFit: "cover" }} />          <div>
            <div className="footer-brand-name">Aromamor</div>
            <p className="muted tiny">Hand-poured • Travel-inspired scents</p>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <div className="footer-col-title">Shop</div>
            <a href="/#collection">All Candles</a>
            <a href="/#collection">New Arrivals</a>
            <a href="/#collection">Bestsellers</a>
            <a href="/reviews">⭐ Reviews</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Info</div>
            <a href="/about">About Us</a>
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
            <a href="#" className="muted tiny">
              Privacy Policy
            </a>
            <a href="#" className="muted tiny">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
