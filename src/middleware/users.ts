import { RequestHandler } from "express";
import _ from "underscore";
import { UserSignUpSchema } from "../validations/users.js";


const validateSignUp: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "username", "email", "password", "phone");

  const { error } = UserSignUpSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((o) => o.message),
    });
  }

  next();
};

export { validateSignUp };
