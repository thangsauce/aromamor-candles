import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Header() {
  const {
    totalQty,
    wishlist,
    searchOpen,
    cartOpen,
    wishlistOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    hideToast,
  } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isHoverReveal, setIsHoverReveal] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isStoryMenuOpen, setIsStoryMenuOpen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation =
    (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;
  const authModalOpen = location.pathname === "/login" || location.pathname === "/register";
  const modalBackgroundLocation = backgroundLocation ?? location;
  const homeHeader =
    location.pathname === "/" ||
    location.pathname === "/about" ||
    location.pathname === "/craftsmanship" ||
    location.pathname === "/sustainability" ||
    location.pathname === "/candle-care" ||
    location.pathname === "/reviews" ||
    location.pathname === "/shop";
  const anyMegaMenuOpen = isStoryMenuOpen || isShopMenuOpen;
  const solidHeaderBg = pastHero || mobileOpen || anyMegaMenuOpen;
  const forceSolidHeader = solidHeaderBg || isHoverReveal;
  const transparentHeader = !solidHeaderBg;
  const anyMobilePanelOpen = mobileOpen || searchOpen || cartOpen || wishlistOpen;
  const darkTransparentHeader =
    location.pathname === "/contact" || location.pathname === "/checkout";

  const textTone = transparentHeader
    ? darkTransparentHeader
      ? "text-brand-text hover:text-brand-accent"
      : "text-brand-bg hover:text-brand-accent-dark"
    : "text-brand-text hover:text-brand-accent dark:text-brand-text-dark dark:hover:text-brand-accent-dark";

  const openCart = () => {
    hideToast();
    setSearchOpen(false);
    setWishlistOpen(false);
    setCartOpen(true);
    setMobileOpen(false);
  };

  const openWishlist = () => {
    hideToast();
    setSearchOpen(false);
    setCartOpen(false);
    setWishlistOpen(true);
    setMobileOpen(false);
  };

  const openSearch = () => {
    hideToast();
    setCartOpen(false);
    setWishlistOpen(false);
    setSearchOpen(true);
    setMobileOpen(false);
  };

  const goToCollection = () => {
    if (location.pathname !== "/shop") {
      navigate("/shop");
    }

    setMobileOpen(false);
  };

  const closeMobilePanels = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  useEffect(() => {
    const updateHeaderState = () => {
      const next = window.scrollY > 8;
      setPastHero((prev) => (prev === next ? prev : next));
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [location.pathname, homeHeader]);

  useEffect(() => {
    setIsHoverReveal(false);
    setIsShopMenuOpen(false);
    setIsStoryMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateFooterVisibility = () => {
      if (window.innerWidth >= 768) {
        setFooterInView(false);
        return;
      }

      const footer = document.querySelector("footer");
      const next =
        footer?.getBoundingClientRect().top !== undefined &&
        footer.getBoundingClientRect().top <= window.innerHeight - 8;

      setFooterInView((prev) => (prev === next ? prev : next));
    };

    updateFooterVisibility();
    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);

    return () => {
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
    };
  }, [location.pathname]);

  return (
    <>
      {!homeHeader && <div aria-hidden="true" className="h-14 sm:h-16" />}
      {anyMobilePanelOpen && (
        <button
          type="button"
          aria-label="Close panel"
          onClick={closeMobilePanels}
          className="fixed inset-0 z-30 bg-[oklch(0.22_0.01_40/.12)] backdrop-blur-md md:hidden"
        />
      )}
      <header
        onMouseEnter={() => {
          if (!pastHero) setIsHoverReveal(true);
        }}
        onMouseLeave={() => setIsHoverReveal(false)}
        className={`fixed top-0 w-full overflow-hidden transition-[background-color,border-color,backdrop-filter,border-radius] duration-250 ${
          mobileOpen ? "z-50" : "z-20"
        } ${
          anyMobilePanelOpen
            ? "rounded-b-none bg-transparent backdrop-blur-0 md:rounded-b-[28px] md:bg-brand-card/94 md:backdrop-blur-sm md:dark:bg-brand-bg-dark/94"
            : solidHeaderBg
            ? "rounded-b-[28px] bg-brand-card/94 backdrop-blur-sm dark:bg-brand-bg-dark/94"
            : "rounded-b-none bg-transparent backdrop-blur-0"
        }`}
      >
      <div
        className={`overflow-hidden text-center text-xs font-semibold uppercase tracking-[0.18em] transition-[max-height,opacity,padding,border-color,background-color,color,border-radius] duration-300 ${
          anyMobilePanelOpen ? "hidden md:block" : ""
        } ${
          !pastHero
            ? homeHeader
              ? forceSolidHeader
                ? "max-h-10 rounded-b-none px-3 py-2 opacity-100 border-transparent bg-[oklch(0.6_0.095_68/.84)] text-[oklch(0.975_0.04_80)] md:px-6"
                : "mx-auto max-h-10 max-w-[1320px] rounded-b-[22px] px-3 py-2 opacity-100 border-transparent bg-[oklch(0.6_0.095_68/.84)] text-[oklch(0.975_0.04_80)] md:px-6"
              : forceSolidHeader
                ? "max-h-10 rounded-b-none px-3 py-2 opacity-100 border-transparent bg-[oklch(0.6_0.095_68/.48)] text-[oklch(0.975_0.04_80)] md:px-6"
                : "mx-auto max-h-10 max-w-[1320px] rounded-b-[22px] px-3 py-2 opacity-100 border-transparent bg-[oklch(0.6_0.095_68/.48)] text-[oklch(0.975_0.04_80)] md:px-6"
            : "max-h-0 rounded-b-none px-3 py-0 opacity-0 border-transparent bg-transparent text-transparent md:px-6"
        }`}
      >
        Destination candles now pouring
      </div>

      {homeHeader && solidHeaderBg && !anyMobilePanelOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-250 opacity-100"
        >
          <div className="h-full w-full rounded-b-[28px] bg-brand-card/94 backdrop-blur-sm dark:bg-brand-bg-dark/94" />
        </div>
      )}

      <div
        className={`mx-auto grid h-14 w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-2 bg-transparent px-3 transition-[opacity,transform] duration-300 sm:h-16 sm:gap-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] ${
          anyMobilePanelOpen
            ? "pointer-events-none -translate-y-full opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
            : "translate-y-0 opacity-100"
        }`}
      >
        <nav className="hidden items-center text-sm md:flex">
          <div
            className="relative"
            onMouseEnter={() => {
              setIsShopMenuOpen(true);
              setIsStoryMenuOpen(false);
            }}
            onMouseLeave={() => setIsShopMenuOpen(false)}
          >
            <button
              type="button"
              onClick={goToCollection}
              className={`px-3 py-1.5 font-medium uppercase tracking-[0.14em] transition ${textTone}`}
            >
              Shop
            </button>
          </div>
          <Link
            to="/reviews"
            className={`px-3 py-1.5 font-medium uppercase tracking-[0.14em] transition ${textTone}`}
          >
            Reviews
          </Link>
          <div
            className="relative"
            onMouseEnter={() => {
              setIsStoryMenuOpen(true);
              setIsShopMenuOpen(false);
            }}
            onMouseLeave={() => setIsStoryMenuOpen(false)}
          >
            <Link
              to="/about"
              className={`px-3 py-1.5 font-medium uppercase tracking-[0.14em] transition ${textTone}`}
            >
              Our Story
            </Link>
          </div>
        </nav>

        <Link to="/" className="flex items-center justify-center no-underline">
          <span
            className={`text-2xl tracking-wide transition-colors sm:text-3xl md:text-4xl ${
              transparentHeader
                ? darkTransparentHeader
                  ? "text-brand-text"
                  : "text-brand-bg"
                : "text-brand-text dark:text-brand-text-dark"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aromamor
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={openSearch}
            className={`hidden gap-1.5 px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:inline-flex md:items-center md:justify-center ${textTone}`}
            aria-label="Search"
          >
            <span>Search</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={openWishlist}
            className={`hidden px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:block ${textTone}`}
          >
            Saved ({wishlist.length})
          </button>
          <Link
            to="/login"
            replace={authModalOpen}
            state={{ backgroundLocation: modalBackgroundLocation }}
            className={`hidden px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:block ${textTone}`}
          >
            Account
          </Link>
          <button
            type="button"
            onClick={openCart}
            className={`hidden px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:block ${textTone}`}
          >
            <span>Cart ({totalQty})</span>
          </button>
          <button
            type="button"
            onClick={openCart}
            className={`px-2 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition md:hidden ${textTone}`}
          >
            Cart ({totalQty})
          </button>
          <button
            className={`ml-1 inline-flex items-center gap-2 px-2 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition md:hidden ${textTone}`}
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span>Menu</span>
            <span className="flex flex-col justify-center gap-1.5">
              <span
                className="block h-0.5 w-5 bg-current transition-transform"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translate(0, 5px)" : "",
                }}
              />
              <span
                className="block h-0.5 w-5 bg-current transition-opacity"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 bg-current transition-transform"
                style={{
                  transform: mobileOpen
                    ? "rotate(-45deg) translate(0, -5px)"
                    : "",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsShopMenuOpen(true)}
        onMouseLeave={() => setIsShopMenuOpen(false)}
        className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-200 ${isShopMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mx-auto w-full max-w-[1320px] overflow-hidden rounded-b-[32px] bg-brand-card/94 px-6 py-6 shadow-[0_18px_42px_oklch(0.2_0.02_72/.12)] backdrop-blur-sm dark:bg-brand-bg-dark/94">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_1fr]">
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-[minmax(240px,1fr)_minmax(220px,1fr)] gap-12">
                <div>
                  <p
                    className="mb-3 text-3xl text-[oklch(0.2_0.01_72)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Collections
                  </p>
                  <div className="flex flex-col gap-2 text-base text-[oklch(0.2_0.01_72)]">
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">All Candles</Link>
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Destination Collection</Link>
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Gift Picks</Link>
                  </div>
                </div>
                <div>
                  <p
                    className="mb-3 text-3xl text-[oklch(0.2_0.01_72)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Categories
                  </p>
                  <div className="flex flex-col gap-2 text-base text-[oklch(0.2_0.01_72)]">
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Coastal</Link>
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Cafe</Link>
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Warm Vanilla</Link>
                  </div>
                </div>
              </div>
              <Link
                to="/shop"
                className="mt-20 text-6xl leading-none text-[oklch(0.2_0.01_72)] transition hover:text-[oklch(0.38_0.08_64)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Shop
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}hero.png`}
                  alt="Shop collection visual"
                  className="h-[260px] w-full object-cover"
                />
                <Link
                  to="/shop?tab=gifts#collection"
                  className="mt-2 block text-4xl leading-none text-[oklch(0.2_0.01_72)] transition hover:text-[oklch(0.38_0.08_64)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Gifts
                </Link>
              </div>
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}contact_picture.png`}
                  alt="Shop category visual"
                  className="h-[260px] w-full object-cover"
                />
                <p
                  className="mt-2 text-4xl leading-none text-[oklch(0.2_0.01_72)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsStoryMenuOpen(true)}
        onMouseLeave={() => setIsStoryMenuOpen(false)}
        className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-200 ${isStoryMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mx-auto w-full max-w-[1320px] overflow-hidden rounded-b-[32px] bg-brand-card/94 px-6 py-6 shadow-[0_18px_42px_oklch(0.2_0.02_72/.12)] backdrop-blur-sm dark:bg-brand-bg-dark/94">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_1fr]">
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-[minmax(240px,1fr)_minmax(220px,1fr)] gap-12">
                <div>
                  <p
                    className="mb-3 text-3xl text-[oklch(0.2_0.01_72)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    About
                  </p>
                  <div className="flex flex-col gap-2 text-base text-[oklch(0.2_0.01_72)]">
                    <Link to="/craftsmanship" className="hover:text-[oklch(0.38_0.08_64)]">Craftsmanship</Link>
                    <Link to="/sustainability" className="hover:text-[oklch(0.38_0.08_64)]">Sustainability</Link>
                    <Link to="/contact" className="hover:text-[oklch(0.38_0.08_64)]">Visit Us</Link>
                  </div>
                </div>
                <div>
                  <p
                    className="mb-3 text-3xl text-[oklch(0.2_0.01_72)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Journal
                  </p>
                  <div className="flex flex-col gap-2 text-base text-[oklch(0.2_0.01_72)]">
                    <Link to="/candle-care" className="hover:text-[oklch(0.38_0.08_64)]">Candle Care Tips</Link>
                    <Link to="/about" className="hover:text-[oklch(0.38_0.08_64)]">Stories</Link>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="mt-20 text-6xl leading-none text-[oklch(0.2_0.01_72)] transition hover:text-[oklch(0.38_0.08_64)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Story
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}contact_picture.png`}
                  alt="Aromamor story visual"
                  className="h-[280px] w-full object-cover"
                />
                <Link
                  to="/shop"
                  className="mt-2 block text-4xl leading-none text-[oklch(0.2_0.01_72)] transition hover:text-[oklch(0.38_0.08_64)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Collections
                </Link>
              </div>
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}hero.png`}
                  alt="Aromamor editorial visual"
                  className="h-[280px] w-full object-cover"
                />
                <Link
                  to="/reviews"
                  className="mt-2 block text-4xl leading-none text-[oklch(0.2_0.01_72)] transition hover:text-[oklch(0.38_0.08_64)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kind Words
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[75vw] max-w-[380px] flex-col overflow-y-auto rounded-l-[40px] border-l border-brand-line bg-brand-card/95 py-3 shadow-2xl backdrop-blur-2xl transition-transform duration-300 dark:border-brand-line-dark dark:bg-brand-card-dark/95 md:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-2">
          <span
            className="text-xl text-brand-text dark:text-brand-text-dark"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aromamor
          </span>
          <button
            className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-line hover:text-brand-text dark:text-brand-muted-dark dark:hover:bg-brand-line-dark dark:hover:text-brand-text-dark"
            onClick={() => setMobileOpen(false)}
            type="button"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col border-t border-brand-line/70 pt-2 dark:border-brand-line-dark/70">
          <div className="grid grid-cols-2 border-b border-brand-line/70 dark:border-brand-line-dark/70">
            <button
              className="px-6 py-3 text-left text-sm uppercase tracking-[0.14em] text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
              onClick={goToCollection}
              type="button"
            >
              Shop
            </button>
            <Link
              className="px-6 py-3 text-sm uppercase tracking-[0.14em] text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              Our Story
            </Link>
            <Link
              className="px-6 py-3 text-sm uppercase tracking-[0.14em] text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
              to="/reviews"
              onClick={() => setMobileOpen(false)}
            >
              Reviews
            </Link>
            <Link
              className="px-6 py-3 text-sm uppercase tracking-[0.14em] text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
              to="/login"
              replace={authModalOpen}
              state={{ backgroundLocation: modalBackgroundLocation }}
              onClick={() => setMobileOpen(false)}
            >
              Account
            </Link>
            <button
              className="col-span-2 flex items-center gap-2 px-6 py-3 text-left text-sm uppercase tracking-[0.14em] text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
              onClick={openWishlist}
              type="button"
            >
              Saved
              <span>{wishlist.length}</span>
            </button>
          </div>

          <div className="space-y-6 px-6 py-6">
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted dark:text-brand-muted-dark">
                Collections
              </p>
              <div className="flex flex-col gap-2 text-sm text-brand-text dark:text-brand-text-dark">
                <Link to="/shop" onClick={() => setMobileOpen(false)}>All Candles</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>Destination Collection</Link>
                <Link to="/shop?tab=gifts#collection" onClick={() => setMobileOpen(false)}>Gift Picks</Link>
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted dark:text-brand-muted-dark">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-brand-text dark:text-brand-text-dark">
                <Link to="/shop" onClick={() => setMobileOpen(false)}>Coastal</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>Cafe</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>Warm Vanilla</Link>
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted dark:text-brand-muted-dark">
                About
              </p>
              <div className="flex flex-col gap-2 text-sm text-brand-text dark:text-brand-text-dark">
                <Link to="/craftsmanship" onClick={() => setMobileOpen(false)}>Craftsmanship</Link>
                <Link to="/sustainability" onClick={() => setMobileOpen(false)}>Sustainability</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Visit Us</Link>
              </div>
            </section>

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted dark:text-brand-muted-dark">
                Journal
              </p>
              <div className="flex flex-col gap-2 text-sm text-brand-text dark:text-brand-text-dark">
                <Link to="/candle-care" onClick={() => setMobileOpen(false)}>Candle Care Tips</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)}>Stories</Link>
              </div>
            </section>

            <div className="grid gap-4">
              <Link to="/shop?tab=gifts#collection" onClick={() => setMobileOpen(false)}>
                <img
                  src={`${import.meta.env.BASE_URL}hero.png`}
                  alt="Gift collection"
                  className="h-28 w-full rounded-[22px] object-cover"
                />
                <span
                  className="mt-2 block text-3xl leading-none text-brand-text dark:text-brand-text-dark"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Gifts
                </span>
              </Link>
              <Link to="/reviews" onClick={() => setMobileOpen(false)}>
                <img
                  src={`${import.meta.env.BASE_URL}contact_picture.png`}
                  alt="Kind words"
                  className="h-28 w-full rounded-[22px] object-cover"
                />
                <span
                  className="mt-2 block text-3xl leading-none text-brand-text dark:text-brand-text-dark"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kind Words
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </header>
      <button
        type="button"
        onClick={openSearch}
        aria-label="Open search"
        className={`fixed bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-t-[24px] border border-b-0 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] shadow-[0_-16px_32px_oklch(0.2_0.02_72/.16)] transition md:hidden ${
          footerInView ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"
        } ${
          searchOpen
            ? "border-brand-accent bg-brand-card text-brand-text dark:border-brand-accent-dark dark:bg-brand-card-dark dark:text-brand-text-dark"
            : "border-brand-line bg-brand-card/96 text-brand-text dark:border-brand-line-dark dark:bg-brand-card-dark/96 dark:text-brand-text-dark"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <span>Search</span>
      </button>
    </>
  );
}
