import { model } from "mongoose";
import { gamesSchema } from "../schemas/gamesSchema.js";

const Game = model('Game', gamesSchema)

export {Game}