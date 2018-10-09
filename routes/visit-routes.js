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
    const visitLink = '/visits/' + req.payload.id + '/' + req.query.date.trim() + ".pdf";
    const visit = {
        date: req.query.date,
        time: req.query.time,
        link: visitLink,
        UserId: req.payload.id
    }

    fs.mkdir("./visits/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const visitPath = './visits/' + req.payload.id + '/' + req.query.date.trim() + ".pdf";
            // console.log("dir created");
                    // console.log("file saved");
                    db.Visits
                        .create(visit)
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
    if (req.query.visitId) {
        searchParams.where.id = req.query.visitId
    }
  
    console.log(searchParams);
    db.Visits
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