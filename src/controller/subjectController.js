const subjectModel = require('../model/subjectModel')
const studentModel = require("../model/studentModel")
const validation = require("../validation/validator")


const createSubject = async (req, res) => {

    try {

        let { subject, marks } = req.body
        if (validation.isValidBody(req.body)) return res.status(400).send({ status: false, msg: "please provide  details to add subject and marks" })

        let userId = req.token.userId

        if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
        if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })
        if (!validation.isValid(marks)) return res.status(400).send({ status: false, message: "marks is required" })
        if (!validation.isValidNum(marks)) return res.status(400).send({ status: false, message: "marks is not valid is  and it's only take number" })
        
        const userName = await studentModel.findById(userId)

        const checkSubject = await subjectModel.findOne({ name: userName.name, subject: subject })

        if (checkSubject) return res.status(400).send({ status: false, message: `This subject: ${subject} is already present for this ${userName.name}!` })

        const obj = { name: userName.name, subject: subject, marks: marks }

        const createSubject = await subjectModel.create(obj)

        return res.status(201).send({ status: true, Message: "Created Sucessfully", data: createSubject })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}



const editSubject = async (req, res) => {

    try {

        let data = req.body
        let { subject, marks } = data
        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "Enter details to update marks" })


        let userId = req.token.userId

        if (!validation.isValid(subject)) return res.status(400).send({ status: false, message: "subject is required" })
        if (!validation.isValidName(subject)) return res.status(400).send({ status: false, message: " subject is not valid is  and it's only take alphabets" })
        if (!validation.isValid(marks)) return res.status(400).send({ status: false, message: "marks is required" })
        if (!validation.isValidNum(marks)) return res.status(400).send({ status: false, message: "marks is not valid is  and it's only take number" })
        

        const userName = await studentModel.findById(userId)

        let addMark = await subjectModel.findOneAndUpdate({ name: userName.name, subject: subject, isdeleted: false },
            { $inc: { marks: marks } }, { new: true })

        return res.status(200).send({ status: true, message: "Mark Updated Sucessfully!", data: addMark })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}


const getSubject = async (req, res) => {

    try {

        let userId = req.token.userId

        const userName = await studentModel.findById(userId)

        const fetchData = await subjectModel.find({ name: userName.name, isdeleted: false }).select({ _id: 0, name: 1, subject: 1, marks: 1 })

        return res.status(200).send({ status: true, message: "Sucess!", data: fetchData })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}


const deleteSubject = async (req, res) => {

    try {

        let subject = req.body.subject

        let userId = req.token.userId

        const userName = await studentModel.findById(userId)

        let deleteSubject = await subjectModel.findOneAndUpdate({ name: userName.name, subject: subject, isdeleted: false }, { isdeleted: true, deletedAt: new Date() })

        if (!deleteSubject) return res.status(400).send({ status: false, message: "Subject doesn't exist or deleted!" })

        return res.status(200).send({ status: true, message: "Sucessfully Deleted!" })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}





module.exports = { createSubject, editSubject, getSubject, deleteSubject }