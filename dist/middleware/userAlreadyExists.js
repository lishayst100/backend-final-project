var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from "underscore";
import { User } from "../db/models/user.js";
const userAlreadyExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = _.pick(req.body, "username", "email", "password", "phone");
        let found = yield User.findOne({ email: body.email });
        if (found) {
            return res.status(400).json({ message: "Email already extists" });
        }
        found = yield User.findOne({ username: body.username });
        if (found) {
            return res.status(400).json({ message: "Username already extists" });
        }
        found = yield User.findOne({ phone: body.phone });
        if (found) {
            return res.status(400).json({ message: "phone already extists" });
        }
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
    next();
});
export { userAlreadyExists };
