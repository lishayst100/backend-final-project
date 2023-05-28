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
import { Game } from "../db/models/gameModel.js";
const router = Router();
router.get("/hotelslist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: handle errors:
    try {
        const hotels = yield Hotel.find();
        res.json(hotels);
    }
    catch (e) {
        res.status(500).json({ message: "Error", error: e });
    }
}));
router.post("/addproperty", (req, res) => {
    const body = _.pick(req.body, "title", "description", "frontImage", "price", "img1", "img2", "rating", "iframe", "platform");
    new Hotel(body)
        .save()
        .then((saved) => res.json({ message: JSON.stringify(saved) })
    // id: saved._id,
    // hotel:saved
    )
        .catch((e) => {
        res.status(500).json({ message: `Error:${e}` });
    });
});
router.post('/addhotel', (req, res) => {
    const body = _.pick(req.body, 'title');
    new Game(body)
        .save()
        .then((result) => res.json({ message: JSON.stringify(result) }))
        .catch((e) => res.json({ error: `${e}` }));
});
export { router as hotelRouter };
