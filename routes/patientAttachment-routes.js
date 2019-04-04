const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const aws = require('aws-sdk');


const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-west-1';

router.post("/upload", (req, res) => {

    console.log("QUERY", req.query)

    const title = req.files.patientFile.name;

    const attachment = {
        title,
        attachedBy: req.query.attachedBy,
        type: req.query.type,
        link: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/attachments/patients/${req.query.patientId}/${title}`,
        PatientId: req.query.patientId,
        UserId: req.query.userId
    }

    db.patientAttachments
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
});


router.get("/search", (req, res) => {

    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt"]
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

    if (req.query.patientId) {
        searchParams.where.PatientId = req.query.patientId
    }

    console.log(searchParams)
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


router.get("/sign-s3", (req, res) => {

    console.log("QUERY 2", req.query)
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: "attachments/patients/" + req.query.patientId + "/" + fileName.trim(),
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/attachments/patients/` + req.query.patientId + '/' + fileName.trim()
        };
        console.log(returnData)
        res.write(JSON.stringify(returnData));
        res.end();
        // open('https://s3-us-west-1.amazonaws.com/sortpak/scripts/attachments/' + req.query.scriptId + '/' + fileName.trim(), function (err) {
        //     if (err) throw err;
        // });
    });
});


router.put("/upload/:id", (req, res) => {
    var attachment = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }

    db.patientAttachments.update({
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

router.delete("/delete", (req, res) => {

    console.log("QUERY", req.query)

    var bucketInstance = new aws.S3();
    var params = {
        Bucket: S3_BUCKET,
        Key: 'attachments/patients/' + req.query.patientId + '/' + req.query.name,
    };
    bucketInstance.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully", data);
        }
        else {
            console.log("Check if you have sufficient permissions : " + err);
        }
    });

    db.patientAttachments.destroy({
        where: {
            id: req.query.attachmentId
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