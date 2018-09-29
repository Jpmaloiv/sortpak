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
    const scriptLink = '/scripts/' + req.payload.id + '/' + req.query.patient.trim() + ".pdf";
    const script = {
        patient: req.query.patient,
        medication: req.query.medication,
        status: req.query.status,
        pharmNPI: req.query.pharmNPI,
        location: req.query.location,
        pharmDate: req.query.pharmDate,
        writtenDate: req.query.writtenDate,
        salesCode: req.query.salesCode,
        billOnDate: req.query.billOnDate,
        cost: req.query.cost,
        rxNumber: req.query.rxNumber,
        primInsPay: req.query.primInsPay,
        diagnosis: req.query.diagnosis,
        secInsPay: req.query.secInsPay,
        secDiagnosis: req.query.secDiagnosis,
        patientPay: req.query.patientPay,
        refills: req.query.refills,
        refillsRemaining: req.query.refillsRemaining,
        quantity: req.query.quantity,
        daysSupply: req.query.daysSupply,
        copayApproval: req.query.copayApproval,
        copayNetwork: req.query.copayNetwork,
        homeInfusion: req.query.homeInfusion,
        directions: req.query.directions,
        phone: req.query.phone,
        email: req.query.email,
        link: scriptLink,
        UserId: req.payload.id
    }

    fs.mkdir("./scripts/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const scriptPath = './scripts/' + req.payload.id + '/' + req.query.patient.trim() + ".pdf";
            // console.log("dir created");
                    // console.log("file saved");
                    db.Scripts
                        .create(script)
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
            exclude: ["createdAt", "updatedAt", "UserId"]
        },
        include: [{
            model: db.User,
            attributes: ["id", "username"]
        }]
    }
    if (req.query.scriptId) {
        searchParams.where.id = req.query.scriptId
    }
  
    console.log(searchParams);
    db.Scripts
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