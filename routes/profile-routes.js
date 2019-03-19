const db = require("../models");
const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/find", (req, res) => {


    const physicianIds = req.query.physicianIds.split(',');

    db.Patients.findAll({
        where: {
            firstName: { like: '%' + req.query.name + '%' },
            dob: { like: '%' + req.query.dob + '%' },

            [Op.or]: [
                { addressStreet: { like: '%' + req.query.address + '%' } },
                { addressCity: { like: '%' + req.query.address + '%' } },
                { addressState: { like: '%' + req.query.address + '%' } },
                { addressZipCode: { like: '%' + req.query.address + '%' } }
            ]
        },

        attributes: {
            exclude: ["salt", "hash", "updatedAt", "createdAt"]
        },
        include: [{
            model: db.Scripts,
            where: {
                PhysicianId: {
                    [Op.in]: physicianIds
                }
            }
        }],
    })
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end("Can't find user" + err.toString());
        });
});

router.put("/:id", authCtrl.update);


module.exports = router;