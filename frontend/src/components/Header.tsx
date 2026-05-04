import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Header() {
  const {
    totalQty,
    wishlist,
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
  const location = useLocation();
  const navigate = useNavigate();
  const homeHeader = location.pathname === "/";
  const anyMegaMenuOpen = isStoryMenuOpen || isShopMenuOpen;
  const forceSolidHeader = pastHero || mobileOpen || anyMegaMenuOpen || isHoverReveal;
  const transparentHeader =
    homeHeader && !forceSolidHeader;

  const textTone = transparentHeader
    ? "text-brand-bg hover:text-brand-accent-dark"
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
    const scrollToCollection = () => {
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/shop") {
      navigate("/shop");
      setTimeout(scrollToCollection, 50);
    } else {
      scrollToCollection();
    }

    setMobileOpen(false);
  };

  useEffect(() => {
    const updateHeaderState = () => {
      const next = homeHeader && window.scrollY > 8;
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

  return (
    <header
      onMouseEnter={() => {
        if (homeHeader && !pastHero) setIsHoverReveal(true);
      }}
      onMouseLeave={() => setIsHoverReveal(false)}
      className={`top-0 z-20 w-full ${
        homeHeader
          ? `fixed transition-[background-color,border-color,backdrop-filter] duration-250 ${
              forceSolidHeader
                ? "border-b border-brand-line bg-brand-card/94 backdrop-blur-sm dark:border-brand-line-dark dark:bg-brand-bg-dark/94"
                : "border-b border-transparent bg-transparent backdrop-blur-0"
            }`
          : "sticky border-b border-brand-line bg-brand-card/94 backdrop-blur-sm dark:border-brand-line-dark dark:bg-brand-bg-dark/94"
      }`}
    >
      {homeHeader && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-250 ${
            forceSolidHeader ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full w-full border-b border-brand-line bg-brand-card/94 backdrop-blur-sm dark:border-brand-line-dark dark:bg-brand-bg-dark/94" />
        </div>
      )}

      {homeHeader && (
        <div
          className={`overflow-hidden border-b px-3 text-center text-xs font-semibold uppercase tracking-[0.18em] transition-[max-height,opacity,padding,border-color,background-color,color] duration-300 md:px-6 ${
            !pastHero
              ? "max-h-10 py-2 opacity-100 border-[oklch(0.83_0.1_72/.56)] bg-[oklch(0.6_0.095_68/.84)] text-[oklch(0.975_0.04_80)]"
              : "max-h-0 py-0 opacity-0 border-transparent bg-transparent text-transparent"
          }`}
        >
          Destination candles now pouring
        </div>
      )}

      <div className="mx-auto grid h-14 w-full max-w-[1320px] grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
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
            Kind Words
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
            className={`text-2xl tracking-wide transition-colors sm:text-3xl md:text-4xl ${transparentHeader ? "text-brand-bg" : "text-brand-text dark:text-brand-text-dark"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aromamor
          </span>
        </Link>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={openSearch}
            className={`hidden px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:block ${textTone}`}
          >
            Search
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
            className={`hidden px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition md:block ${textTone}`}
          >
            Account
          </Link>
          <button
            type="button"
            onClick={openCart}
            className={`px-2 py-1.5 text-sm font-medium uppercase tracking-[0.14em] transition ${textTone}`}
          >
            <span className="hidden md:inline">Bag ({totalQty})</span>
            <span className="inline md:hidden">Bag {totalQty}</span>
          </button>
          <button
            className={`ml-1 flex flex-col justify-center gap-1.5 border p-2 transition md:hidden ${
              transparentHeader
                ? "border-brand-bg/38 text-brand-bg"
                : "border-brand-line text-brand-text hover:bg-brand-line dark:border-brand-line-dark dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
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
          </button>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsShopMenuOpen(true)}
        onMouseLeave={() => setIsShopMenuOpen(false)}
        className={`hidden md:block overflow-hidden border-b border-brand-line bg-brand-card/94 backdrop-blur-sm transition-[max-height,opacity] duration-200 dark:border-brand-line-dark dark:bg-brand-bg-dark/94 ${isShopMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 py-6">
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
        className={`hidden md:block overflow-hidden border-b border-brand-line bg-brand-card/94 backdrop-blur-sm transition-[max-height,opacity] duration-200 dark:border-brand-line-dark dark:bg-brand-bg-dark/94 ${isStoryMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 py-6">
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
                    <Link to="/about" className="hover:text-[oklch(0.38_0.08_64)]">Craftsmanship</Link>
                    <Link to="/about" className="hover:text-[oklch(0.38_0.08_64)]">Sustainability</Link>
                    <Link to="/contact" className="hover:text-[oklch(0.38_0.08_64)]">Visit Us</Link>
                  </div>
                </div>
                <div>
                  <p
                    className="mb-3 text-3xl text-[oklch(0.2_0.01_72)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Editorial
                  </p>
                  <div className="flex flex-col gap-2 text-base text-[oklch(0.2_0.01_72)]">
                    <Link to="/reviews" className="hover:text-[oklch(0.38_0.08_64)]">Kind Words</Link>
                    <Link to="/shop" className="hover:text-[oklch(0.38_0.08_64)]">Stories</Link>
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
              </div>
              <div>
                <img
                  src={`${import.meta.env.BASE_URL}hero.png`}
                  alt="Aromamor editorial visual"
                  className="h-[280px] w-full object-cover"
                />
                <p
                  className="mt-2 text-4xl leading-none text-[oklch(0.2_0.01_72)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Kind Words
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col border-b border-brand-line bg-brand-card py-2 shadow-lg dark:border-brand-line-dark dark:bg-brand-card-dark md:hidden">
          <button
            className="px-6 py-3 text-left text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
            onClick={goToCollection}
            type="button"
          >
            Shop
          </button>
          <Link
            className="px-6 py-3 text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
            to="/reviews"
            onClick={() => setMobileOpen(false)}
          >
            Kind Words
          </Link>
          <Link
            className="px-6 py-3 text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
            to="/about"
            onClick={() => setMobileOpen(false)}
          >
            Our Story
          </Link>
          <button
            className="flex items-center justify-between px-6 py-3 text-left text-brand-text transition hover:bg-brand-line dark:text-brand-text-dark dark:hover:bg-brand-line-dark"
            onClick={openWishlist}
            type="button"
          >
            Saved
            {wishlist.length > 0 && (
              <span className="bg-brand-accent px-1.5 py-0.5 text-xs text-brand-card dark:bg-brand-accent-dark dark:text-brand-bg-dark">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
