//===================== Importing Package =====================//
const mongoose = require("mongoose")

//===================== Functions for Validation =====================//
const isValidObjectId = (objectId) => { return mongoose.Types.ObjectId.isValid(objectId) }
const isValidBody = (reqBody) => { return Object.keys(reqBody).length == 0 }

const isValid = (value) => {
  if (typeof value === "undefined" || typeof value === "null") return false;
  if (typeof value === "string" && value.trim().length == 0) return false;
  return true;
}

//===================== Function to validate the input value with Regex =====================//
const isValidName = (name) => { return /^[a-zA-Z\. ]*$/.test(name) }
const isValidEmail = (email) => { return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(email) };
const isValidPwd = (Password) => { return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password) };
const isValidNum = (num) => { return /^[0-9]*[1-9]+$|^[1-9]+[0-9]*$/.test(num); }


//<<<============================= Module Export =============================>>>//
module.exports = { isValid, isValidName, isValidEmail, isValidPwd, isValidBody, isValidNum, isValidObjectId }