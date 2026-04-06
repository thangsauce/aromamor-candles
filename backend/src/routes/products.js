import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (_req, res) => {
  const products = await Product.find().populate("tags", "name").sort({ createdAt: -1 });
  return res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("tags", "name");
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
});

export default router;
