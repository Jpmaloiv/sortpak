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

    const productAdjustment = {
        orderDate: req.query.orderDate,
        memo: req.query.memo,
        qtyChange: req.query.qtyChange,
        adjustId: req.query.adjustId,
        lot: req.query.lot,
        expiration: req.query.expiration,
        writtenBy: req.query.writtenBy,
        ProductId: req.query.productId
    }

    db.productAdjustments
        .create(productAdjustment)
        .then((resp) => {
            res.status(200).json({ message: "Upload successful!" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error.", error: err });
        })
}
);


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
    }

    if (req.query.productId) {
        searchParams.where.ProductId = req.query.productId
    }

    if (req.query.adjustId) {
        searchParams.where.id = req.query.adjustId
    }

    if (req.query.batchId) {
        searchParams.where.adjustId = req.query.batchId
    }

    console.log(searchParams);
    db.productAdjustments
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

router.put("/update", (req, res) => {

    const productAdjustment = {
        orderDate: req.query.orderDate,
        invoiceNum: req.query.invoiceNum,
        vendor: req.query.vendor,
        memo: req.query.memo,
        qtyChange: req.query.qtyChange,
        orderId: req.query.orderId,
        lot: req.query.lot,
        expiration: req.query.expiration,
        writtenBy: req.query.writtenBy,
    }

    db.productAdjustments
        .update(productAdjustment, { where: { id: req.query.id } })
        .then((resp) => {
            res.status(200).json({ message: "Upload successful!" });
            res.send("YES!")
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error.", error: err });
        })
}
);


module.exports = router;