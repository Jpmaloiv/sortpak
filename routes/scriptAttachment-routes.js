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
    const scriptLink = '/attachments/' + req.payload.id + '/' + req.query.dateAttached.trim() + ".pdf";
    const attachment = {
        dateAttached: req.query.dateAttached,
        attachedBy: req.query.attachedBy,
        type: req.query.type,
        link: scriptLink,
        UserId: req.payload.id
    }

    fs.mkdir("./attachments/", (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const scriptPath = './scriptAttachments/' + req.payload.id + '/' + req.query.dateAttached.trim() + ".pdf";
            // console.log("dir created");
                    // console.log("file saved");
                    db.scriptAttachments
                        .create(attachment)
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
    if (req.query.attachmentId) {
        searchParams.where.id = req.query.attachmentId
    }
  
    console.log(searchParams);
    db.scriptAttachments
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