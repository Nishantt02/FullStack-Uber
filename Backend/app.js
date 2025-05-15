
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './routes/user.routes.js';
import captionroutes from './routes/caption.routes.js';
import maprouter from './routes/map.routes.js';
import ridesrouter from './routes/rides.routes.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();

dotenv.config(); // move this up here
const corsOptions = {
  origin: 'https://fullstack-uber.onrender.com',  // Make sure this matches your frontend's deployed URL
  methods: ['GET', 'POST'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🛠 Setup backend API routes FIRST
app.get('/get', (req, res) => {
  res.send('hello');
});

app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.use('/users', router);
app.use('/caption', captionroutes);
app.use('/map', maprouter);
app.use('/ride', ridesrouter);

// 🛠 THEN serve frontend static files
app.use(express.static(path.join(__dirname, '/Frontend/dist')));

// 🛠 Finally, catch all other routes for frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
});

export default app;

