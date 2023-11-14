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


// Routes
const CreateUserRouter = require('./Routers/auth/CreateUser');
app.use("/api", CreateUserRouter);

const AuthUser = require('./Routers/auth/AuthUser');
app.use("/api", AuthUser);

const CreateSchedule = require('./Routers/medicineschedule/CreateSchedule');
app.use("/api", CreateSchedule);

const GetUser = require('./Routers/GetUser');
app.use("/api", GetUser);

const RequestList = require('./Routers/medicineschedule/RequestList');
app.use("/api", RequestList);

const AcceptRequest = require('./Routers/medicineschedule/AcceptRequest');
app.use("/api", AcceptRequest);

const GetMyPatient = require('./Routers/medicineschedule/GetMyPatient');
app.use("/api", GetMyPatient);

const MyScheduleList = require('./Routers/medicineschedule/MyScheduleList');
app.use("/api", MyScheduleList);

const GetAllCaretaker = require('./Routers/getAllCaretaker');
app.use("/api", GetAllCaretaker);

const CompleteCourse = require('./Routers/medicineschedule/CompleteCourse');
app.use("/api", CompleteCourse);

app.listen(process.env.PORT, () => {
   console.log("Backend is listening in PORT 5000");
});