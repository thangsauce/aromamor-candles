import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card dark:bg-brand-card-dark border-t border-brand-line dark:border-brand-line-dark mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Aromamor logo" className="w-9 h-9 rounded-xl object-cover" />
            <span
              className="text-lg text-brand-text dark:text-brand-text-dark"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Aromamor
            </span>
          </div>
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark leading-relaxed">
            Hand-poured · Travel-inspired scents
          </p>
        </div>

        {/* Col 2: Shop */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark mb-1">Shop</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/shop">All Candles</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/about">About Us</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/reviews">Reviews</Link>
        </div>

        {/* Col 3: Support */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark mb-1">Support</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/faq">FAQ</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/shipping-returns">Shipping &amp; Returns</Link>
        </div>

        {/* Col 4: Contact */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark mb-1">Contact</div>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="mailto:margaritalinares@hotmail.com">margaritalinares@hotmail.com</a>
        </div>
      </div>

      <div className="border-t border-brand-line dark:border-brand-line-dark">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap justify-between gap-2">
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">© 2026 Aromamor. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/privacy-policy">Privacy Policy</Link>
            <Link className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
