const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post("/add", (req, res) => {
    const patientLink = '/patients/' + req.payload.id + '/' + req.query.firstName.trim() + ".pdf";
    const patient = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        dob: req.query.dob,
        hub: req.query.hub,
        sex: req.query.sex,
        email: req.query.email,
        patientWarning: req.query.patientWarning,
        conditions: req.query.conditions,
        allergies: req.query.allergies,
        primInsPlan: req.query.primInsPlan,
        primInsBIN: req.query.primInsBIN,
        primInsPCN: req.query.primInsPCN,
        primInsID: req.query.primInsID,
        primInsGroup: req.query.primInsGroup,
        primInsType: req.query.primInsType,
        secInsPlan: req.query.secInsPlan,
        secInsBIN: req.query.secInsBIN,
        secInsPCN: req.query.secInsPCN,
        secInsID: req.query.secInsID,
        secInsGroup: req.query.secInsGroup,
        secInsType: req.query.secInsType,
        addressStreet: req.query.addressStreet,
        addressCity: req.query.addressCity,
        addressState: req.query.addressState,
        addressZipCode: req.query.addressZipCode,
        address2Street: req.query.address2Street,
        address2City: req.query.address2City,
        address2State: req.query.address2State,
        address2ZipCode: req.query.address2ZipCode,
        address3Street: req.query.address3Street,
        address3City: req.query.address3City,
        address3State: req.query.address3State,
        address3ZipCode: req.query.address3ZipCode,
        phone: req.query.phone,
        phone2: req.query.phone2,
        phone3: req.query.phone3,
        link: patientLink,
        UserId: req.payload.id
    }

    db.Patients
        .create(patient)
        .then((resp) => {
            res.status(200).json({ message: "Upload successful!" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal server error.", error: err });
        })

})


router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["updatedAt", "UserId"]
        }
    }
    console.log(JSON.stringify(req.query))
    if (req.query.patientId) {
        searchParams.where.id = req.query.patientId
    }

    if (req.query.name) {
        if (req.query.name.trim().indexOf(' ') != -1) {
            const names = req.query.name.split(' ');
            const firstName = names[0];
            const lastName = names[1];

            searchParams = {
                where: {
                    [Op.and]: [{
                        firstName: {
                            like: '%' + firstName + '%'
                        }
                    }, {
                        lastName: {
                            like: '%' + lastName + '%'
                        }
                    }]
                }
            }
        } else {
            searchParams = {
                where: {
                    [Op.and]: [{
                        [Op.or]: [{
                            firstName: {
                                like: '%' + req.query.name + '%'
                            }
                        }, {
                            lastName: {
                                like: '%' + req.query.name + '%'
                            }
                        }]
                    }]
                }
            }
        }

    }

    if (req.query.dob) {
        searchParams.where.dob = req.query.dob
    }

    // if (req.query.rep) {
    //     searchParams = {
    //         include: [{
    //             model: db.Scripts,
    //             include: [{
    //                 model: db.Physicians, attributes: ["firstName", "lastName", 'specialization', "rep", "contact", "phone", "physicianWarning"],
    //                 where: {
    //                     rep: req.query.rep
    //                 },
    //             }]
    //         }]
    //     }
    // }

    if (req.query.rep) {
        searchParams = {
            include: [{
                model: db.Scripts,
                where: {
                    status: 'Received'
                },
                as: 'Scripts',
                // include: [{
                //     model: db.Physicians,
                //     where: {
                //         rep: req.query.rep
                //     },
                // }]
            }]
        }
    }


    // if (req.query.address) {
    //        searchParams.where = {
    //         firstName: { like: '%' + req.query.name + '%' },
    // }

    console.log("SEARCH:" + JSON.stringify(searchParams));
    db.Patients
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


router.put("/update", function (req, res) {

    const patient = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        dob: req.query.dob,
        sex: req.query.sex,
        hub: req.query.hub,
        email: req.query.email,
        patientWarning: req.query.patientWarning,
        conditions: req.query.conditions,
        allergies: req.query.allergies,
        addressStreet: req.query.addressStreet,
        addressCity: req.query.addressCity,
        addressState: req.query.addressState,
        addressZipCode: req.query.addressZipCode,
        primInsPlan: req.query.primInsPlan,
        primInsBIN: req.query.primInsBIN,
        primInsPCN: req.query.primInsPCN,
        primInsID: req.query.primInsID,
        primInsGroup: req.query.primInsGroup,
        primInsType: req.query.primInsType,
        secInsPlan: req.query.secInsPlan,
        secInsBIN: req.query.secInsBIN,
        secInsPCN: req.query.secInsPCN,
        secInsID: req.query.secInsID,
        secInsGroup: req.query.secInsGroup,
        secInsType: req.query.secInsType,
        addressStreet: req.query.addressStreet,
        addressCity: req.query.addressCity,
        addressState: req.query.addressState,
        addressZipCode: req.query.addressZipCode,
        address2Street: req.query.address2Street,
        address2City: req.query.address2City,
        address2State: req.query.address2State,
        address2ZipCode: req.query.address2ZipCode,
        address3Street: req.query.address3Street,
        address3City: req.query.address3City,
        address3State: req.query.address3State,
        address3ZipCode: req.query.address3ZipCode,
        phone: req.query.phone,
        phone2: req.query.phone2,
        phone3: req.query.phone3,
    }

    db.Patients.update(patient, { where: { id: req.query.id } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).end('Update FAILED' + err.toString());
            throw err;
        });
})

router.delete("/delete", (req, res) => {

    db.Patients.destroy({
        where: {
            id: req.query.patientId
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