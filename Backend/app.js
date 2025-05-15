
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

// dotenv.config();
//  // move this up here
// // const corsOptions = {
// //   origin: 'https://fullstack-uber.onrender.com',  // Make sure this matches your frontend's deployed URL
// //   methods: ['GET', 'POST'],
// //   credentials: true
// // };
// // app.use(cors(corsOptions));

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // 🛠 Setup backend API routes FIRST
// app.get('/get', (req, res) => {
//   res.send('hello');
// });

// app.get('/cors-test', (req, res) => {
//   res.json({ message: 'CORS is working!' });
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

import router from './routes/user.routes.js';
import captionroutes from './routes/caption.routes.js';
import maprouter from './routes/map.routes.js';
import ridesrouter from './routes/rides.routes.js';

// Load environment variables
dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// ✅ CORRECT CORS CONFIGURATION
const allowedOrigins = [
  'https://fullstack-uber-0.onrender.com', // <-- your deployed frontend
  'http://localhost:5173',                 // optional: local dev
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`❌ CORS policy: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // for preflight

// ✅ Optional: Also manually set headers as fallback
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://fullstack-uber-0.onrender.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ✅ Basic Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.get('/get', (req, res) => res.send('hello'));
app.get('/cors-test', (req, res) => res.json({ message: 'CORS is working!' }));

app.use('/users', router);
app.use('/caption', captionroutes);
app.use('/map', maprouter);
app.use('/ride', ridesrouter);

// ✅ Serve frontend static files
const frontendDistPath = path.join(__dirname, '..', 'Frontend', 'dist');
app.use(express.static(frontendDistPath));

// ✅ Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

export default app;
