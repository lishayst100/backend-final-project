import { model } from "mongoose";
import { caruselImg } from "../schemas/caruselImg.js";
const CaruselImg = model('CaruselImg', caruselImg);
export { CaruselImg };
