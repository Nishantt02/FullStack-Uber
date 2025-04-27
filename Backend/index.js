import dotenv from 'dotenv';
import connectdb from './db.js';
import app from './app.js';  
import { initializeSocket } from './socket.js';  // Ensure this file exists
import http from 'http'; 

dotenv.config({
    path: './.env'
});


const server = http.createServer(app); 

initializeSocket(server); // Initialize socket with the server

connectdb()
    .then(() => {
        server.listen(process.env.PORT || 3000, () => { 
            console.log(`⚙️ Server is running at port: ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed!!!", err);
    });
