// requirements
require("dotenv").config();
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const authRoutes = require("./routes/auth-routes.js");
const scriptRoutes = require("./routes/script-routes.js");
const fileUpload = require('express-fileupload');

//middleware
const bodyParser = require('body-parser');


//express setup
const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV === 'development';

//fileupload middleware
app.use(fileUpload())
// Requiring our models for syncing
const db = require(path.join(__dirname + '/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes
app.use(express.static(path.join(__dirname + '/public')));
app.use("/api/user", authRoutes);
app.use(express.static(path.join(__dirname + '/scripts')));

app.use(["/api/scripts"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/scripts", scriptRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname + '/client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

db.sequelize.sync({ force: false, logging: console.log }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


