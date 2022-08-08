//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel.js")
const validator = require("../middleware/validation.js")


//----------------------------------------------------------- SIGN UP ---------------------------------------------------------------------------//

const createUser = async function (req, res) {
    try {
        //Validate body 
        if (!validator.isValidBody(req.body)) {
            return res.status(400).send({ status: false, msg: "User body should not be empty" });
        }

        let { fname, lname, email, password, phone, address } = req.body

        //Validate fname
        if (!validator.isValid(fname)) {
            return res.status(400).send ({ status: false, message: "Enter firstName" })
        }

        // Validation of fname
        if (!validator.isValidName(fname)) {
            return res.status(400).send({ status: false, msg: "firstname only contains alphabets" })
        }

        // Validate lname
        if (!validator.isValid(lname)) {
            return res.status(400).send({ status: false, message: "lname must be present" })
        }

        // Validation of lname
        if (!validator.isValidName(lname)) {
            return res.status(400).send({ status: false, msg: "lastname only contains alphabets" })
        }

        // Validate email
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "email must be present" })
        }

        // Validation of email id
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Invalid email id" })
        }

        // Validate password
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password must be present" })
        }

        // Validation of password
        if (!validator.isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Invalid password" })
        }

        // Validate phone
        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, message: "phone must be present" })
        }

        // Validation of phone number
        if (!validator.isValidNumber(phone)) {
            return res.status(400).send({ status: false, msg: "Invalid phone number" })
        }

        // Validate address
        if (!address) {
            return res.status(400).send({ status: false, message: "Address is required" })
        }

        // Validate street, city, pincode of address
        if (typeof address != "object") {
            return res.status(400).send({ status: false, message: "address should be an object" })
        }
        if (!validator.isValid(address.street && address.city && address.pincode)) {
            return res.status(400).send({ status: false, message: "Address details is/are missing" })
        }

        // Validate billing pincode
        if (!validator.isValidPincode(address.pincode)) {
            return res.status(400).send({ status: false, msg: "Invalid pincode" })
        }

        // Duplicate entries
        let isAlreadyUsed = await userModel.findOne({ email });
        if (isAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} is already registered` })
        }

        let duplicatePhone = await userModel.findOne({ phone });
        if (duplicatePhone) {
            return res.status(400).send({ status: false, message: `${phone} phone is already used` })
        }

            let userData = { fname, lname, email, phone, password, address }

            let savedData = await userModel.create(userData)
            return res.status(201).send({ status: true, message: "User created successfully", data: savedData })
        }
    catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}


//----------------------------------------------------------------user login ---------------------------------------------------------------------------//

const userlogin = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data).length <= 0) {
            return res.status(400).send({ status: false, message: "Plz Enter Email & Password In Body !!!" });
        }
        if (Object.keys(data).length >= 3) {
            return res.status(400).send({ status: false, message: "Only Enter Email & Password In Body !!!" });
        }
        const email = req.body.email;
        if (!email) {
            return res.status(400).send({ status: false, message: "Plz Enter Email In Body !!!" });
        }
        const findData = await userModel.findOne({ email }).select({ email: 1, password: 1 });
        if (!findData) {
            return res.status(400).send({ status: false, message: "Plz Enter Valid Email-Id !!!" });
        }

        const password = req.body.password;
        if (!password) {
            return res.status(400).send({ status: false, message: "Plz Enter Password In Body !!!" });
        }

        const userId = findData._id;
        const token = jwt.sign({
            userId: userId
        },
            "someSecretKey@##6534#@", { expiresIn: "24H" }
        );

        res.status(200).send ({
            status: true,
            message: "User login successfully",
            data: { userId: userId, token: token }
        });
    } 
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports = {createUser,userlogin};


