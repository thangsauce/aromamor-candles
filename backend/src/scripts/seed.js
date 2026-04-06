import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Tag } from "../models/Tag.js";
import { Product } from "../models/Product.js";

const DEFAULT_ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "Admin123";
const DEFAULT_USER_USERNAME = process.env.SEED_USER_USERNAME || "student";
const DEFAULT_USER_PASSWORD = process.env.SEED_USER_PASSWORD || "Student123";

const seedTagNames = ["Calm", "Fresh", "Travel", "Night", "Coastal"];

const seedProducts = [
  {
    name: "Parisian Cafe",
    description: "Warm vanilla and espresso inspired by cozy Paris mornings.",
    price: 28,
    inStock: true,
    tagNames: ["Calm", "Travel"],
  },
  {
    name: "Amalfi Morning",
    description: "Citrus and sea breeze inspired by the Amalfi coast.",
    price: 30,
    inStock: true,
    tagNames: ["Fresh", "Coastal", "Travel"],
  },
  {
    name: "First Class Lounge",
    description: "Soft leather and woods for a polished evening scent.",
    price: 32,
    inStock: true,
    tagNames: ["Night", "Calm"],
  },
];

async function upsertUser(username, password, role) {
  const passwordHash = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { username },
    { $set: { username, passwordHash, role } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

async function run() {
  try {
    await connectDB();

    await upsertUser(DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD, "admin");
    await upsertUser(DEFAULT_USER_USERNAME, DEFAULT_USER_PASSWORD, "user");

    const tagMap = new Map();
    for (const name of seedTagNames) {
      const tag = await Tag.findOneAndUpdate(
        { name },
        { $set: { name } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      tagMap.set(name, tag._id);
    }

    for (const p of seedProducts) {
      const tags = p.tagNames.map((name) => tagMap.get(name)).filter(Boolean);
      await Product.findOneAndUpdate(
        { name: p.name },
        {
          $set: {
            name: p.name,
            description: p.description,
            price: p.price,
            inStock: p.inStock,
            tags,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log("Seed complete");
    console.log(`Admin login: ${DEFAULT_ADMIN_USERNAME} / ${DEFAULT_ADMIN_PASSWORD}`);
    console.log(`User login: ${DEFAULT_USER_USERNAME} / ${DEFAULT_USER_PASSWORD}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();
