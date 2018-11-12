const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//user creatiion
router.post("/new", authCtrl.register);
//user login
router.post("/login", authCtrl.login);
//user update
router.put("/update", authCtrl.update);

router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ['hash','salt', "updatedAt"]
        },
       
    }
    if (req.query.userId) {
        searchParams.where.id = req.query.userId
    }

    if (req.query.role) {
        searchParams.where.role = req.query.role
    }

    console.log(searchParams);
    db.User
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