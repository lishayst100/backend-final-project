import { model } from "mongoose";
import { roleSchema } from "../schemas/rol.js";
const Role = model('Role', roleSchema);
export { Role };
