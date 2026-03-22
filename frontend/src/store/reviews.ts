import { useState, useCallback } from "react";
import type { Review, ReviewStore } from "../types";

const REVIEWS_KEY = "aromamor_reviews_v1";

function readReviews(): ReviewStore {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as ReviewStore) : {};
  } catch {
    return {};
  }
}

function saveReviews(store: ReviewStore) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(store));
}

export function useReviews() {
  const [store, setStore] = useState<ReviewStore>(readReviews);

  const getReviews = useCallback(
    (productId: string): Review[] => store[productId] ?? [],
    [store]
  );

  const addReview = useCallback(
    (review: Omit<Review, "id" | "date">) => {
      const full: Review = {
        ...review,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      setStore((prev) => {
        const next = {
          ...prev,
          [review.productId]: [full, ...(prev[review.productId] ?? [])],
        };
        saveReviews(next);
        return next;
      });
    },
    []
  );

  const deleteReview = useCallback((productId: string, reviewId: string) => {
    setStore((prev) => {
      const next = {
        ...prev,
        [productId]: (prev[productId] ?? []).filter((r) => r.id !== reviewId),
      };
      saveReviews(next);
      return next;
    });
  }, []);

  const avgRating = useCallback(
    (productId: string): number => {
      const reviews = store[productId];
      if (!reviews || reviews.length === 0) return 0;
      return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    },
    [store]
  );

  const totalReviews = useCallback(
    (productId: string): number => (store[productId] ?? []).length,
    [store]
  );

  return { getReviews, addReview, deleteReview, avgRating, totalReviews };
}
