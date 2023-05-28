import { Schema, model } from "mongoose";
const gamesSchema1 = new Schema({
    title: String,
});
export const people = model("people", gamesSchema1);
