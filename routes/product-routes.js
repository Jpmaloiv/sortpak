const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var url = require('url');

router.get("/search", (req, res) => {
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // var dbQuery = {
    //         attributes: ['DrugName', 'DrugNdc'],
    //         where: {
    //             [Op.or]:  [{
    //                 DrugName: {
    //                     like: '%'+ query.s + '%'
    //                 }
    //             }, {
    //                 DrugNdc: {
    //                     like: '%' + query.s + '%'
    //                 }
    //             }]
    //         }
    //     }
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt","updatedAt", "UserId"]
        }
    }
    db.Products
        .findAll(searchParams)
        .then((response) => {
            res.json({
               successs: true,
               response: response
            });
            console.log(response)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error (500): Internal Server Error", error: err })
        })
})


module.exports = router;