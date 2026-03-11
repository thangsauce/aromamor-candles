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
    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <span
            key={star}
            onClick={() => interactive && onChange?.(star)}
            style={{
              fontSize: size,
              color: filled ? "#ffd27d" : "rgba(184,184,194,0.3)",
              cursor: interactive ? "pointer" : "default",
              transition: "color 0.1s",
              lineHeight: 1,
            }}
            title={interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
