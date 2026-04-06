import { Router } from "express";
import { Order } from "../models/Order.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/mine", async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product", "name").sort({ createdAt: -1 });
  return res.json(orders);
});

router.post("/", async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order must include at least one item" });
  }

  const total = items.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0);

  const created = await Order.create({
    user: req.user._id,
    items,
    total,
  });

  return res.status(201).json(created);
});

router.get("/", requireRole("admin"), async (_req, res) => {
  const orders = await Order.find().populate("user", "username role").sort({ createdAt: -1 });
  return res.json(orders);
});

export default router;
