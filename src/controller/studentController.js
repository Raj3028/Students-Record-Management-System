//===================== Importing Module and Packages =====================//
const studentModel = require('../model/studentModel')
const teacherModel = require("../model/teacherModel")
const validation = require("../validation/validator")


const createSutudentDeatils = async (req, res) => {

    try {

        let { studentName, subject, marks } = req.body
        if (validation.isValidBody(req.body)) return res.status(400).send({ status: false, msg: "please provide  details to add subject and marks" })

        let userId = req.params.userId

        if (!validation.isValid(studentName)) return res.status(400).send({ status: false, message: "studentName is required" })
        if (!validation.isValidName(studentName)) return res.status(400).send({ status: false, message: "studentName should be alphabets." })
        if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
        if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })
        if (!validation.isValid(marks)) return res.status(400).send({ status: false, message: "marks is required" })
        if (!validation.isValidNum(marks)) return res.status(400).send({ status: false, message: "marks is not valid is  and it's only take number" })

        const userName = await teacherModel.findById(userId)

        const checkSubject = await studentModel.findOne({ teacherID: userId, studentName: studentName, subject: subject })

        if (checkSubject) return res.status(400).send({ status: false, message: `This subject: ${subject} is already present for this ${checkSubject.studentName}!` })

        const obj = { teacherID: userId, studentName: studentName, subject: subject, marks: marks }

        const createSubject = await studentModel.create(obj)

        return res.status(201).send({ status: true, Message: "Created Sucessfully", data: createSubject })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}



const updateMarks = async (req, res) => {

    try {

        let data = req.body
        let { studentName, subject, marks } = data
        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "Enter details to update marks" })

        let userId = req.params.userId

        if (!validation.isValid(studentName)) return res.status(400).send({ status: false, message: "studentName is required" })
        if (!validation.isValidName(studentName)) return res.status(400).send({ status: false, message: "studentName should be alphabets." })
        if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
        if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })
        if (!validation.isValid(marks)) return res.status(400).send({ status: false, message: "marks is required" })
        if (!validation.isValidNum(marks)) return res.status(400).send({ status: false, message: "marks is not valid is  and it's only take number" })

        let addMark = await studentModel.findOneAndUpdate({ teacherID: userId, studentName: studentName, subject: subject, isdeleted: false },
            { $inc: { marks: marks } }, { new: true })

        if (!addMark) return res.status(404).send({ status: false, message: `This Student: ${studentName} is not exist with this Subject: ${subject}. You have to create first.` })

        return res.status(200).send({ status: true, message: "Mark Updated Sucessfully!", data: addMark })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}


const getStudentDetails = async (req, res) => {

    try {

        let data = req.query
        let { studentName, subject, ...rest } = data

        if (!validation.isValidBody(rest)) return res.status(400).send({ status: false, message: `You can't get with this filter!` })

        let obj = { teacherID: req.token.userId, isdeleted: false }

        if (studentName) {
            if (!validation.isValid(studentName)) return res.status(400).send({ status: false, message: "studentName is required" })
            if (!validation.isValidName(studentName)) return res.status(400).send({ status: false, message: "studentName should be alphabets." })
            obj.studentName = { $regex: studentName }
        }

        if (subject) {
            if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
            if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })
            obj.subject = subject
        }

        const fetchData = await studentModel.find(obj).select({ _id: 0, studentName: 1, subject: 1, marks: 1 })

        if (validation.isValidBody(fetchData)) return res.status(404).send({ status: false, message: "No Student data found!" })

        return res.status(200).send({ status: true, message: "Sucess!", data: fetchData })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}


const deleteDetails = async (req, res) => {

    try {

        let data = req.body
        let { studentName, subject } = data

        let userId = req.params.userId

        if (!validation.isValid(studentName)) return res.status(400).send({ status: false, message: "studentName is required" })
        if (!validation.isValidName(studentName)) return res.status(400).send({ status: false, message: "studentName should be alphabets." })

        if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
        if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })

        let deleteSubject = await studentModel.findOneAndUpdate({ teacherID: userId, studentName: studentName, subject: subject, isdeleted: false }, { isdeleted: true, deletedAt: new Date() })

        if (!deleteSubject) return res.status(400).send({ status: false, message: "Subject doesn't exist or deleted!" })

        return res.status(200).send({ status: true, message: "Sucessfully Deleted!" })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}




//===================== Module Export =====================//
module.exports = { createSutudentDeatils, updateMarks, getStudentDetails, deleteDetails }