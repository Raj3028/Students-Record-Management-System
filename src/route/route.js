const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const { regStudent, logStudent } = require("../controller/studentController")
const { createSubject, editSubject, getSubject, deleteSubject } = require("../controller/subjectController")
const { Authentication, Authorization } = require("../middleWare/auth")

router.post('/studentRegistration', regStudent)

router.post('/studentLogin', logStudent)


router.post('/createSubject', Authentication, createSubject)

router.put('/addMarks', Authentication, editSubject)

router.get('/getDetails', Authentication, getSubject)

router.delete('/deleteSubject', Authentication, deleteSubject)

module.exports = router