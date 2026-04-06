import { Router } from "express";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Tag } from "../models/Tag.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/users", async (_req, res) => {
  const users = await User.find().select("_id username role createdAt").sort({ createdAt: -1 });
  return res.json(users);
});

router.post("/products", async (req, res) => {
  const { name, description, price, inStock = true, tagIds = [] } = req.body;
  const created = await Product.create({ name, description, price, inStock, tags: tagIds });
  return res.status(201).json(created);
});

router.put("/products/:id", async (req, res) => {
  const { name, description, price, inStock, tagIds } = req.body;

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(inStock !== undefined ? { inStock } : {}),
        ...(tagIds !== undefined ? { tags: tagIds } : {}),
      },
    },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(updated);
});

router.delete("/products/:id", async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json({ message: "Product deleted" });
});

router.get("/tags", async (_req, res) => {
  const tags = await Tag.find().sort({ name: 1 });
  return res.json(tags);
});

router.post("/tags", async (req, res) => {
  const { name } = req.body;
  const created = await Tag.create({ name });
  return res.status(201).json(created);
});

router.put("/tags/:id", async (req, res) => {
  const { name } = req.body;
  const updated = await Tag.findByIdAndUpdate(req.params.id, { $set: { name } }, { new: true });

  if (!updated) {
    return res.status(404).json({ message: "Tag not found" });
  }

  return res.json(updated);
});

router.delete("/tags/:id", async (req, res) => {
  const deleted = await Tag.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Tag not found" });
  }

  return res.json({ message: "Tag deleted" });
});

export default router;
