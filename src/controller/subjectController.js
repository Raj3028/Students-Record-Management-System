const subjectModel = require('../model/subjectModel')
const studentModel = require("../model/studentModel")


const createSubject = async (req, res) => {

    try {

        let { subject, marks } = req.body

        let userId = req.token.userId

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

        let userId = req.token.userId

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