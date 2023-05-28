import { RequestHandler } from "express";
import _ from "underscore";
import { UserSignInSchema } from "../validations/users.js";

const validateSignIn: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body,"email", "password");

  const { error } = UserSignInSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: error.details.map((o) => o.message),
    });
  }

  next();
};

export { validateSignIn };
