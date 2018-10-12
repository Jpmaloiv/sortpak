// requirements
require("dotenv").config();
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const authRoutes = require("./routes/auth-routes.js");
const scriptRoutes = require("./routes/script-routes.js");
const scriptAttachmentRoutes = require("./routes/scriptAttachment-routes.js");
const patientRoutes = require("./routes/patient-routes.js");
const patientAttachmentRoutes = require("./routes/patientAttachment-routes.js");
const physicianRoutes = require("./routes/physician-routes.js");
const productRoutes = require("./routes/product-routes.js");
const visitRoutes = require("./routes/visit-routes.js");
const fileUpload = require('express-fileupload');

//middleware
const bodyParser = require('body-parser');


//express setup
const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV === 'production';

//fileupload middleware
app.use(fileUpload())
// Requiring our models for syncing
const db = require(path.join(__dirname + '/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, 'client/build')));

//routes
app.use(express.static(path.join(__dirname + '/public')));
app.use("/api/user", authRoutes);
app.use(express.static(path.join(__dirname + '/scripts')));
app.use(express.static(path.join(__dirname + '/scriptAttachments')));
app.use(express.static(path.join(__dirname + '/patients')));
app.use(express.static(path.join(__dirname + '/patientAttachments')));
app.use(express.static(path.join(__dirname + '/physicians')));
app.use(express.static(path.join(__dirname + '/visits')));

app.use("scripts/api/products", productRoutes);
//overwriting routes

app.use(["/api/scripts"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/scripts", scriptRoutes);
app.use(["/api/scripts/attachments"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/scripts/attachments", scriptAttachmentRoutes);
app.use(["/api/patients/attachments"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/patients/attachments", patientAttachmentRoutes);
app.use(["/api/patients"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/patients", patientRoutes);
app.use(["/api/physicians"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/physicians", physicianRoutes);
app.use(["/api/visits"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/visits", visitRoutes);
// app.use("scripts/api/medications", medicationRoutes);


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })



db.sequelize.sync({ force: false, logging: console.log }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


