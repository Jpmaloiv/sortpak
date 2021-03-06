const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const util = require('util')


router.post("/add", (req, res) => {

    const script = {
        processedOn: req.query.processedOn,
        pouch: req.query.pouch,
        patient: req.query.patient,
        medication: req.query.medication,
        status: req.query.status,
        pharmNPI: req.query.pharmNPI,
        priorAuth: req.query.priorAuth,
        location: req.query.location,
        pharmDate: req.query.pharmDate,
        writtenDate: req.query.writtenDate,
        salesCode: req.query.salesCode,
        billOnDate: req.query.billOnDate,
        cost: req.query.cost,
        rxNumber: req.query.rxNumber,
        primInsPay: req.query.primInsPay,
        diagnosis: req.query.diagnosis,
        secInsPay: req.query.secInsPay,
        secDiagnosis: req.query.secDiagnosis,
        patientPay: req.query.patientPay,
        refills: req.query.refills,
        refillsRemaining: req.query.refillsRemaining,
        quantity: req.query.quantity,
        daysSupply: req.query.daysSupply,
        copayApproval: req.query.copayApproval,
        copayNetwork: req.query.copayNetwork,
        homeCare: req.query.homeCare,
        directions: req.query.directions,
        hcHome: req.query.hcHome,
        hcPhone: req.query.hcPhone,
        transLocation: req.query.transLocation,
        transNPI: req.query.transNPI,
        transDate: req.query.transDate,
        shipOn: req.query.shipOn,
        deliveryMethod: req.query.deliveryMethod,
        trackNum: req.query.trackNum,
        ETA: req.query.ETA,
        paymentOption: req.query.paymentOption,
        doNotRefill: req.query.doNotRefill,
        lastFill: req.query.lastFill,
        PatientId: req.query.patientId,
        PhysicianId: req.query.physicianId,
        ProductId: req.query.productId
    }

    db.Scripts
        .create(script)
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
            exclude: ["createdAt"]
        },
        include: [{
            model: db.Patients,
            attributes: ["id", "firstName", "lastName", "dob", "hub", "phone", 'sex', "addressStreet", "addressCity", "addressState", "addressZipCode", "email", "patientWarning", "conditions", "allergies", 'primInsPlan',
                'primInsBIN', 'primInsGroup', 'primInsID', 'primInsPCN', 'primInsType', 'secInsPlan', 'secInsBIN', 'secInsGroup',
                'secInsID', 'secInsPCN', 'secInsType', 'createdAt']
        },
        {
            model: db.Physicians,
            attributes: ["firstName", "lastName", 'specialization', "group", "rep", "contact", "phone", "fax", "physicianWarning", "addressStreet", "addressCity", "addressState", "addressZipCode"],

        },
        {
            model: db.Products,
            attribues: ['id', 'name']

        },
        {
            model: db.scriptNotes,
            attributes: ['note', 'createdAt']
        },
        {
            model: db.scriptAttachments,
            attributes: ['id']
        }
        ]
    }

    if (req.query.rep) {
        console.log("QUERY:" + JSON.stringify(req.query))
        searchParams = {
            include: [{
                model: db.Patients, attributes: ["firstName", "lastName", "dob", "phone", "email", "patientWarning", "conditions", "allergies", 'primInsPlan',
                    'primInsBIN', 'primInsGroup', 'primInsID', 'primInsPCN', 'primInsType', 'secInsPlan', 'secInsBIN', 'secInsGroup',
                    'secInsID', 'secInsPCN', 'secInsType']
            }, {
                model: db.Physicians, attributes: ["firstName", "lastName", 'specialization', "rep", "contact", "phone", "physicianWarning"],
                where: {
                    [Op.or]: [{ rep: req.query.rep }]
                },
            }, { model: db.Products, }, { model: db.scriptNotes, attributes: ['note', 'createdAt'] }, { model: db.scriptAttachments, attributes: ['id'] }]
        }
    }

    if (req.query.specialization) {
        searchParams = {
            include: [{
                model: db.Patients, attributes: ["firstName", "lastName", "dob", "phone", "email", "patientWarning", "conditions", "allergies", 'primInsPlan',
                    'primInsBIN', 'primInsGroup', 'primInsID', 'primInsPCN', 'primInsType', 'secInsPlan', 'secInsBIN', 'secInsGroup',
                    'secInsID', 'secInsPCN', 'secInsType']
            }, {
                model: db.Physicians, attributes: ["firstName", "lastName", 'specialization', "rep", "contact", "phone", "physicianWarning"],
                where: {
                    [Op.or]: [{ specialization: req.query.specialization }]
                },
            }, { model: db.Products, }, { model: db.scriptNotes, attributes: ['note', 'createdAt'] }, { model: db.scriptAttachments, attributes: ['id'] }]
        }
    }

    // if (req.query.textSearch) {
    //     searchParams = {
    //         include: [{
    //             model: db.Patients, attributes: ["firstName", "lastName", "dob", "phone", "email", "patientWarning", "conditions", "allergies", 'primInsPlan',
    //                 'primInsBIN', 'primInsGroup', 'primInsID', 'primInsPCN', 'primInsType', 'secInsPlan', 'secInsBIN', 'secInsGroup',
    //                 'secInsID', 'secInsPCN', 'secInsType'],
    //         }, {
    //             model: db.Physicians, attributes: ["firstName", "lastName", 'specialization', "rep", "contact", "phone", "physicianWarning"],
    //         }, {
    //             model: db.Products,
    //             where: {
    //                 [Op.or]: [{
    //                     name: { like: '%' + req.query.textSearch + '%' }
    //                 }, {
    //                     NDC: { like: '%' + req.query.textSearch + '%' }
    //                 }]
    //             }
    //         }, { model: db.scriptNotes, attributes: ['note', 'createdAt'] }, { model: db.scriptAttachments, attributes: ['id'] }]

    //     }
    // }




    if (req.query.scriptId) {
        searchParams.where.id = req.query.scriptId
    }
    if (req.query.salesCode) {
        searchParams.where.salesCode = req.query.salesCode
    }
    if (req.query.homeCare) {
        searchParams.where.homeCare = req.query.homeCare
    }
    if (req.query.location === 'SP') {
        searchParams.where.location = ''
    } else if (req.query.location === 'thirdParty') {
        searchParams.where.location = {
            [Op.ne]: ''
        }
    }

    if (req.query.patientId) {
        searchParams.where.PatientId = req.query.patientId
    }

    if (req.query.physicianId) {
        searchParams.where.PhysicianId = req.query.physicianId
    }

    if (req.query.productId) {
        searchParams.where.ProductId = req.query.productId
    }

    if (req.query.repFilter) {
        searchParams = {
            where: {},
            attributes: {
                exclude: ["updatedAt"]
            },
            include: [{
                model: db.Physicians,
                where: {
                    rep: req.query.repFilter
                }
            }]
        }
    }

    if (req.query.exactStatus) {
        searchParams.where.status = req.query.exactStatus
    }

    if (req.query.status) {
        if (req.query.status.match(/,.*,.*,.*,.*,.*,.*,.*,.*,.*,.*,.*,/)) { // Check if there are 2 commas
            str = str.replace(',', ''); // Remove the first one
        }
        const statuses = req.query.status.split(',').map((elem) => {
            return elem;
        });
        if (statuses.length > 1) {
            const opLikes = statuses.map((elem) => {
                return { [Op.like]: elem }
            })
            searchParams.where.status = {
                [Op.or]: opLikes
            }
        } else {
            searchParams.where.status = {
                [Op.like]: statuses[0]
            }
        }
    }

    db.Scripts
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

