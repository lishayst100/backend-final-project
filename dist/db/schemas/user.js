import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true, minlength: 8 },
    phone: { type: String, unique: true },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    ],
});
export { userSchema };
