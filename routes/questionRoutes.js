const appRoot = require("app-root-path")
const router = require("express").Router()



const {createQuestion} = require(appRoot+"/apps/v1/common/question.js")
const {checkauth} =require(appRoot+"/routes/middleware")



router.post("/question-create/:id",checkauth,createQuestion)
// router.get("/studentP-download",checkauth,download)
// router.get('/studentP-List',recordList)
// router.get('/studentP-List/distinctYear',distinctYear)
// router.get('/studentP-List/distinctBranch',distinctBranch)
// router.get('/studentP-List/distinctcName',distinctcName)


module.exports.router = router