import { z } from "zod";

// ── Checkout form ─────────────────────────────────────────────────────────────
export const checkoutSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email("Please enter a valid email address"),
    fulfillment: z.enum(["pickup", "shipping"]),
    address: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) =>
      data.fulfillment === "pickup" ||
      (data.address && data.address.trim().length >= 8),
    {
      message: "Please enter a valid shipping address",
      path: ["address"],
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// ── Review form ───────────────────────────────────────────────────────────────
export const reviewSchema = z.object({
  productId: z.string().min(1, "Please select a candle"),
  author: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),
  body: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review is too long"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

// ── Auth forms ────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
