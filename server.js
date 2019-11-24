const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/students"

//creates express app
const app = express();

//parse request of Content-Type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse request of Content-Type - application/json
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    })

require('./routes/api-routes')(app)

//listen for requests
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})