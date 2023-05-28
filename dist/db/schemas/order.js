import { Schema } from "mongoose";
const cart = new Schema({
    userId: { type: String },
    gameList: []
});
const order = new Schema({
    user: { type: String },
    // cart: 
});
/*
// type id = userId
// game list
*/
export { order as orderSchema };
