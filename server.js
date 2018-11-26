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
const scriptStatusRoutes = require('./routes/scriptStatus-routes.js');
const patientRoutes = require("./routes/patient-routes.js");
const patientNoteRoutes = require("./routes/patientNote-routes.js");
const profileRoutes = require("./routes/profile-routes.js");
const patientAttachmentRoutes = require("./routes/patientAttachment-routes.js");
const pastInsuranceRoutes = require("./routes/pastInsurance-routes.js");
const physicianRoutes = require("./routes/physician-routes.js");
const productRoutes = require("./routes/product-routes.js");
const visitRoutes = require("./routes/visit-routes.js");
const faxRoutes = require("./routes/fax-routes.js");
const fileUpload = require('express-fileupload');



const aws = require('aws-sdk');

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
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, 'client/build')));

// Stripe
const stripe = require("stripe")("sk_test_OVr1Ou3Gc5Vx4uqaZ888w1bz");
app.use(require("body-parser").text());

app.post("/charge", async (req, res) => {
    return stripe.charges
    .create({
      amount: 2000, // Unit: cents
      currency: 'us',
      source: req.body.tokenId,
      description: 'Test payment',
    })
    .then(result => res.status(200).json(result));
});

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
app.use(express.static(path.join(__dirname + '/pastInsurance')));
app.use(express.static(path.join(__dirname + '/products')));
app.use(express.static(path.join(__dirname + '/physicians')));
app.use(express.static(path.join(__dirname + '/visits')));
app.use(express.static(path.join(__dirname + '/faxes')));


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
app.use("/api/scripts/statuses", scriptStatusRoutes);
app.use(["/api/scripts/statuses"], jwt({
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
app.use(["/api/pastInsurance"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/pastInsurance", pastInsuranceRoutes);
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
app.use(["/api/faxes"], jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/faxes", faxRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/current", currentPatientRoutes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

//   AWS TEST 
 

// const app = express();
// app.set('views', './views');
// app.use(express.static('./public'));
// app.engine('html', require('ejs').renderFile);
// // app.listen(process.env.PORT || 3000);

// const S3_BUCKET = process.env.S3_BUCKET;

// aws.config.region = 'us-west-1';

// app.get('/account', (req, res) => res.render('account.html'));

// app.get('/sign-s3', (req, res) => {
//     const s3 = new aws.S3();
//     const fileName = req.query['file-name'];
//     const fileType = req.query['file-type'];
//     const s3Params = {
//       Bucket: S3_BUCKET,
//       Key: fileName,
//       Expires: 60,
//       ContentType: fileType,
//       ACL: 'public-read'
//     };
  
//     s3.getSignedUrl('putObject', s3Params, (err, data) => {
//       if(err){
//         console.log(err);
//         return res.end();
//       }
//       const returnData = {
//         signedRequest: data,
//         url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//       };
//       res.write(JSON.stringify(returnData));
//       res.end();
//     });
//   });

//   app.post('/save-details', (req, res) => {
//     // TODO: Read POSTed form data and do something useful
//   });

// 


db.sequelize.sync({ force: false, logging: console.log }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


