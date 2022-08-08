const {default: mongoose} = require("mongoose")

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        unique: true,
        trim:true,
        required: true,
        lowerCase: true
    },
    password:{
        type: String,
        trim: true,
        lowerCase: true,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    }

}, {timestamps: true});

module.exports = mongoose.model('user', userSchema)

