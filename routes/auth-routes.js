const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");

//user creatiion
router.post("/new", authCtrl.register);
//user login
router.post("/login", authCtrl.login)

router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
       
    }
    if (req.query.userId) {
        searchParams.where.id = req.query.userId
    }
  
    console.log(searchParams);
    db.Users
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