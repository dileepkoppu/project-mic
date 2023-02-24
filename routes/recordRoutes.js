const appRoot = require("app-root-path")
const router = require("express").Router()
const multer = require("multer")


const {createRecord,download,recordList,distinctYear,distinctBranch,distinctcName
                } = require(appRoot+"/apps/v1/common/record.js")
const {checkauth} =require(appRoot+"/routes/middleware")
const {upload} = require(appRoot+"/routes/fileHadelar.js")



router.post("/studentP-create",checkauth,upload.single('details'),createRecord)
router.get("/studentP-download",checkauth,download)
router.get('/studentP-List',recordList)
router.get('/studentP-List/distinctYear',distinctYear)
router.get('/studentP-List/distinctBranch',distinctBranch)
router.get('/studentP-List/distinctcName',distinctcName)


module.exports.router = router