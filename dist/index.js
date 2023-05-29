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
app.get("/", (req, res) => {
    Game.find()
        .then((result) => res.json(result))
        .catch((e) => res.json({ error: `${e}` }));
});
app.get('/api/login', login);
app.use('/api/games', gamesRouter);
app.use('/api/carusel', caruselRouter);
app.use('api/users', AuthRouter);
app.use('/api/students', studentRouter);
app.use(notFound);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
