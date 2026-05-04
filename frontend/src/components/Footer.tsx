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
      const maxDown = Math.max(availableDown - 8, 0);
      const desired = Math.min(1, clamped * 1.6) * maxDown;
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
      className="relative mt-auto min-h-[420px] overflow-hidden px-3 pb-[3.25rem] pt-[4.5rem] sm:min-h-[520px] sm:px-6 sm:pb-[4rem] sm:pt-[5.5rem]"
    >
      <img
        src={`${import.meta.env.BASE_URL}behind_footer.png`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,oklch(0.955_0.018_80),oklch(0.955_0.018_80/0))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.99_0.008_85/.03),oklch(0.99_0.008_85/.09))]" />
      <div
        ref={cardRef}
        className="relative mx-auto max-w-[1320px] overflow-hidden bg-[oklch(0.9_0.03_78/.84)] shadow-[0_28px_56px_oklch(0.24_0.03_48/.18)] will-change-transform motion-reduce:transform-none"
      >
        <div className="relative grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Aromamor logo"
                className="h-9 w-9 object-cover"
              />
              <span
                className="text-lg text-black"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Aromamor
              </span>
            </div>
            <p className="text-xs leading-relaxed text-black">
              Hand-poured · Travel-inspired scents
            </p>
          </div>

          {/* Col 2: Shop */}
          <div className="flex flex-col gap-3">
            <div className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-black">
              Shop
            </div>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/shop"
            >
              All Candles
            </Link>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/about"
            >
              Our Story
            </Link>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/reviews"
            >
              Kind Words
            </Link>
          </div>

          {/* Col 3: Help */}
          <div className="flex flex-col gap-3 md:-ml-14">
            <div className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-black">
              Help
            </div>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/faq"
            >
              FAQ
            </Link>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/shipping-returns"
            >
              Shipping &amp; Returns
            </Link>
            <Link
              className="text-sm text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
              to="/contact"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative border-t border-[oklch(0.84_0.04_74/.45)]">
          <div className="mx-auto flex flex-wrap justify-between gap-2 px-6 py-4">
            <p className="text-xs text-[oklch(0.18_0.02_72)]">
              © 2026 Aromamor. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                className="text-xs text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-xs text-[oklch(0.18_0.02_72)] transition hover:text-[oklch(0.32_0.08_60)]"
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
