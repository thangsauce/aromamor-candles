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
          <span
            key={star}
            onClick={() => interactive && onChange?.(star)}
            style={{ fontSize: size, lineHeight: 1 }}
            className={`${filled ? "text-brand-accent-dark" : "text-brand-muted/30 dark:text-brand-muted-dark/30"} ${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
            title={interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