router.get("/find", (req, res) => {


    const physicianIds = req.query.physicianIds.split(',');

    db.Scripts.findAll({
        where: {
            PatientId: req.query.patientId,
            PhysicianId: {
                [Op.in]: physicianIds
            }
        },
        attributes: {
            exclude: ["salt", "hash", "updatedAt", "createdAt"]
        },
        include: [{
            model: db.Physicians
        },
        {
            model: db.Products
        }]
    })
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end("Can't find user" + err.toString());
        });
});



router.put("/update", function (req, res) {

    const script = {
        processedOn: req.query.processedOn,
        pouch: req.query.pouch,
        patient: req.query.patient,
        writtenDate: req.query.writtenDate,
        billOnDate: req.query.billOnDate,
        rxNumber: req.query.rxNumber,
        diagnosis: req.query.diagnosis,
        secDiagnosis: req.query.secDiagnosis,
        refills: req.query.refills,
        refillsRemaining: req.query.refillsRemaining,
        quantity: req.query.quantity,
        daysSupply: req.query.daysSupply,
        salesCode: req.query.salesCode,
        cost: req.query.cost,
        primInsPay: req.query.primInsPay,
        secInsPay: req.query.secInsPay,
        diagnosis: req.query.diagnosis,
        secDiagnosis: req.query.secDiagnosis,
        priorAuth: req.query.priorAuth,
        location: req.query.location,
        copayApproval: req.query.copayApproval,
        copayNetwork: req.query.copayNetwork,
        networkPay: req.query.networkPay,
        patientPay: req.query.patientPay,
        directions: req.query.directions,
        status: req.query.status,
        homeCare: req.query.homeCare,
        hcHome: req.query.hcHome,
        hcPhone: req.query.hcPhone,
        transLocation: req.query.transLocation,
        transNPI: req.query.transNPI,
        transDate: req.query.transDate,
        cancelReason: req.query.cancelReason,
        shipOn: req.query.shipOn,
        deliveryMethod: req.query.deliveryMethod,
        trackNum: req.query.trackNum,
        ETA: req.query.ETA,
        paymentOption: req.query.paymentOption,
        notesUpdated: req.query.notesUpdated,
        doNotRefill: req.query.doNotRefill,
        PatientId: req.query.patientId,
        PhysicianId: req.query.physicianId,
        ProductId: req.query.productId
    }

    db.Scripts.update(script, { where: { id: req.query.id } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
        });
})

router.put("/merge", function (req, res) {
    const script = {
        PatientId: req.query.patientId
    }

    db.Scripts.update(script, { where: { PatientId: req.query.oldPatientId } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).end('Update FAILED' + err.toString());
            throw err;
        });
})

router.put("/mergephys", function (req, res) {
    const script = {
        PhysicianId: req.query.physicianId
    }

    db.Scripts.update(script, { where: { PhysicianId: req.query.oldPhysicianId } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).end('Update FAILED' + err.toString());
            throw err;
        });
})


router.put("/updateNoteTime", function (req, res) {
    const script = {
        notesUpdated: req.query.notesUpdated,
    }

    db.Scripts.update(script, { where: { id: req.query.id } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
            return res.status(500).end('Update FAILED' + err.toString());
            throw err;
        });
})

router.put("/fax", function (req, res) {

    const script = {
        faxNum: req.query.faxNum,
        lastFaxed: req.query.lastFaxed
    }

    db.Scripts.update(script, { where: { id: req.query.id } })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(function (err) {
            console.error(err);
        });
})



module.exports = router;