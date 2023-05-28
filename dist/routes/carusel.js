import { Router } from "express";
import { CaruselImg } from "../db/models/caruselImg.js";
import _ from "underscore";
const router = Router();
router.get("/", (req, res) => {
    CaruselImg.find()
        .then((img) => res.json(img))
        .catch((e) => console.log(e));
});
router.post("/add", (req, res) => {
    const body = _.pick(req.body, 'img', 'title', 'link');
    new CaruselImg(body)
        .save()
        .then((result) => res.json({ message: "HAPPPY" }))
        .catch((e) => console.log(e));
});
export { router as caruselRouter };
