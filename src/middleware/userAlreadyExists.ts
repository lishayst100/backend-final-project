import { RequestHandler } from "express";
import _ from "underscore";
import { User } from "../db/models/user.js";

const userAlreadyExists: RequestHandler = async (req,res,next) =>{

    try{
        const body = _.pick(req.body, "username", "email", "password" , "phone");
        let found = await User.findOne({ email: body.email });
        if (found) {
          return res.status(400).json({ message: "Email already extists" });
        }

        found = await User.findOne({ username: body.username });
        if (found) {
          return res.status(400).json({ message: "Username already extists" });
        }

        found = await User.findOne({ phone: body.phone });
        if (found) {
          return res.status(400).json({ message: "phone already extists" });
        }
        
    }

    catch(e){
        res.status(500).json({ message: e });
    }
    

    next()
}


export {userAlreadyExists}