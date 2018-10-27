const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post("/add", (req, res) => {
    const physicianLink = '/physicians/'
    const physician = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        specialization: req.query.specialization,
        group: req.query.group,
        rep: req.query.rep,
        DEA: req.query.DEA,
        NPI: req.query.NPI,
        phone: req.query.phone,
        fax: req.query.fax,
        email: req.query.fax,
        contact: req.query.contact,
        addressStreet: req.query.addressStreet,
        addressCity: req.query.addressCity,
        addressState: req.query.addressState,
        addressZipCode: req.query.addressZipCode,
        physicianWarning: req.query.physicianWarning,
        link: physicianLink,
    }

    fs.mkdir("./physicians/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const physicianPath = './physicians/'
            // console.log("dir created");
                    // console.log("file saved");
                    db.Physicians
                        .create(physician)
                        .then((resp) => {
                            res.status(200).json({ message: "Upload successful!" });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "Internal server error.", error: err });
                        })
                
        }
    })
});


router.get("/find", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        include: [{
            model: db.Scripts,
            attributes: ["status", "processedOn", 'PatientId']
        }
        ]
    }
    if (req.query.physicianId) {
        searchParams.where.id = req.query.physicianId
    }
  
    console.log(searchParams);
    db.Physicians
        .findAll(searchParams)
        .then((response) => {
            res.json({
                success: true,
                response: response
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error (500): Internal Server Error", error: err })
        })
    })


module.exports = router;