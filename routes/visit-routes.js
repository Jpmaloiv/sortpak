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
    const visit = {
        dateTime: req.query.dateTime,
        Rep: req.query.Rep,
        Physician: req.query.Physician,
        group: req.query.group,
        PhysicianId: req.query.physicianId
    }

    db.Visits
        .create(visit)
        .then((resp) => {
            res.status(200).json({ message: "Upload successful!" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error.", error: err });
        })
});


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        }
    }
    if (req.query.visitId) {
        searchParams.where.id = req.query.visitId
    }

    if (req.query.physicianId) {
        searchParams.where.PhysicianId = req.query.physicianId
    }

    if (req.query.group) {
        searchParams.where.group = req.query.group
    }

    // if (req.query.rep) {
    //     searchParams.where.Rep = req.query.rep
    // }

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