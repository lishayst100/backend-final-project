export {};
/* import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });

// Define the schema for a cart item
const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// Define the schema for a cart
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [cartItemSchema],
});

// Create a model for the cart collection
const Cart = mongoose.model("Cart", cartSchema);

// Create a route to handle adding items to the cart
app.post("/cart/add", async (req, res) => {
  // Extract the item information from the request body
  const { name, price, quantity } = req.body;

  // Retrieve the user's cart from the database
  let cart = await Cart.findOne({ userId: req.user.id });

  // Update the cart with the new item or quantity
  const existingItem = cart.items.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ name, price, quantity });
  }

  // Save the updated cart to the database
  cart = await cart.save();

  // Send a response to the client confirming the item has been added to the cart
  res.json({ success: true });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
 */ 
