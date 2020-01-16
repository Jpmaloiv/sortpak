
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

const paymentTransactions = require('../controllers/Authorize.Net/PaymentTransactions')


router.post("/charge", async (req, res) => {

    console.log("req.query", req.query)

    const payment = {
        name: req.query.name,
        amount: req.query.amount,
        receiptLink: req.query.receiptLink,
        transactionId: req.query.transactionId,
        ScriptId: req.query.scriptId
    }

    paymentTransactions.chargeCreditCard(req.query)

    // try {
    //     console.log("IN TRY")
    //     const hello = await paymentTransactions.chargeCreditCard(payment)
    //     console.log("HELLO", hello)
            
    // } catch (err) {
    //     req.errorHandler("ERROR", err, res)
    // }

    // // Stripe
    // const convertedAmount = req.query.amount * 100;
    // return stripe.charges
    //     .create({
    //         amount: convertedAmount, // Unit: cents
    //         currency: 'usd',
    //         source: req.body.token.id,
    //         description: 'Test payment',
    //     })
    //     .then(result => res.status(200).json(result),

    //         db.scriptPayments
    //             .create(scriptPayment)
    //             .then((resp) => {
    //                 res.status(200).json({ message: "Upload successful!" });
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 res.status(500).json({ message: "Internal server error.", error: err });
    //             }))

    //     .catch((err) => {
    //         console.error(err);
    //         res.status(500).json({ message: "Error (500): Internal Server Error", error: err })
    //     })
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

    if (req.query.rep) {
        searchParams = {
            where: {},
            include: [{
                model: db.Scripts,
                include: [{
                    model: db.Physicians
                }]
            }]
        }
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