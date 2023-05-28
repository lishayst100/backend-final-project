import { Router } from "express";
import _ from 'underscore';
import { Order } from "../db/models/order.js";
const router = Router();
router.post('/addGameToCart', (req, res) => {
    const body = _.pick(req.body, 'user', 'cartItems');
    body.cartItems.push(req.body.title);
    new Order(body)
        .save()
        .then((result) => res.json({ message: "added game to cart" }))
        .catch((e) => res.json({ error: `${e}` }));
});
export { router as orderRouter };
