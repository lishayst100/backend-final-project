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
import { Game } from "../db/models/gameModel.js";
import _ from 'underscore';
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { Order } from "../db/models/order.js";
const router = Router();
router.get('/allgames', (req, res) => {
    Game.find()
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/admin", validateToken, isAdmin, (req, res) => {
    Game.find()
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.post("/addgame", validateToken, isAdmin, (req, res) => {
    const body = _.pick(req.body, "title", "description", "frontImage", "price", "img1", "img2", "rating", "iframe", "platform");
    new Game(body)
        .save()
        .then((result) => res.json({ message: "added game" }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get('/ps4games', (req, res) => {
    Game.find({ platform: "PS4" })
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get('/ps5games', (req, res) => {
    Game.find({ platform: "PS5" })
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.delete("/delete/:id", validateToken, isAdmin, (req, res) => {
    Game.deleteOne({ _id: req.params.id }).then((result) => res.json({ result: result, message: `Game deleted` }));
});
router.put('/update/:id', validateToken, isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Game.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
}));
router.get('/search/:key', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Game.find({ "$or": [
            { title: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    res.json(result);
}));
router.get('/sortByPricehtlgames', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Game.find().sort({ price: -1 });
    res.json(result);
}));
router.get("/sortByPricelthgames", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Game.find().sort({ price: 1 });
    res.json(result);
}));
router.get("/details/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Game.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ message: "no such Game" });
    }
}));
router.post("/order", (req, res) => {
    const body = _.pick(req.body, "creditCardName", "orderDetails", "address", "CartTotalAmount", "username", "email", "date", "status");
    body.status = "Pending";
    new Order(body)
        .save()
        .then((result) => res.json({ message: "Order Completed" }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/allOrders", validateToken, isAdmin, (req, res) => {
    Order.find()
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/games", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const minPrice = parseInt((_a = req.query.minPrice) === null || _a === void 0 ? void 0 : _a.toString()) || 0;
    const maxPrice = parseInt((_b = req.query.maxPrice) === null || _b === void 0 ? void 0 : _b.toString()) || Infinity;
    try {
        const games = yield Game.find({
            price: { $gte: minPrice, $lte: maxPrice },
        });
        res.json(games);
    }
    catch (error) {
        console.error("Failed to fetch games:", error);
        res.status(500).json({ error: "Failed to fetch games" });
    }
}));
router.delete("/deleteOrder/:id", validateToken, isAdmin, (req, res) => {
    Order.deleteOne({ _id: req.params.id })
        .then((result) => res.json({ message: "Order Completed" }))
        .catch((e) => res.json({ error: `${e}` }));
});
router.get("/userOrder/:username", (req, res) => {
    Order.find({ username: req.params.username }).then((result) => res.json(result));
});
router.get("/userOrderDetails/:id", (req, res) => {
    Order.findOne({ _id: req.params.id }).then((result) => res.json(result));
});
router.put("/updateStatus/:id", validateToken, isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order.updateOne({ _id: req.params.id }, { $set: { status: "Delivered" } });
    res.send(result);
}));
router.put("/completeStatus/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Order.updateOne({ _id: req.params.id }, { $set: { status: "Completed" } });
    res.send(result);
}));
export { router as gamesRouter };
