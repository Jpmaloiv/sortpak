
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
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;
// const utils = require('../utils.js');
// const constants = require('../controllers/constants.js');

const paymentTransactions = require('../controllers/Authorize.Net/PaymentTransactions')


router.post("/charge", (req, res) => {

    const number = req.query.number.replace(/ /g, "")
    const expiry = req.query.expiry.replace(/ /g, "")

    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    // merchantAuthenticationType.setName('86KgWx9un');
    merchantAuthenticationType.setName('73D5BqaZ');
    // merchantAuthenticationType.setTransactionKey('9jtx744ZJp559LQ4');
    merchantAuthenticationType.setTransactionKey('43LxL7L28zq2eRHM');

    const creditCard = new ApiContracts.CreditCardType();

    creditCard.setCardNumber(number);
    creditCard.setExpirationDate(expiry);
    creditCard.setCardCode(req.query.cvc);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const orderDetails = new ApiContracts.OrderType();
    // orderDetails.setInvoiceNumber('INV-12345');
    // orderDetails.setDescription('Product Description');

    const billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(req.query.firstName);
    billTo.setLastName(req.query.lastName);
    // billTo.setCompany('Souveniropolis');
    billTo.setAddress(req.query.address);
    billTo.setCity(req.query.city);
    billTo.setState(req.query.state);
    billTo.setZip(req.query.zipCode);
    billTo.setCountry('USA');
    billTo.setPhoneNumber(req.query.phone)


    // const lineItem_id1 = new ApiContracts.LineItemType();
    // lineItem_id1.setItemId('1');
    // lineItem_id1.setName('vase');
    // lineItem_id1.setDescription('cannes logo');
    // lineItem_id1.setQuantity('1');
    // lineItem_id1.setUnitPrice('1.25');


    // const lineItemList = [];
    // lineItemList.push(lineItem_id1);

    // const lineItems = new ApiContracts.ArrayOfLineItem();
    // lineItems.setLineItem(lineItemList);

    const userField_a = new ApiContracts.UserField();
    userField_a.setName('A');
    userField_a.setValue('Aval');

    const userFieldList = [];
    userFieldList.push(userField_a);

    const userFields = new ApiContracts.TransactionRequestType.UserFields();
    userFields.setUserField(userFieldList);

    const transactionSetting1 = new ApiContracts.SettingType();
    transactionSetting1.setSettingName('duplicateWindow');
    transactionSetting1.setSettingValue('1.75');

    const transactionSetting2 = new ApiContracts.SettingType();
    transactionSetting2.setSettingName('recurringBilling');
    transactionSetting2.setSettingValue('false');

    const transactionSettingList = [];
    transactionSettingList.push(transactionSetting1);
    transactionSettingList.push(transactionSetting2);

    const transactionSettings = new ApiContracts.ArrayOfSetting();
    transactionSettings.setSetting(transactionSettingList);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    // transactionRequestType.setAmount(utils.getRandomAmount());
    transactionRequestType.setAmount(req.query.amount);

    // transactionRequestType.setAmount(callback.amount);
    // transactionRequestType.setLineItems(lineItems);
    transactionRequestType.setUserFields(userFields);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTransactionSettings(transactionSettings);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    //Defaults to sandbox
    // ctrl.setEnvironment(SDKConstants.endpoint.sandbox);
    ctrl.setEnvironment(SDKConstants.endpoint.production);


    ctrl.execute(function () {

        const apiResponse = ctrl.getResponse();

        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        //pretty print response
        console.log(JSON.stringify(response, null, 2));

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactionResponse().getMessages() != null) {
                    console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
                    console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
                    console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
                    console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());

                    const transactionId = response.getTransactionResponse().getTransId()
                    console.log("ID", transactionId)

                    const payment = {
                        name: req.query.name,
                        amount: req.query.amount,
                        receiptLink: req.query.receiptLink,
                        transactionId: req.query.transactionId,
                        ScriptId: req.query.scriptId
                    }

                    console.log("PAYMENT", payment)

                    db.scriptPayments
                        .create(payment)
                        .then((resp) => {
                            res.status(200).json({ message: "Upload successful!", transactionId: transactionId });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: "Internal server error.", error: err });
                        })
                }
                else {
                    console.log('Failed Transaction.');
                    if (response.getTransactionResponse().getErrors() != null) {
                        console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                        console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    }
                }
            }
            else {
                console.log('Failed Transaction. ');
                if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

                    console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                    console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                }
                else {
                    console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                }
            }
        }
        else {
            console.log('Null Response.');
        }

    });




    // if (require.main === module) {
    // 	chargeCreditCard(function(){
    // 		console.log('chargeCreditCard call complete.');
    // 	});
    // }

    // const payment = {
    //     name: req.query.name,
    //     amount: req.query.amount,
    //     receiptLink: req.query.receiptLink,
    //     transactionId: req.query.transactionId,
    //     ScriptId: req.query.scriptId
    // }

    // const paymentSuccess = paymentTransactions.chargeCreditCard(req.query, res)

    // console.log("SUCCESS", paymentSuccess)

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