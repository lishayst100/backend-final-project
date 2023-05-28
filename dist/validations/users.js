import Joi from "joi";
import { passwordRegex, phoneRegex } from "./utlis.js";
const UserSignUpSchema = Joi.object({
    username: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
    phone: Joi.string().regex(phoneRegex).required()
});
const UserSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
});
export { UserSignUpSchema, UserSignInSchema };
