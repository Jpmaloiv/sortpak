'use strict';

const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;
// const utils = require('../utils.js');
const constants = require('../constants.js');

function chargeCreditCard(payment, response) {

	const number = payment.number.replace(/ /g, "")
	const expiry = payment.expiry.replace(/ /g, "")
	
	const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	const creditCard = new ApiContracts.CreditCardType();

	creditCard.setCardNumber(number);
	creditCard.setExpirationDate(expiry);
	creditCard.setCardCode(payment.cvc);

	const paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	const orderDetails = new ApiContracts.OrderType();
	// orderDetails.setInvoiceNumber('INV-12345');
	// orderDetails.setDescription('Product Description');

	const billTo = new ApiContracts.CustomerAddressType();
	billTo.setFirstName(payment.firstName);
	billTo.setLastName(payment.lastName);
	// billTo.setCompany('Souveniropolis');
	billTo.setAddress(payment.address);
	billTo.setCity(payment.city);
	billTo.setState(payment.state);
	billTo.setZip(payment.zipCode);
	billTo.setCountry('USA');
	billTo.setPhoneNumber(payment.phone)
	

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
	transactionRequestType.setAmount(payment.amount);

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


	const test = ctrl.execute(function(){

		const apiResponse = ctrl.getResponse();

		const response = new ApiContracts.CreateTransactionResponse(apiResponse);

		//pretty print response
		console.log(JSON.stringify(response, null, 2));

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransactionResponse().getMessages() != null){
					console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
					console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
					console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
					console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
					response.send("Payment Success!")
				}
				else {
					console.log('Failed Transaction.');
					if(response.getTransactionResponse().getErrors() != null){
						console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
						console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
					}
				}
			}
			else {
				console.log('Failed Transaction. ');
				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
				
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
}


if (require.main === module) {
	chargeCreditCard(function(){
		console.log('chargeCreditCard call complete.');
	});
}

module.exports.chargeCreditCard = chargeCreditCard;