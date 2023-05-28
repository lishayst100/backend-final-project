import { Schema } from "mongoose";
const roleSchema = new Schema({
    name: { type: String, unique: true }
});
export { roleSchema };
