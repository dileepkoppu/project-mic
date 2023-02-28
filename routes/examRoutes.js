const appRoot = require("app-root-path")
const router = require("express").Router()



const {createExam,deleteExam,startExam,examDetails,examList,resultExam} = require(appRoot+"/apps/v1/common/exam.js")
const {checkauth} =require(appRoot+"/routes/middleware")


// list-get 
router.get("/exam-list",examList)
router.post("/exam-create",checkauth,createExam)
router.delete("/exam-delete/:id",checkauth,deleteExam)
router.get("/exam-details/:id",examDetails)
router.post('/:id/exam-start',startExam)
router.get('/resultExam/:exam_session',resultExam)

module.exports.router = router