const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI =
  "mongodb+srv://harimylapilli007_db_user:JmQmuoXxxWoOl1qk@cluster0.3d6nv5c.mongodb.net/";

const products = [
  { name: "Wireless Mouse", price: 499, category: "Electronics", stock: 120 },
  { name: "Mechanical Keyboard", price: 2499, category: "Electronics", stock: 45 },
  { name: "USB-C Hub", price: 1299, category: "Electronics", stock: 80 },
  { name: "Noise Cancelling Headphones", price: 5999, category: "Electronics", stock: 30 },
  { name: "Laptop Stand", price: 899, category: "Accessories", stock: 60 },
  { name: "Phone Case", price: 299, category: "Accessories", stock: 200 },
  { name: "Screen Protector Pack", price: 199, category: "Accessories", stock: 150 },
  { name: "Cotton T-Shirt", price: 599, category: "Clothing", stock: 90 },
  { name: "Denim Jeans", price: 1499, category: "Clothing", stock: 55 },
  { name: "Running Shoes", price: 2999, category: "Footwear", stock: 40 },
  { name: "Casual Sneakers", price: 1899, category: "Footwear", stock: 70 },
  { name: "Ceramic Coffee Mug", price: 349, category: "Home", stock: 100 },
  { name: "Desk Lamp", price: 799, category: "Home", stock: 35 },
  { name: "Notebook Set", price: 249, category: "Stationery", stock: 180 },
  { name: "Ballpoint Pen Pack", price: 99, category: "Stationery", stock: 250 },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const created = await Product.insertMany(products);
    console.log(`Seeded ${created.length} products`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
