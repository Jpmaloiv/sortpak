const db = require("../models");
const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");

router.get("/find", (req, res) => {
    db.Patients.findAll({
        where: {},
        attributes: {
            exclude: ["salt", "hash", "updatedAt", "createdAt"]
        },
        include: [{
            model: db.Scripts,
            where: { PhysicianId: req.query.physicianId},
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

// router.get("/:patientId", (req, res) => {
//     db.Patients.findOne({
//         where: { id: req.params.patientId},
//         attributes: {
//             exclude: ["salt", "hash", "updatedAt", "createdAt"]
//         },
//         include: [{
//             model: db.Scripts
//         }]

//     })
//         .then(resp => {
//             res.json(resp)
//         })
//         .catch(err => {
//             console.error(err);
//             return res.status(500).end("Can't find user" + err.toString());
//         });
// });

router.put("/:id", authCtrl.update);


module.exports = router;