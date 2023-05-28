import { Schema } from "mongoose";

const gamesSchema = new Schema({
  title: String,
  description: String,
  frontImage: String,
  price: Number,
  img1: String,
  img2: String,
  rating: Number,
  iframe: String,
  platform:String
});

export { gamesSchema}