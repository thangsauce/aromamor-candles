import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const lastOffsetRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      const section = sectionRef.current;
      const card = cardRef.current;
      if (!section || !card) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Downward drift in this section; scrolling back up returns it clearly upward.
      const availableUp = card.offsetTop;
      const availableDown =
        section.clientHeight - (card.offsetTop + card.offsetHeight);
      const isMobile = window.innerWidth < 768;
      const maxDown = isMobile
        ? Math.max(availableDown - 30, 0)
        : Math.max(availableDown - 42, 0);
      const desired = Math.min(1, clamped * (isMobile ? 3.5 : 1.2)) * maxDown;
      const minUp = Math.max(-availableUp, 0);
      const bounded = Math.max(minUp, Math.min(maxDown, desired));

      if (lastOffsetRef.current !== bounded) {
        lastOffsetRef.current = bounded;
        card.style.transform = `translateY(${bounded}px)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative mt-auto min-h-[420px] overflow-hidden px-3 pb-14 pt-20 sm:min-h-[900px] sm:px-6 sm:pb-[4.5rem] sm:pt-[6.5rem]"
    >
      <img
        src={`${import.meta.env.BASE_URL}behind_footer.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,oklch(0.955_0.018_80),oklch(0.955_0.018_80)_28%,oklch(0.955_0.018_80/.78)_58%,oklch(0.955_0.018_80/.28)_82%,oklch(0.955_0.018_80/0))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[125%] bg-[linear-gradient(180deg,oklch(0.99_0.008_85/.03),oklch(0.99_0.008_85/.09))] sm:inset-0 sm:h-auto" />
      <div
        ref={cardRef}
        className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[28px] bg-[oklch(0.9_0.03_78/.84)] shadow-[0_28px_56px_oklch(0.24_0.03_48/.18)] will-change-transform motion-reduce:transform-none sm:rounded-[32px]"
      >
        <div className="relative grid grid-cols-3 gap-x-3 gap-y-3 px-4 py-4 sm:grid-cols-1 sm:gap-6 sm:px-6 sm:py-12 md:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="col-span-3 flex flex-col gap-1 sm:col-span-1 sm:gap-2 md:col-span-1">
            <span
              className="text-base text-black sm:text-lg"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Aromamor
            </span>
            <p className="max-w-xs text-[11px] leading-snug text-black sm:text-xs sm:leading-relaxed">
              Hand-poured · Travel-inspired scents
            </p>
          </div>

          {/* Col 2: Shop */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black sm:mb-1 sm:text-sm sm:tracking-[0.2em]">
              Shop
            </div>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/shop"
            >
              All Candles
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/reviews"
            >
              Reviews
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/about"
            >
              Our Story
            </Link>
          </div>

          {/* Col 3: About */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black sm:mb-1 sm:text-sm sm:tracking-[0.2em]">
              About
            </div>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/craftsmanship"
            >
              Craftsmanship
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/sustainability"
            >
              Sustainability
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/candle-care"
            >
              Candle Care
            </Link>
          </div>

          {/* Col 4: Help */}
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black sm:mb-1 sm:text-sm sm:tracking-[0.2em]">
              Help
            </div>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/faq"
            >
              FAQ
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/shipping-returns"
            >
              Shipping &amp; Returns
            </Link>
            <Link
              className="text-xs leading-tight text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-sm"
              to="/contact"
            >
              Visit Us
            </Link>
          </div>
        </div>

        <div className="relative border-t border-[oklch(0.84_0.04_74/.45)]">
          <div className="mx-auto flex flex-col items-start gap-1.5 px-4 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2 sm:px-6 sm:py-4">
            <p className="text-[11px] text-[oklch(0.18_0.02_72)] sm:text-xs">
              © 2026 Aromamor. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                className="text-[11px] text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-xs"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-[11px] text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)] sm:text-xs"
                to="/terms-of-service"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
