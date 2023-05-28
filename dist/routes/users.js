var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { userAlreadyExists } from "../middleware/userAlreadyExists.js";
import { validateSignUp } from "../middleware/users.js";
import bcrypt from "bcryptjs";
import { validateSignIn } from "../middleware/verifySignIn.js";
import { Role } from "../db/models/role.js";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = Router();
router.post("/signup", validateSignUp, userAlreadyExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = _.pick(req.body, "username", "email", "password", "phone");
    body.password = yield bcrypt.hash(body.password, 10);
    const user = new User(body);
    try {
        user.roles = [yield (yield Role.findOne({ name: "user" }))._id];
        yield user.save();
        return res.json({ message: "User Saved", id: user._id });
    }
    catch (e) {
        return res.status(500).json({
            message: `Error: ${e}`,
        });
    }
}));
router.post("/signin", validateSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //SELECT * FROM user JOIN Roles ON ...
        const user = yield User.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: "1d",
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_ ` + user.roles[i].name.toUpperCase());
        }
        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Server error",
            error: e,
        });
    }
}));
router.get('/allusers', (req, res) => {
    User.find()
        .then((result) => res.json(result))
        .catch((e) => console.log(e));
});
router.post("/isadmin", validateSignIn, isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //SELECT * FROM user JOIN Roles ON ...
        const user = yield User.findOne({ email: req.body.email }).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: "1d",
        });
        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push(`ROLE_ ` + user.roles[i].name.toUpperCase());
        }
        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Server error",
            error: e,
        });
    }
}));
export { router as AuthRouter };
