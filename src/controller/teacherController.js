//===================== Importing Module and Packages =====================//
const teacherModel = require("../model/teacherModel")
const JWT = require("jsonwebtoken")
const validation = require("../validation/validator")
const bcrypt = require("bcrypt")



const regTeacher = async (req, res) => {

    try {

        const data = req.body
        const { name, email, password } = data

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })
        if (!validation.isValid(name)) return res.status(400).send({ status: false, message: "name is required" })
        if (!validation.isValidName(name)) return res.status(400).send({ status: false, message: " name is not valid" })
        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!validation.isValidEmail(email)) return res.status(400).send({ status: false, message: "email is not valid" })

        let checkEmail = await teacherModel.findOne({ email: email })
        if (checkEmail) return res.status(409).send({ status: false, msg: "Email already exist!" })

        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "password is required" })
        if (!validation.isValidPwd(password)) return res.status(400).send({ status: false, message: "Password length should be 8 to 15 digits and enter atleast one uppercase also one special character" })

        const saltRounds = 10
        const hash = bcrypt.hashSync(password, saltRounds)
        data.password = hash

        const teacherReg = await teacherModel.create(data)

        return res.status(201).send({ status: true, Message: `${name} created sucessfully.`, data: teacherReg })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}

const logTeacher = async (req, res) => {

    try {

        const data = req.body

        if (validation.isValidBody(data)) return res.status(400).send({ status: false, msg: "please provide  details" })

        const { email, password } = data

        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email is required" })
        if (!validation.isValid(password)) return res.status(400).send({ status: false, message: "Pasworrd is required" })

        let findteacher = await teacherModel.findOne({ email: email })
        if (!findteacher) return res.status(404).send({ status: false, message: "the email id entered is wrong" })

        let bcryptPass = await bcrypt.compare(password, findteacher.password)
        if (!bcryptPass) return res.status(404).send({ status: false, message: "The entered password is wrong" })

        const payload = {
            userId: findteacher._id.toString(),
            name: findteacher.name,
            organisation: 'RR'
        }

        const token = JWT.sign(payload, "Students-Management", { expiresIn: '1d' })

        return res.status(200).send({ status: true, Token: token })

    } catch (error) {

        return res.status(500).send({ status: false, Message: error.message })
    }
}




//===================== Module Export =====================//
module.exports = { regTeacher, logTeacher }