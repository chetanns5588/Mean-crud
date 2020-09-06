const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

const listRoute = require('./routes/list.route');
const taskRoute = require('./routes/task.route');

// Connecting to Server and port
app.use(cors());
app.use(express.json());
app.listen(3000, () => console.log("Server is Connected on port 3000"));

app.use('/',listRoute, taskRoute)

// Connecting to Mongo DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/taskManager', 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));
