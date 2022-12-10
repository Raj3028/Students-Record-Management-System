//===================== Import Packages =====================//
const mongoose = require("mongoose")



//===================== Teacher's Schema =====================//
const teacherSchema = new mongoose.Schema({

    name: String,
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
    }

}, { timestamps: true })



//===================== Module Export =====================//
module.exports = mongoose.model("Teacher", teacherSchema)