
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


const stripe = require("stripe")("sk_test_OVr1Ou3Gc5Vx4uqaZ888w1bz");
// app.use(require("body-parser").text());


router.post("/charge", async (req, res) => {
    const scriptPayment = {
        name: req.query.name,
        amount: req.query.amount,
        receiptLink: req.query.receiptLink,
        ScriptId: req.query.scriptId
    }

    // Stripe
    const convertedAmount = req.query.amount * 100;
    return stripe.charges
        .create({
            amount: convertedAmount, // Unit: cents
            currency: 'usd',
            source: req.body.token.id,
            description: 'Test payment',
        })
        .then(result => res.status(200).json(result),

            db.scriptPayments
                .create(scriptPayment)
                .then((resp) => {
                    res.status(200).json({ message: "Upload successful!" });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Internal server error.", error: err });
                }))

        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error (500): Internal Server Error", error: err })
        })
});


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt"]
        },
        // include: [{
        //     model: db.User,
        //     attributes: ["id", "username"]
        // }]
    }

    if (req.query.scriptId) {
        searchParams.where.ScriptId = req.query.scriptId
    }

    if (req.query.id) {
        searchParams.where.id = req.query.id
    }

    console.log(searchParams);
    db.scriptPayments
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