import { Schema } from "mongoose";
import { Game } from "../models/gameModel.js";
import { User } from "../models/user.js";

const cart = new Schema({
  userId: { type: String },
  gameList: []
});

const order = new Schema({
    user: {type: String},
    // cart: 
})
/*
// type id = userId
// game list 
*/


export {order as orderSchema}