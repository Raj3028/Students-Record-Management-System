const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const subjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: Number,
        required: true,
        trim: true
    },
    isdeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }

}, { timestamps: true })

module.exports = mongoose.model("Subject", subjectSchema)