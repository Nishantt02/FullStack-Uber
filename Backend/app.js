
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import router from './routes/user.routes.js';
// import captionroutes from './routes/caption.routes.js';
// import maprouter from './routes/map.routes.js';
// import ridesrouter from './routes/rides.routes.js';
// import path from 'path';

// const app = express();
// const __dirname = path.resolve();

// dotenv.config(); // move this up here

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // 🛠 Setup backend API routes FIRST
// app.get('/get', (req, res) => {
//   res.send('hello');
// });
// app.use('/users', router);
// app.use('/caption', captionroutes);
// app.use('/map', maprouter);
// app.use('/ride', ridesrouter);

// // 🛠 THEN serve frontend static files
// app.use(express.static(path.join(__dirname, '/Frontend/dist')));

// // 🛠 Finally, catch all other routes for frontend (SPA)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
// });

// export default app;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.routes.js';
import captionRoutes from './routes/caption.routes.js';
import mapRoutes from './routes/map.routes.js';
import ridesRoutes from './routes/rides.routes.js';

// Load environment variables
dotenv.config();

// Determine __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  'https://fullstack-uber-0.onrender.com',
  'https://fullstack-uber-1.onrender.com',
  'https://fullstack-uber.onrender.com',
  'http://localhost:3000'
];

// Configure CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Parse JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup API routes
app.get('/get', (req, res) => res.send('hello'));
app.use('/users', userRoutes);
app.use('/caption', captionRoutes);
app.use('/map', mapRoutes);
app.use('/ride', ridesRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
});

export default app;
