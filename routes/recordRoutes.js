const appRoot = require("app-root-path")

const router = require("express").Router()
const multer = require("multer")


const { createRecord,download,recordList} = require(appRoot+"/apps/v1/common/record.js")
const {checkauth} =require(appRoot+"/routes/middleware")
const {upload} = require(appRoot+"/routes/fileHadelar.js")



router.post("/record-create",checkauth,upload.single('file'),createRecord)
router.get("/download",download)
router.get('/recordList',recordList)


module.exports.router = router