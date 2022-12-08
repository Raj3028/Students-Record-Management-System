const studentModel = require("../model/studentModel")
const JWT = require("jsonwebtoken")

const regStudent = async (req, res) => {

    try {

        const data = req.body

        const { name, email, password } = data

        const studentReg = await studentModel.create(data)

        return res.status(201).send({ status: true, Message: `${name} created sucessfully.`, data: studentReg })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}

const logStudent = async (req, res) => {

    try {

        const data = req.body

        const { email, password } = data

        const fetchData = await studentModel.findOne({ email: email, password: password })

        if (!fetchData) return res.status(404).send({ status: false, Message: "You have to registration first." })

        const payload = {
            userId: fetchData._id.toString(),
        }

        const token = JWT.sign(payload, "AALu", { expiresIn: '1hr' })

        return res.status(200).send({ status: true, Token: token })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}



module.exports = { regStudent, logStudent }