const studentModel = require("../model/studentModel")
const JWT = require("jsonwebtoken")
const validation = require("../validation/validator")
const bcrypt = require("bcrypt")

const regStudent = async (req, res) => {

    try {

        const data = req.body

        const { name, email, password } = data
        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })
        if (!validation.isValid(name)) return res.status(400).send({ status: false, message: "name is required" })
        if (!validation.isValidName(name)) return res.status(400).send({ status: false, message: " name is not valid" })
        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        let checkEmail = await studentModel.findOne({ email: email })
        if (checkEmail) return res.status(409).send({ status: false, msg: "email already exist" })

        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "password is required" })
        if (!validation.isValidPwd(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase also one special character" })

        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        data.password = hash

        const studentReg = await studentModel.create(data)

        return res.status(201).send({ status: true, Message: `${name} created sucessfully.`, data: studentReg })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}

const logStudent = async (req, res) => {

    try {

        const data = req.body

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })

        const { email, password } = data

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Pasworrd is required" })

        let findStudent = await studentModel.findOne({ email: email })
        if (!findStudent) return res.status(404).send({ status: false, message: "the email id entered is wrong" })
    
        let bcryptPass = await bcrypt.compare(password, findStudent.password)
        if (!bcryptPass) return res.status(404).send({ status: false, message: "The entered password is wrong" })

        // const fetchData = await studentModel.findOne({ email: email, password: password })

        // if (!fetchData) return res.status(404).send({ status: false, Message: "You have to registration first." })

        const payload = {
            userId: findStudent._id.toString(),
        }

        const token = JWT.sign(payload, "AALu", { expiresIn: '1d' })

        return res.status(200).send({ status: true, Token: token })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}



module.exports = { regStudent, logStudent }