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
    const physicianLink = '/physicians/' + req.payload.id;
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
        address1: req.query.address1,
        address2: req.query.address2,
        address3: req.query.address3,
        physicianWarning: req.query.physicianWarning,
        link: physicianLink,
        UserId: req.payload.id
    }

    fs.mkdir("./physicians/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const physicianPath = './physicians/' + req.payload.id;
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