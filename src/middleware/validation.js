const mongoose = require("mongoose");

//this validation will check the type of values--
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};

//this validbody checks the validation for the empty body
const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//checks wheather object id is valid or not
const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
};

//check valid type of email--
const isValidEmail = function (value) {
     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return false
    }
    return true
};

//checks valid type of phone number
const isValidNumber = function (value) {
    if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value))) {
        return false
    }
    return true
};

//valid type of name
const isValidName = function (value) {
    if (!(/^[A-Za-z ]+$/.test(value.trim()))) {
        return false
    }
    return true
};

//valid type of password
const isValidPassword = function (value) {
    if (!(/^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value))) {
        return false
    }
    return true
};

//valid pincode in structure
const isValidPincode = function (value) {
    if (!(/^\d{6}$/.test(value))) {
        return false
    }
    return true
};

//checks price should be contain 
const isValidPrice = function (value) {
    if (!(/^\d+(,\d{3})*(\.\d{1,2})?$/.test(value))) {
        return false
    }
    return true
};

module.exports = {isValidPrice,isValidPincode,isValidPassword,isValidName,isValidNumber,isValidEmail,isValidObjectId,isValidBody,isValid}