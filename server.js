// requirements
require("dotenv").config();
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const authRoutes = require("./routes/auth-routes.js");
const currentPatientRoutes = require("./routes/currentPatient-routes.js");
const scriptRoutes = require("./routes/script-routes.js");
const scriptNoteRoutes = require("./routes/scriptNote-routes.js");
const scriptAttachmentRoutes = require("./routes/scriptAttachment-routes.js");
const patientRoutes = require("./routes/patient-routes.js");
const patientNoteRoutes = require("./routes/patientNote-routes.js");
const profileRoutes = require("./routes/profile-routes.js");
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

// file upload middleware
app.use(fileUpload())
// Requiring our models for syncing
const db = require(path.join(__dirname + '/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use(express.static(path.join(__dirname + '/public')));
// app.use("/api/user", authRoutes);
app.use(express.static(path.join(__dirname + '/user')));
app.use(express.static(path.join(__dirname + '/scripts')));
// app.use(express.static(path.join(__dirname + '/scriptNotes')));
// app.use(express.static(path.join(__dirname + '/notes')));
app.use(express.static(path.join(__dirname + '/attachments')));

app.use(express.static(path.join(__dirname + '/patients')));
app.use(express.static(path.join(__dirname + '/patientNotes')));
app.use(express.static(path.join(__dirname + '/patientAttachments')));
app.use(express.static(path.join(__dirname + '/products')));
app.use(express.static(path.join(__dirname + '/physicians')));
app.use(express.static(path.join(__dirname + '/visits')));


app.use("/api/user", authRoutes);
app.use(["/api/scripts"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use(["/api/attachments"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/attachments", scriptAttachmentRoutes);
app.use("/api/scripts/notes", scriptNoteRoutes);
app.use(["/api/scripts/notes"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/scripts", scriptRoutes);
app.use(["/api/patients/attachments"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/patients/attachments", patientAttachmentRoutes);
app.use("/api/patients/notes", patientNoteRoutes);
app.use(["/api/patients/notes"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use(["/api/patients"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/patients", patientRoutes);
// app.use(["/api/physicians"], jwt({
//     secret: process.env.JWT_SECRET,
//     userProperty: 'payload'
// }));
app.use("/api/physicians", physicianRoutes);
app.use(["/api/products"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/products", productRoutes);
app.use(["/api/visits"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/visits", visitRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/current", currentPatientRoutes);

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


