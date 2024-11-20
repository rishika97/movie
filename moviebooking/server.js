// const http = require('http');
// Import Express and CORS
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movie.routes');
const artistRoutes = require('./routes/artist.routes');
const genreRoutes = require('./routes/genre.routes');
const userRoutes = require('./routes/user.routes');


const app = express();
app.use(cors());
app.use(express.json());

const connectToDatabase = require('./config/db.config');
connectToDatabase();

app.use('/api', movieRoutes);
app.use('/api', artistRoutes);
app.use('/api', genreRoutes);
app.use('/api', userRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

// Set the port number
const PORT = 8085;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// const server = http.createServer((req, res) => {
//     // Set headers for JSON response
//     res.setHeader('Content-Type', 'application/json');

//     if (req.method === 'GET') {
//         switch (req.url) {
//             case '/movies':
//                 res.writeHead(200);
//                 res.end(JSON.stringify({ message: "All Movies Data in JSON format from Mongo DB" }));
//                 break;

//             case '/genres':
//                 res.writeHead(200);
//                 res.end(JSON.stringify({ message: "All Genres Data in JSON format from Mongo DB" }));
//                 break;

//             case '/artists':
//                 res.writeHead(200);
//                 res.end(JSON.stringify({ message: "All Artists Data in JSON format from Mongo DB" }));
//                 break;

//             default:
//                 res.writeHead(404);
//                 res.end(JSON.stringify({ error: "Not Found" }));
//                 break;
//         }
//     } else {
//         res.writeHead(405);
//         res.end(JSON.stringify({ error: "Method Not Allowed" }));
//     }
// });

// // Define port and start the server
// const PORT = 8085;
// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
