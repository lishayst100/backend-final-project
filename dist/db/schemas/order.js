import { Schema } from "mongoose";
const order = new Schema({
    creditCardName: String,
    orderDetails: Array,
    CartTotalAmount: Number,
    address: String,
    username: String,
    email: String,
    date: String,
    status: String,
});
export { order };
