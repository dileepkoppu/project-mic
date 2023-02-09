const appRoot = require("app-root-path")

const router = require("express").Router()



const { createstudentC,download,studentCList} = require(appRoot+"/apps/v1/common/studentC.js")
const {checkauth} =require(appRoot+"/routes/middleware")
const {upload} = require(appRoot+"/routes/fileHadelar.js")



router.post("/studentC-create",upload.single('file'),createstudentC)
router.get("/studentC-download",download)
router.get('/studentCList',studentCList)


module.exports.router = router