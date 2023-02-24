const appRoot = require("app-root-path")
const router = require("express").Router()



const {createExam,deleteExam,startExam,examDetails} = require(appRoot+"/apps/v1/common/exam.js")
const {checkauth} =require(appRoot+"/routes/middleware")


// list-get 
router.post("/exam-create",checkauth,createExam)
router.delete("/exam-delete/:id",checkauth,deleteExam)
router.get("/exam-details/:id",examDetails)
router.post('/:id/exam-start',startExam)

module.exports.router = router