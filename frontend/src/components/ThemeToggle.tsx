import { useTheme } from "../store/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg border transition-all duration-300 select-none
        bg-brand-card dark:bg-brand-card-dark
        border-brand-line dark:border-brand-line-dark
        text-brand-text dark:text-brand-text-dark
        hover:shadow-xl hover:scale-105 active:scale-95"
    >
      {/* Icon container with rotation animation */}
      <span
        className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500"
        style={{ transform: isDark ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        {/* Sun rays — visible in light mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </svg>
        {/* Moon — visible in dark mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Animated pill indicator */}
      <span className={`w-7 h-4 rounded-full flex items-center transition-colors duration-300 px-0.5 ${isDark ? "bg-brand-accent-dark/30" : "bg-brand-accent/20"}`}>
        <span
          className={`w-3 h-3 rounded-full transition-all duration-300 ${isDark ? "translate-x-3 bg-brand-accent-dark" : "translate-x-0 bg-brand-accent"}`}
        />
      </span>
    </button>
  );
}
