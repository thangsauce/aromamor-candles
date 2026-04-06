import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "completed", "cancelled"],
      default: "placed",
    },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
