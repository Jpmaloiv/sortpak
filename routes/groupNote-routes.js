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

    const note = {
        group: req.query.group,
        name: req.query.name,
        note: req.query.note,
    }

    db.groupNotes
        .create(note)
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
            exclude: ["updatedAt"]
        }
    }

    const group = req.query.group.replace('%20',' ')

    if (group) {
        searchParams.where.group = group
    }

    console.log(searchParams);
    db.groupNotes
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