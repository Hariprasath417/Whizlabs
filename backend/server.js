// Main Express server entry point
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const http = require('http').createServer(app);

const itemRoutes = require('./routes/items');

require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle favicon requests - return 204 No Content to prevent repeated requests
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// Routes
app.use('/api', itemRoutes);

// Connect to MongoDB
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to DB');

        http.listen(PORT, () => console.log(`Listening to port ${PORT}`));
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

startServer();
