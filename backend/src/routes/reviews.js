import { Router } from "express";
import { Review } from "../models/Review.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const reviews = await Review.find()
    .populate("product", "name")
    .populate("user", "username")
    .sort({ createdAt: -1 });

  return res.json(reviews);
});

router.get("/mine", requireAuth, async (req, res) => {
  const mine = await Review.find({ user: req.user._id }).populate("product", "name").sort({ createdAt: -1 });
  return res.json(mine);
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { productId, rating, title, body } = req.body;
    const created = await Review.create({
      product: productId,
      user: req.user._id,
      rating,
      title,
      body,
    });

    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ message: "Could not create review", error: error.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const existing = await Review.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (existing.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only edit your own reviews" });
  }

  const { rating, title, body } = req.body;
  existing.rating = rating ?? existing.rating;
  existing.title = title ?? existing.title;
  existing.body = body ?? existing.body;
  await existing.save();

  return res.json(existing);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const existing = await Review.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (existing.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only delete your own reviews" });
  }

  await existing.deleteOne();
  return res.json({ message: "Review deleted" });
});

export default router;
