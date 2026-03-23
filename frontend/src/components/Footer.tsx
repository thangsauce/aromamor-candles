import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card dark:bg-brand-card-dark border-t border-brand-line dark:border-brand-line-dark mt-auto">
      <div className="max-w-[1100px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Aromamor logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-semibold text-brand-text dark:text-brand-text-dark">Aromamor</span>
          </div>
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Hand-poured • Travel-inspired scents</p>
        </div>

        {/* Col 2: Shop */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Shop</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">All Candles</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">New Arrivals</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">Bestsellers</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/reviews">⭐ Reviews</Link>
        </div>

        {/* Col 3: Info */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Info</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/about">About Us</Link>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Shipping &amp; Returns</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Candle Care</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">FAQ</a>
        </div>

        {/* Col 4: Contact */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Contact</div>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="mailto:ImAmunch@ucf.edu">ImAmunch@ucf.edu</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Instagram</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">TikTok</a>
        </div>
      </div>

      <div className="border-t border-brand-line dark:border-brand-line-dark">
        <div className="max-w-[1100px] mx-auto px-4 py-4 flex flex-wrap justify-between gap-2">
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">© 2026 Aromamor. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Privacy Policy</a>
            <a className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
