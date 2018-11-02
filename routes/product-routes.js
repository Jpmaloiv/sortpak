const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
    }

    if (req.query.name) {
        searchParams.where.name = req.query.name
    }

    if (req.query.productId) {
        searchParams.where.id = req.query.productId
    }
  
    console.log(searchParams);
    db.Products
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