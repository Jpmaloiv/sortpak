const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post("/upload", (req, res) => {
    const attachmentFile = req.files.attachmentFile;
    const title = req.files.attachmentFile.name;
    console.log(req.payload);
    const attachmentLink = '/attachments/' + req.payload.id + '/' + title.trim() + ".pdf";
    const attachment = {
        title,
        attachedBy: req.query.attachedBy,
        type: req.query.type,
        link: attachmentLink,
        ScriptId: req.query.scriptId
        // title: req.query.title,
        // link: req.query.link
    }

    fs.mkdir("./attachments/attachments/" + req.payload.id.toString(), (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const attachmentPath = './attachments/attachments/' + req.payload.id + '/' + title.trim() + ".pdf";
            console.log("dir created");
            attachmentFile
                .mv(attachmentPath)
                .then((response) => {
                    console.log("file saved");
                    db.scriptAttachments
                        .create(attachment)
                        .then((resp) => {
                            res.status(200).json({ message: "Upload successful!" });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "Internal server error.", error: err });
                        })
                
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Internal server error.", error: err });
                })
        })}
    })
});

router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt", "UserId"]
        }
    }

    if (req.query.attachmentId) {
        searchParams.where.id = req.query.attachmentId
    }
    if (req.query.title) {
        searchParams.where.title = {
            [Op.like]: '%' + req.query.title + '%'
        }
    }

    if (req.query.ScriptId) {
        searchParams.where.ScriptId = req.query.ScriptId
    }
  
    console.log(searchParams)
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

router.put("/upload/:id", (req, res) => {
    var attachment = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }

    db.scriptAttachments.update({
        attachment, where: {
            id: req.param.id
        }
    })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end('Attachment update failed' + err.toString());
        });
});

router.delete("/delete/:id", (req, res) => {
    var attachment = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }

    db.scriptAttachments.destroy({
        where: {
            id: req.param.id
        }
    })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end(err.toString());
        });
});

module.exports = router;