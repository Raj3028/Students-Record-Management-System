//===================== Import Packages =====================//
const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

//===================== Student's Schema =====================//
const studentSchema = new mongoose.Schema({

    teacherID: {
        type: ObjectId,
        ref: "Teacher",
        require: true
    },
    studentName: {
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


//===================== Module Export =====================//
module.exports = mongoose.model("Student", studentSchema)