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
        processedOn: req.query.processedOn,
        pouch: req.query.pouch,
        patient: req.query.patient,
        medication: req.query.medication,
        status: req.query.status,
        pharmNPI: req.query.pharmNPI,
        priorAuth: req.query.priorAuth,
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
        homeCare: req.query.homeCare,
        directions: req.query.directions,
        hcHome: req.query.hcHome,
        hcPhone: req.query.hcPhone,
        transLocation: req.query.transLocation,
        transNPI: req.query.transNPI,
        transDate: req.query.transDate,
        shipOn: req.query.shipOn,
        deliveryMethod: req.query.deliveryMethod,
        trackNum: req.query.trackNum,
        ETA: req.query.ETA,
        paymentOption: req.query.paymentOption,
        link: scriptLink,
        PatientId: req.query.patientId,
        PhysicianId: req.query.physicianId
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
            exclude: ["createdAt"]
        },
        // include: [{
        //     model: db.Patients,
        //     attributes: ["firstName", "lastName", "dob", "phone", "email", "patientWarning", "conditions", "allergies"],
        // },
        // {
        //     model: db.Physicians,
        //     attributes: ["firstName", "lastName", "rep", "contact", "phone", "physicianWarning"]
        // },
        // {
        //     model: db.scriptNotes,
        //     attributes: ['note', 'createdAt', 'UserId']
        // }
        // ]
      
    }
    if (req.query.scriptId) {
        searchParams.where.id = req.query.scriptId
    }
    if (req.query.salesCode) {
        searchParams.where.salesCode = req.query.salesCode
    }
    if (req.query.homeCare) {
        searchParams.where.homeCare = req.query.homeCare
    }

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



router.put("/update", function (req, res) {
    console.log("update")
    const script = {
        processedOn: req.query.processedOn,
        pouch: req.query.pouch,
        patient: req.query.patient,
        writtenDate: req.query.writtenDate,
        billOnDate: req.query.billOnDate,
        rxNumber: req.query.rxNumber,
        diagnosis: req.query.diagnosis,
        secDiagnosis: req.query.secDiagnosis,
        refills: req.query.refills,
        refillsRemaining: req.query.refillsRemaining,
        quantity: req.query.quantity,
        daysSupply: req.query.daysSupply,
        salesCode: req.query.salesCode,
        cost: req.query.cost,
        primInsPay: req.query.primInsPay,
        secInsPay: req.query.secInsPay,
        diagnosis: req.query.diagnosis,
        secDiagnosis: req.query.secDiagnosis,
        priorAuth: req.query.priorAuth,
        location: req.query.location,
        copayApproval: req.query.copayApproval,
        copayNetwork: req.query.copayNetwork,
        networkPay: req.query.networkPay,
        patientPay: req.query.patientPay,
        status: req.query.status,
        homeCare: req.query.homeCare,
        hcHome: req.query.hcHome,
        hcPhone: req.query.hcPhone,
        transLocation: req.query.transLocation,
        transNPI: req.query.transNPI,
        transDate: req.query.transDate,
        shipOn: req.query.shipOn,
        deliveryMethod: req.query.deliveryMethod,
        trackNum: req.query.trackNum,
        ETA: req.query.ETA,
        paymentOption: req.query.paymentOption,
    }
    console.log(script);
    db.Scripts.update(script, { where: { id: req.query.id } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).end('Update FAILED' + err.toString());
            throw err;
        });
})


module.exports = router;