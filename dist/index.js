var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import express from 'express';
import notFound from './middleware/404.js';
import morgan from 'morgan';
import { login } from './controllers/user-controller.js';
import { connect } from './db/connect.js';
import cors from 'cors';
import { AuthRouter } from './routes/users.js';
import { gamesRouter } from './routes/games.js';
import { caruselRouter } from './routes/carusel.js';
import { studentRouter } from './routes/student.js';
import { Game } from './db/models/gameModel.js';
const app = express();
connect().catch(e => console.log(e));
//middlewares
app.use(cors({ allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', AuthRouter);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield Game.find().sort({ price: 1 });
    res.json(result);
}));
app.get('/api/login', login);
app.use('/api/games', gamesRouter);
app.use('/api/carusel', caruselRouter);
app.use('api/users', AuthRouter);
app.use('/api/students', studentRouter);
app.use(notFound);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
