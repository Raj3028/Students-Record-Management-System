//===================== Importing Module and Packages =====================//
const express = require('express')
const router = express.Router()
const { regTeacher, logTeacher } = require("../controller/teacherController")
const { createSutudentDeatils, updateMarks, getStudentDetails, deleteDetails } = require("../controller/studentController")
const { Authentication, Authorization } = require("../middleWare/auth")


//<<<============================= Teacher API's =============================>>>//
router.post('/teacherRegistration', regTeacher)
router.post('/teacherLogin', logTeacher)

//<<<============================= Student Marks API's =============================>>>//
router.post('/addStudentDetails/:userId', Authentication, Authorization, createSutudentDeatils)
router.put('/updateMarks/:userId', Authentication, Authorization, updateMarks)
router.get('/getDetails', Authentication, getStudentDetails)
router.delete('/deleteStudentDetails/:userId', Authentication, Authorization, deleteDetails)


router.all("/*", function (req, res) { res.status(404).send({ status: false, message: "URL not found." }) })
//<<<============================= Module Export =============================>>>//
module.exports = router