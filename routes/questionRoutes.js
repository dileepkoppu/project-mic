const appRoot = require("app-root-path")
const router = require("express").Router()



const {createQuestion,questionDetails,checkAns} = require(appRoot+"/apps/v1/common/question.js")
const {checkauth} =require(appRoot+"/routes/middleware")



router.post("/question-create/:id",checkauth,createQuestion)
router.get("/question-details/:q_c",questionDetails)
router.post("/check-ans/:e_s/:q_c",checkAns)



module.exports.router = router