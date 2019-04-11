const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const aws = require('aws-sdk');


var moment = require('moment');

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-west-1';

const { config } = require('dotenv');
config();
if (process.env.PHAXIOKEY === undefined || process.env.PHAXIOSECRET === undefined) {
    console.log('No `PHAXIOKEY` or `PHAXIOSECRET` found in file `.env`. Exiting.');
    process.exit();
}

const Phaxio = require('phaxio-official');
const phaxio = new Phaxio(process.env.PHAXIOKEY, process.env.PHAXIOSECRET);


router.post("/upload", (req, res) => {

    const currentDate = moment().format('MM-DD-YYYY');
    const faxLink = '/faxes/' + '/download' + ".pdf";

    const fax = {
        PatientId: req.query.patientId,
        ScriptId: req.query.scriptId,
        link: faxLink,
    }

    console.log("FAX", fax)

    const faxNumber = req.query.faxNumber.trim().replace(/\D/g, '');
    console.log(faxNumber);

    phaxio.faxes.create({
        to: '+1' + faxNumber,
        // file: `./faxes/${req.query.scriptId}_${currentDate}/Fax.pdf`,
        caller_id: '+18774752382'
    })
        .then((fax) => {
            // The `create` method returns a fax object with methods attached to it for doing things
            // like cancelling, resending, getting info, etc.

            // Wait 5 seconds to let the fax send, then get the status of the fax by getting its info from the API.
            return setTimeout(() => {
                fax.getInfo()
            }, 5000)
        })
        .then(status => console.log('Fax status response:\n', JSON.stringify(status, null, 2)))
        .catch((err) => { throw err; });

    db.Faxes
        .create(fax)
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
})

router.get("/sign-s3", (req, res) => {

    const faxId = Math.floor(Math.random()*90000) + 10000;

    const s3 = new aws.S3();
    const date = moment().format('MM-DD-YYYY');
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: `faxes/${date}/Fax-${faxId}.pdf`,
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
            url: `https://s3-us-west-1.amazonaws.com/${S3_BUCKET}/faxes/${date}/Fax-${faxId}.pdf`
        };
        console.log(returnData)
        res.write(JSON.stringify(returnData));
        res.end();
        // open('https://s3-us-west-1.amazonaws.com/sortpak/scripts/attachments/' + req.query.scriptId + '/' + fileName.trim(), function (err) {
        //     if (err) throw err;
        // });
    });
});



router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt"]
        }
    }
    if (req.query.patientId) {
        searchParams.where.PatientId = req.query.patientId
    }

    console.log(searchParams);
    db.Faxes
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