const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post("/add", (req, res) => {
    const patientLink = '/patients/' + req.payload.id + '/' + req.query.firstName.trim() + ".pdf";
    const patient = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        dob: req.query.dob,
        sex: req.query.sex,
        phone: req.query.phone,
        email: req.query.email,
        patientWarning: req.query.patientWarning,
        conditions: req.query.conditions,
        allergies: req.query.allergies,
        address1: req.query.address1,
        address2: req.query.address2,
        primInsPlan: req.query.primInsPlan,
        primInsBIN: req.query.primInsBIN,
        primInsPCN: req.query.primInsPCN,
        primInsID: req.query.primInsID,
        primInsGroup: req.query.primInsGroup,
        primInsType: req.query.primInsType,
        secInsPlan: req.query.secInsPlan,
        secInsBIN: req.query.secInsBIN,
        secInsPCN: req.query.secInsPCN, 
        secInsID: req.query.secInsID,
        secInsGroup: req.query.secInsGroup,
        secInsType: req.query.secInsType,
        link: patientLink,
        UserId: req.payload.id
    }

    fs.mkdir("./patients/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const patientPath = './patients/' + req.payload.id + '/' + req.query.firstName.trim() + ".pdf";
            // console.log("dir created");
                    // console.log("file saved");
                    db.Patients
                        .create(patient)
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


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt", "UserId"]
        },
        include: [{
            model: db.Scripts,
            attributes: ["id", "patient", "processedOn", "status"],
        },
        {
            model: db.Physicians,
            attributes: ['id', 'firstName', 'lastName']
        }
        ]
        
    }
    if (req.query.patientId) {
        searchParams.where.id = req.query.patientId
    }
  
    console.log(searchParams);
    db.Patients
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