interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <span className="inline-flex gap-0.5 items-center">
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <button
            key={star}
            onClick={() => interactive && onChange?.(star)}
            style={{ width: size, height: size, lineHeight: 1 }}
            className={`${filled ? "text-brand-accent-dark" : "text-brand-muted/30 dark:text-brand-muted-dark/30"} ${interactive ? "cursor-pointer" : "cursor-default"} transition-colors inline-flex items-center justify-center`}
            title={interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined}
            type="button"
            aria-label={interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined}
          >
            <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3.6l2.64 5.35 5.9.86-4.27 4.15 1 5.88L12 17.08l-5.27 2.76 1-5.88-4.27-4.15 5.9-.86L12 3.6z" />
            </svg>
          </button>
        );
      })}
    </span>
  );
}
