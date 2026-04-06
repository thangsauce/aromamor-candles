import { Router } from "express";
import { Favorite } from "../models/Favorite.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/mine", async (req, res) => {
  const rows = await Favorite.find({ user: req.user._id }).populate("product", "name price");
  return res.json(rows);
});

router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;
    const created = await Favorite.create({ user: req.user._id, product: productId });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(400).json({ message: "Could not add favorite", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const existing = await Favorite.findById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: "Favorite not found" });
  }

  if (existing.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "You can only delete your own favorites" });
  }

  await existing.deleteOne();
  return res.json({ message: "Favorite deleted" });
});

export default router;
