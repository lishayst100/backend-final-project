import { model } from "mongoose";
import { orderSchema } from "../schemas/order.js";
const Order = model('Order', orderSchema);
export { Order };
