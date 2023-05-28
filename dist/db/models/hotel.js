import { model } from "mongoose";
import { hotelSchema } from "../../db/schemas/hotel.js";
const Hotel = model("Hotels", hotelSchema);
export { Hotel };
