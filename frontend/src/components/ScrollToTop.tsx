import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const isModalRoute =
    Boolean((location.state as { backgroundLocation?: Location } | null)?.backgroundLocation);

  useEffect(() => {
    if (isModalRoute) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, isModalRoute]);

  return null;
}
