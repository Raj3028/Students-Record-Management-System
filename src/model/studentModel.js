const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({

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

module.exports = mongoose.model("Student", studentSchema)