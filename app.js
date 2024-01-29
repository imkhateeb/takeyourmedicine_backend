// configuring environment variables
const dotenv = require('dotenv');
dotenv.config();

// initializing an express server
const express = require('express');
const app = express();

// Middlewares for parsing JSON and URL-encoded data
app.use(express.json()); // To parse json data
app.use(express.urlencoded({extended: true})); // To parse url encoded data

// connecting database with my node application
const connectDB = require('./db');
const response = connectDB();

// Enabling CORS for request from http://localhost:3000 - My react frontend
const cors = require('cors');
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// New Routes
const userRoutes = require('./routes/user_routes');
const medicineRoutes = require('./routes/medicine_routes');
const schedulingRoutes = require('./routes/scheduling_routes');
const requestRoutes = require('./routes/request_routes');

app.use('/api/user', userRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/schedule', schedulingRoutes);
app.use('/api/request', requestRoutes);


app.listen(process.env.PORT, () => {
   console.log("Backend is listening in PORT 5000");
});