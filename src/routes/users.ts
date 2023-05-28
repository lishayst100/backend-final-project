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

router.post("/signup", validateSignUp, userAlreadyExists, async (req, res) => {
  const body = _.pick(req.body, "username", "email", "password", "phone");
  body.password = await bcrypt.hash(body.password, 10);
  const user = new User(body);

  try {
    user.roles = [await (await Role.findOne({ name: "user" }))._id];
    await user.save();
    return res.json({ message: "User Saved", id: user._id });
  } catch (e) {
    return res.status(500).json({
      message: `Error: ${e}`,
    });
  }
});

router.post("/signin", validateSignIn, async (req, res) => {
  try {
    //SELECT * FROM user JOIN Roles ON ...
    const user = await User.findOne({ email: req.body.email }).populate<{
      roles: Array<typeof Role>;
    }>("roles");

    if (!user) {
      return res.status(401).json({ message: "No Such User" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

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
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
      error: e,
    });
  }
});



router.get('/allusers' , (req,res)=>{
      User.find()
        .then((result) => res.json(result))
        .catch((e) => console.log(e));
})


router.post("/isadmin", validateSignIn ,isAdmin ,async(req, res) => {
   try {
    //SELECT * FROM user JOIN Roles ON ...
    const user = await User.findOne({ email: req.body.email }).populate<{
      roles: Array<typeof Role>;
    }>("roles");

    if (!user) {
      return res.status(401).json({ message: "No Such User" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

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
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
      error: e,
    });
  }
});




export { router as AuthRouter };


