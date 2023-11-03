const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose')
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const router = require("./routes");

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Load environment variables
dotenv.config();
// Create Express server
const app = express();

//public 
app.use('/public',express.static('public'))


// Connecting Database
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("App is running at http://localhost:%d ",process.env.PORT);
    app.listen(process.env.PORT);
});


// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);



app.use(router);

// Error handling
app.use(errorHandler)
app.use(notFound);

module.exports = app;
