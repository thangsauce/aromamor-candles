import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { ReviewFormData, CheckoutFormData } from "../schemas";

// ── Reviews (future — when reviews move to the database) ──────────────────────

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data } = await api.get(`/reviews/${productId}`);
      return data;
    },
    enabled: !!productId, // only runs if productId is not empty
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: ReviewFormData) => {
      const { data } = await api.post("/reviews", review);
      return data;
    },
    onSuccess: (_data, variables) => {
      // Refresh the reviews list for this product after submitting
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
    },
  });
}

// ── Orders (future — when checkout connects to backend) ───────────────────────

export function useSubmitOrder() {
  return useMutation({
    mutationFn: async (order: CheckoutFormData & { items: { id: string; qty: number }[] }) => {
      const { data } = await api.post("/orders", order);
      return data;
    },
  });
}

// ── Auth (future — when user accounts are added) ──────────────────────────────

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    retry: false, // don't retry on 401 — user is just not logged in
  });
}
