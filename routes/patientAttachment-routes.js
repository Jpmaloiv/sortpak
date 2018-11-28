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
    console.log(req.files)
    const attachmentLink = '/attachments/patients/' + req.query.patientId + '/' + req.files.patientFile.name;
    const attachment = {
        dateAttached: req.query.dateAttached,
        attachedBy: req.query.attachedBy,
        type: req.query.type.trim(),
        link: attachmentLink,
        PatientId: req.query.patientId,
        UserId: req.payload.id
    }

    const attachmentFile = req.files.patientFile;
    fs.mkdir("./attachments/patients/" + req.query.patientId, (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const attachmentPath = './attachments/patients/' + req.query.patientId + '/' + req.files.patientFile.name;
            console.log("dir created");
            console.log("file saved");
            attachmentFile
                .mv(attachmentPath)
                .then((response) => {
                    db.patientAttachments
                        .create(attachment)
                        .then((resp) => {
                            res.status(200).json({ message: "Upload successful!" });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "Internal server error.", error: err });
                        })
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
            exclude: ["updatedAt"]
        },
        include: [{
            model: db.User,
            attributes: ["id", "username"]
        }]
    }
    if (req.query.attachmentId) {
        searchParams.where.id = req.query.attachmentId
    }

    db.patientAttachments
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